import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("should render correctly", () => {
    // Counter 컴포넌트를 렌더링합니다.
    const wrapper = render(<Counter />);
    const counter = wrapper.getByTestId("count");

    // couter의 텍스트가 "Clicked 0 times"인지 확인합니다.
    expect(counter).toHaveTextContent("Clicked 0 times");
  });

  it("클릭 이벤트가 제대로 동작하는지", async () => {
    // Counter 컴포넌트를 렌더링합니다.
    const wrapper = render(<Counter />);
    const counter = wrapper.getByTestId("count");
    const button = wrapper.getByRole("button", { name: "Increment"}); // name : text content, alt, aria-label

    fireEvent.click(button);

    // couter의 텍스트가 "Clicked 1 time"인지 확인합니다.
    await waitFor(() => {
      expect(counter).toHaveTextContent("Clicked 1 time");
    });

    fireEvent.click(button);

    // couter의 텍스트가 "Clicked 2 times"인지 확인합니다.
    await waitFor(() => {
      expect(counter).toHaveTextContent("Clicked 2 times");
    });
  });
})


describe("Checkbox", () => {
  beforeEach(() => {
    global.window.document.title = "My Awesome App";
    render(<Counter/>);
  })

  test("체크박스의 초기상태가 false인지 확인합니다.", async () => {
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });
  
  test("초기 상태에서 도큐먼트 타이틀이 잘 변경되는지 확인합니다.", async () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(document.title).toBe("Total number of clicks: 0");
  });

  test("체크를 해제했을 때 타이틀이 잘 돌아오는지 확인합니다.", async () => {
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(document.title).toBe("My Awesome App");
  });

  test("버튼을 여러번 눌렀을 때 타이틀이 잘 변경되는지 확인합니다.", async () => {
    const button = screen.getByRole("button", { name: /Increment/i}); // name : text content, alt, aria-label
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(button);
    fireEvent.click(checkbox);
    expect(document.title).toBe("Total number of clicks: 1");
  });
})