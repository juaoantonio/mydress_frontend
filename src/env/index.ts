import * as fs from "node:fs";

const dotenv = require("dotenv");

if (fs.existsSync(".env")) {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.development" });
}

export const env = {
  ...process.env,
};
