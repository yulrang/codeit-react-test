import * as React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import MyInput from "./MyInput";

describe("MyInput", () => {
  it("should render correctly", () => {
    // MyInput 컴포넌트를 렌더링합니다.
    const wrapper = render(<MyInput />);
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    expect(() => wrapper.unmount()).not.toThrow("error");
  });

  it("should clear the value and onClear is triggered", async () => {
    // 필요하다면 jest mock 함수나 ref를 생성합니다.
    // MyInput 컴포넌트를 렌더링합니다. 
    const handleClear = jest.fn();
    const wrapper = render(<MyInput
        isClearable
        defaultValue="junior@nextui.org"
        label="test input"
        onClear={handleClear}
      />);
    const input = wrapper.getByRole("textbox");

    const clearButton = wrapper.getByRole("button");
    
    // clearButton을 클릭합니다.
    fireEvent.click(clearButton);

    await waitFor(() => {
      // input 요소의 값이 ""인지 확인합니다.
      expect(input).toHaveValue("");
      // onClear 함수가 한 번 호출되었는지 확인합니다.
      expect(handleClear).toHaveBeenCalledTimes(1);
    });
    
  });
});