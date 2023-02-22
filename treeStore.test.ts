import TreeStore, { type Item } from "./TreeStore";

const items: Item[] = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

describe("TreeStore class", () => {
  const treeStore = new TreeStore(items);

  it("getAll()", () => {
    expect(treeStore.getAll()).toEqual(items);
  });

  it("getItem(7)", () => {
    expect(treeStore.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
  });

  it("getChildren(4)", () => {
    expect(treeStore.getChildren(4)).toEqual([
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
  });

  it("getChildren(5) - without children", () => {
    expect(treeStore.getChildren(5)).toEqual([]);
  });

  it("getChildren(2)", () => {
    expect(treeStore.getChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
    ]);
  });

  it("getAllChildren(2)", () => {
    expect(treeStore.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
  });

  it("getAllParents(7)", () => {
    expect(treeStore.getAllParents(7)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ]);
  });
});
