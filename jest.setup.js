if (!process.env.MODE) {
    process.env.MODE = "development";
}
require("./dotenv.config");
jest.setTimeout(10000);
