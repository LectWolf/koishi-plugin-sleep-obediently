import { Schema } from "koishi";

export interface Config {
  enablebot: string;
  group: GroupConfig[];
  opentext: string;
  closetext: string;
}

export interface GroupConfig {
  groupid: string;
  muteopencron: string;
  muteclosecron: string;
}

export const Config: Schema<Config> = Schema.object({
  enablebot: Schema.string().description("启用机器人QQ,仅支持onebot适配器"),
  group: Schema.array(
    Schema.object({
      groupid: Schema.string().required().description("群号"),
      muteopencron: Schema.string().required().description("启用全群禁言cron"),
      muteclosecron: Schema.string().required().description("关闭全群禁言cron"),
    })
  )
    .role("table")
    .description("全群禁言设置"),
  opentext: Schema.string()
    .role("textarea", { rows: [2, 8] })
    .description("开启全群禁言时发送的消息,不填不发送"),
  closetext: Schema.string()
    .role("textarea", { rows: [2, 8] })
    .description("关闭全群禁言时发送的消息,不填不发送"),
});
