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
  const envFile = path.join(dir, `bootstrap-production.yaml`);
  let config: Record<string, any> = null;
  if (existsSync(baseFile)) {
    config = yaml.load(readFileSync(baseFile, "utf-8")) as Record<string, any>;
  }
  // if (existsSync(envFile)) {
  //   config = merge(config, yaml.load(readFileSync(envFile, "utf-8")) as Record<string, any>);
  // }
  return config ?? {};
}

const config = loadConfig();
const db = config.db ?? {};
// 在服务器执行命令时打印 db 配置
// 使用 stderr 输出，避免被 typeorm CLI 拦截 stdout 导致 ssh 终端无显示，同时脱敏敏感密码
const safeDbConfig = { ...db, password: db.password ? "******" : undefined };
console.error("db config (脱敏):", safeDbConfig);

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
