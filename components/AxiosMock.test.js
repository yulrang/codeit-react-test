import "@testing-library/jest-dom";
import axios from "axios";

// 문서 참고해서 jest.mock, mockResolvedValue 사용하기
jest.mock("axios");

const getUser = (id) => {
  return axios.get(`/user/${id}.json`)?.then((resp) => resp.data);
};

test("first axios mocking - get", async () => {
  // 여기에 코드 작성
  const user = {
    name: "john",
    email: "john0000@naver.com",
  };

  axios.get.mockResolvedValue({ data : user });

  return getUser().then((data) => expect(data).toEqual(user));
});