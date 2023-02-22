export type Id = number | string;

export interface Item {
  id: Id;
  parent: string | number;
  type?: any;
}

interface TreeDictionary {
  items: {
    [key: Item["id"]]: Item;
  };
  children: {
    [key: Item["id"]]: Item[];
  };
}

export default class TreeStore {
  private dic: TreeDictionary = { items: {}, children: {} };

  constructor(private items: Item[]) {
    this.createDictionary();
  }

  getAll(): Item[] {
    return this.items;
  }

  getItem(id: Id): Item {
    return this.dic.items[id];
  }

  getChildren(id: Id) {
    return this.dic.children[id] ?? [];
  }

  getAllChildren(id: Id) {
    const allChildren: Item[] = [];

    const fillAllChildren = (id: Id) => {
      const children = this.getChildren(id);

      if (children.length) {
        allChildren.push(...children);
        children.forEach((c) => {
          fillAllChildren(c.id);
        });
      }
    };

    fillAllChildren(id);

    return allChildren;
  }

  getAllParents(id: Id) {
    const allParents: Item[] = [];
    const firstItem = this.getItem(id);

    const fillAllParents = (id: Id) => {
      const item = this.getItem(id);
      allParents.push(item);

      if (item.parent !== 'root') {
        fillAllParents(item.parent);
      }
    };

    fillAllParents(firstItem.parent);

    return allParents;
  }

  private createDictionary() {
    this.dic = this.items.reduce((dic: TreeDictionary, item) => {
      dic.items[item.id] = item;

      if (dic.children[item.parent]) {
        dic.children[item.parent].push(item);
      } else {
        dic.children[item.parent] = [item];
      }

      return dic;
    }, this.dic);
  }
}
