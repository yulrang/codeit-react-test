import { fakeApiCall } from "../app/utils/fetchApiCall";

test.skip("the data is peanut butter", () => {
  return fakeApiCall().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
