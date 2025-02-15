import { afterEach, beforeEach, describe } from "mocha";
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import { expect } from "chai";
import { HTTPTransport } from "./HTTPTransport.ts";

describe("HTTP Transport test", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = req => {
      requests.push(req);
    };

    instance = new HTTPTransport("");
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  describe("HTTP Transport", () => {
    it("вызывает метод get", () => {
      instance.get("/");

      const [request] = requests;

      expect(request.method).to.equal("GET");
    });

    it("вызывает метод post", () => {
      instance.post("/");

      const [request] = requests;

      expect(request.method).to.equal("POST");
    });

    it("вызывает метод put", () => {
      instance.put("/");

      const [request] = requests;

      expect(request.method).to.equal("PUT");
    });

    it("вызывает метод delete", () => {
      instance.delete("/");

      const [request] = requests;

      expect(request.method).to.equal("DELETE");
    });
  });

  describe("HTTP Transport", () => {
    it("вызывает метод GET с правильными параметрами запроса", () => {
      const url = "/test-get";
      const params = {
        limit: 50,
      };
      instance.get(`${url}`, { data: params });
      const [request] = requests;
      expect(request.url).to.include(`${url}?limit=50`);
    });

    it("вызывает метод POST с правильными параметрами запроса", () => {
      const url = "/test-post";
      const data = {
        login: "test",
        password: "123456qwerty",
      };
      instance.post(`${url}`, { data });
      const [request] = requests;
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });

    it("вызывает метод PUT с правильными параметрами запроса", () => {
      const url = "/test-put";
      const data = {
        users: [123],
        chatId: 123,
      };
      instance.put(`${url}`, { data });
      const [request] = requests;
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });

    it("вызывает метод DELETE с правильными параметрами запроса", () => {
      const url = "/test-delete";
      const data = {
        chatId: 123,
      };
      instance.delete(`${url}`, { data });
      const [request] = requests;
      expect(request.requestBody).to.equal(JSON.stringify(data));
    });
  });
});
