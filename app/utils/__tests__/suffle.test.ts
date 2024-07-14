import shuffle from "../app/utils/suffle";
import suffle from "../app/utils/suffle";

describe("shuffle", () => {
    const array = [1, 2, 3];

    // shuffle이 새로운 배열을 반환하는가?
    it("should return a new array", () => {
        expect(suffle(array)).not.toBe(array);
    });

    // 반환된 배열이 원래 배열과 같은 요소를 가지고 있는가?
    it("should contain the same elements after a collection is shuffled", () => {
        expect(shuffle(array).sort()).toEqual(array)
    });
});
