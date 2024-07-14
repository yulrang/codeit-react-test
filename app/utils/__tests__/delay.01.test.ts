import delay from "../delay";

describe("delay", () => {
    it("should delay `func` execution - setTimeout", (done) => {
        let pass = false;

        delay(() => {
            // 여기에서 pass를 true로 설정합니다.
            pass = true;
        }, 32);

        setTimeout(() => {
            // 테스트1
            // delay 콜백함수는 예상대로라면 32ms에 호출됩니다.
            // 이 함수가 실행되는 시점에 pass가 어떤 값일지 생각해보세요.
            expect(pass).toBe(false);
        }, 1);

        setTimeout(() => {
            // 테스트2
            // 이 함수가 실행되는 시점에 pass가 어떤 값일지 생각해보세요.
            expect(pass).toBe(true);
            done();
        }, 64);
    });


    // pass 변수 대신에 mock 함수 사용
    it("should delay `func` execution - mock fn", (done) => {
        const mockCallback = jest.fn();

        delay(mockCallback, 32);

        setTimeout(() => {
            // 테스트1
            // 32ms 이전에는 콜백 함수가 호출되지 않아야 합니다.
            expect(mockCallback).not.toHaveBeenCalled();
        }, 1);

        setTimeout(() => {
            // 테스트2
            // 64ms 후에는 콜백 함수가 호출되어야 합니다.
            expect(mockCallback).toHaveBeenCalled();
            done();
        }, 64);
    });


    // fake timer 사용
    it("should delay `func` execution - fake timer", () => {
        jest.useFakeTimers();
        let pass = false;
        delay(() => {
            pass = true;
        }, 32);

        jest.advanceTimersByTime(1);
        expect(pass).toBe(false);

        jest.advanceTimersByTime(31);
        expect(pass).toBe(true);
        jest.useRealTimers();
    });
});


