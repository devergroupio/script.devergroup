import bcrypt from "bcrypt";
import httpModule from "node-mocks-http";
import gqlClient from "~@/core/modules/hasura.module";
import { apiAuthorizeHanlder } from "~@/microservices/api";
describe("apiAuthorize Router", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should works", async () => {
    (jest.spyOn(gqlClient, "query") as jest.SpyInstance).mockResolvedValueOnce({
      data: {
        users: [
          {
            email: "test@gmail.com",
            first_name: "test",
            password: "",
            last_name: "test",
            role: "admin"
          }
        ]
      }
    });
    jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
    const req = httpModule.createRequest({
      body: {
        email: "deverpham@gmail.com",
        password: "Thinh123123@"
      },
      headers: {
        "content-type": "application/json"
      }
    });
    const res = httpModule.createResponse();
    await apiAuthorizeHanlder(req, res);
    expect(res._isJSON()).toBeTruthy();
    const responseObj = JSON.parse(res._getJSONData().message);
    expect(responseObj.firstName).toEqual("test");
    expect(responseObj.lastName).toEqual("test");
    expect(responseObj.email).toEqual("test@gmail.com");
    expect(responseObj.token.length).toBeGreaterThan(20);
  });
});
