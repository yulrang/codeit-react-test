import { escape, unescape } from "../htmlEscape";

describe.skip("escape", () => {
  let escaped = "&amp;&lt;&gt;&quot;&#39;/";
  let unescaped = "&<>\"'/";

  escaped += escaped;
  unescaped += unescaped;

  // escape가 잘 작동되는지 확인
  it("should escape values", () => {
    expect(escape(unescaped)).toBe(escaped);
  });

  // 이스케이프 할 것이 없는 문자열에 대한 동작 확인
  it("should handle strings with nothing to escape", () => {
    expect(escape("abc")).toBe("abc");
  });

  // 이스케이프 문자열을 언이스케이프하고 다시 이스케이프 했을때 처음의 상태와 동일한지 확인
  it("should escape the same characters unescaped by `_.unescape`", () => {
    expect(escape(unescape(escaped))).toBe(escaped);
  });

  // 이스케이프 되면 안되는 문자에 대한 테스트 ["`", "/"]
  ["`", "/"].forEach((chr) => {
    it(`should not escape the "${chr}" character`, () => {
      expect(escape(chr)).toBe(chr);
    });
  });
});

describe("unescape", () => {
  let escaped = "&amp;&lt;&gt;&quot;&#39;/";
  let unescaped = "&<>\"'/";

  escaped += escaped;
  unescaped += unescaped;

  // "&amp;lt;"
  it("should unescape entities in order", () => {
    expect(unescape("&amp;lt;")).toBe("&lt;");
  });

  it("should unescape the proper entities", () => {
    expect(unescape(escaped)).toBe(unescaped);
  });

  it("should handle strings with nothing to unescape", () => {
    expect(unescape("abc")).toBe("abc");
  });

  it("should unescape the same characters escaped by `_.escape`", () => {
    expect(unescape(escape(unescaped))).toBe(unescaped);
  });

  // "&#39;" => "'"
  it("should handle leading zeros in html entities", () => {
    expect(unescape("&#039;")).toBe("'");
    expect(unescape("&#0039;")).toBe("'");
    expect(unescape("&#00039;")).toBe("'");
  });

  // 백틱, 슬래시
  ["&#96;", "&#x2F;"].forEach((entity) => {
    it(`should not unescape the "${entity}" entity`, () => {
      expect(unescape(entity)).toBe(entity);
    });
  });
});
