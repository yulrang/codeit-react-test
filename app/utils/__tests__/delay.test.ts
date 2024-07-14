import delay from "../delay";

describe.skip("delay", () => {
  it("should use a default `wait` of `0`", () => {
    jest.useFakeTimers(); // 이제부터 fake 타이머를 사용합니다.
    let pass = false;
    delay(() => {
      pass = true;
    });
    jest.advanceTimersByTime(0); // 0ms만큼 시간을 빨리감기함(macrotask)
    expect(pass).toBe(true);
    jest.useRealTimers();
  });

  it("should be cancelable", (done) => {
    let pass = true;
    const id = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(id);

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 64);
  });

  it("should provide additional arguments to `func`", (done) => {
    const mockFn = jest.fn();

    delay(mockFn, 32, "a", 1);
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledWith("a", 1);
      done();
    }, 64);
  });
});
