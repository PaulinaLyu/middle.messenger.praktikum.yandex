// import { expect } from "chai";
// import sinon from "sinon";
// import { HTTPTransport } from "./HTTPTransport";
// import { queryStringify } from "../utils/queryStringify";

// describe("HTTPTransport", () => {
//   let httpTransport: HTTPTransport;
//   let xhr: sinon.SinonFakeXMLHttpRequestStatic;

//   beforeEach(() => {
//     httpTransport = new HTTPTransport("/test-endpoint");
//     xhr = sinon.useFakeXMLHttpRequest();
//     global.XMLHttpRequest = xhr;
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it("should perform a GET request and resolve with response data", done => {
//     const fakeResponse = { data: "test" };
//     const mockRequest = sinon.stub().callsFake(function () {
//       this.readyState = 4;
//       this.status = 200;
//       this.responseText = JSON.stringify(fakeResponse);
//       this.onreadystatechange();
//     });

//     xhr.onCreate = mockRequest;

//     httpTransport
//       .get("/test")
//       .then(response => {
//         expect(response).to.deep.equal(fakeResponse);
//         done();
//       })
//       .catch(done);

//     mockRequest();
//   });

//   it("should perform a POST request with data and resolve with response data", done => {
//     const postData = { key: "value" };
//     const fakeResponse = { success: true };

//     const mockRequest = sinon.stub().callsFake(function () {
//       this.readyState = 4;
//       this.status = 200;
//       this.responseText = JSON.stringify(fakeResponse);
//       this.onreadystatechange();
//     });

//     xhr.onCreate = mockRequest;

//     httpTransport
//       .post("/test", { data: postData })
//       .then(response => {
//         expect(response).to.deep.equal(fakeResponse);
//         done();
//       })
//       .catch(done);

//     mockRequest();
//   });

//   it("should perform a PUT request and resolve with response data", done => {
//     const fakeResponse = { success: true };

//     const mockRequest = sinon.stub().callsFake(function () {
//       this.readyState = 4;
//       this.status = 200;
//       this.responseText = JSON.stringify(fakeResponse);
//       this.onreadystatechange();
//     });

//     xhr.onCreate = mockRequest;

//     httpTransport
//       .put("/test", { data: { key: "new value" } })
//       .then(response => {
//         expect(response).to.deep.equal(fakeResponse);
//         done();
//       })
//       .catch(done);

//     mockRequest();
//   });

//   it("should perform a DELETE request and resolve with response data", done => {
//     const fakeResponse = { success: true };

//     const mockRequest = sinon.stub().callsFake(function () {
//       this.readyState = 4;
//       this.status = 200;
//       this.responseText = JSON.stringify(fakeResponse);
//       this.onreadystatechange();
//     });

//     xhr.onCreate = mockRequest;

//     httpTransport
//       .delete("/test")
//       .then(response => {
//         expect(response).to.deep.equal(fakeResponse);
//         done();
//       })
//       .catch(done);

//     mockRequest();
//   });

//   it("should reject the promise if the request fails with status >= 400", done => {
//     const fakeResponse = { error: "Bad Request" };

//     const mockRequest = sinon.stub().callsFake(function () {
//       this.readyState = 4;
//       this.status = 400;
//       this.responseText = JSON.stringify(fakeResponse);
//       this.onreadystatechange();
//     });

//     xhr.onCreate = mockRequest;

//     httpTransport
//       .get("/test")
//       .then(() => done(new Error("Expected request to fail")))
//       .catch(response => {
//         expect(response).to.deep.equal(fakeResponse);
//         done();
//       });

//     mockRequest();
//   });

//   it("should correctly append query parameters to GET request URL", () => {
//     const data = { param1: "value1", param2: "value2" };
//     const expectedUrl = "/test-endpoint/test?param1=value1&param2=value2";
//     const queryString = queryStringify(data);
//     const url = `${httpTransport.endpoint}/test${queryString}`;
//     expect(url).to.equal(expectedUrl);
//   });
// });
