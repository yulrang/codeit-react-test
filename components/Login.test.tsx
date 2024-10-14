import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";

jest.mock("axios");

describe("Login", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  })
  test("로그인이 성공하는 경우", async () => {
    const user = {
      username: "youl",
      password: "1234",
      token : "fake_user_token"
    };
    (axios.post as jest.Mock).mockResolvedValue({ data: user });
    
    render(<Login/>);

    const userName = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {name : "Submit"});

    fireEvent.change(userName, {target : { value: user.username }});
    fireEvent.change(password, {target : { value: user.password }});

    fireEvent.click(loginButton);
    
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/congrats/i);
    expect(window.localStorage.getItem("token")).toEqual(user.token)
  });

  test("로그인이 실패하는 경우", async () => {
    const user = {
      username: "youl",
      password: "1234",
      token : "fake_user_token"
    };
    (axios.post as jest.Mock).mockRejectedValue({ message : "error", status : 500 });
    
    render(<Login/>);

    const userName = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {name : "Submit"});

    fireEvent.change(userName, {target : { value: user.username }});
    fireEvent.change(password, {target : { value: user.password }});

    fireEvent.click(loginButton);
    
    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(/error/i);
    expect(window.localStorage.getItem("token")).toBeNull();
  });

  it("success", () => {
    expect(true).toBe(true);
  })
})