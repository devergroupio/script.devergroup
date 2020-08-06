import Request from "devergroup-request";
const proxy = [
  {
    host: "198.20.175.235",
    port: 4444,
    type: "https",
    auth: {
      password: "51Hp4wvE",
      username: "7ce5362ae4"
    }
  }
];

export const freelancer$createClient = ({ cookie, useProxy }) => {
  const client = new Request({
    autoUserAgent: true,
    proxy: useProxy ? proxy : [],
    axiosOpt: {
      timeout: 30 * 1000,
      headers: {
        cookie,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        charset: "utf-8",
        "Accept-Language": "en-US;q=0.2,en;q=0.2",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    },
    cookieJarString: undefined
  });
  return client;
};
