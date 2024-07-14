import { chunk } from "../chunk";

describe.skip("chunk", () => {
  const array = [0, 1, 2, 3, 4, 5];
  // 기본 역할1.
  it("should return chunked arrays", () => {
    const result = chunk(array, 3);
    expect(result).toEqual([
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  // 기본 역할2.
  it("should return the last chunk as remaining elements", () => {
    const result = chunk(array, 4);
    expect(result).toEqual([
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });

  //
  it("should change the size to integer", () => {
    const result = chunk(array, array.length / 4);
    expect(result).toEqual([[0], [1], [2], [3], [4], [5]]);
  });
});
