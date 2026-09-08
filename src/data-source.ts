import { existsSync, readFileSync } from "fs";
import * as yaml from "js-yaml";
import { merge } from "lodash";
import * as path from "path";
import { DataSource } from "typeorm";
import { join } from "path";
import mysql2 from "mysql2";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

function loadConfig(): Record<string, any> {
  const dir = path.resolve(__dirname, "config");
  const baseFile = path.join(dir, "bootstrap.yaml");
  const envFile = path.join(dir, `bootstrap-${process.env.NODE_ENV ?? "development"}.yaml`);
  let config: Record<string, any> = null;
  if (existsSync(baseFile)) {
    config = yaml.load(readFileSync(baseFile, "utf-8")) as Record<string, any>;
  }
  if (existsSync(envFile)) {
    config = merge(config, yaml.load(readFileSync(envFile, "utf-8")) as Record<string, any>);
  }
  return config ?? {};
}

const config = loadConfig();
const db = config.db ?? {};

export default new DataSource({
  type: "mysql",
  driver: mysql2,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [join(__dirname, "modules", "**", "*.entity{.ts,.js}")],
  migrations: [join(__dirname, "migration", "*{.ts,.js}")],
  logging: false,
  synchronize: false
});
