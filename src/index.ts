import { Context } from "koishi";
import * as groupmanager from "./groupmanager";
import { Config } from "./config";

export const name = "sleep-obediently";
export const inject = ["cron"];
export const reusable = true;

export * from "./config";
export function apply(ctx: Context, config: Config) {
  ctx.plugin(groupmanager, config);
}
