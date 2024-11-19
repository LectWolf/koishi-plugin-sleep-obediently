import { Context, Session, h } from "koishi";
import { Config } from ".";
import {} from "koishi-plugin-cron";

export const reusable = true;
export function apply(ctx: Context, config: Config) {
  config.group.forEach((group) => {
    // 开启禁言
    ctx.cron(group.muteopencron, async () => {
      await enableGroupMute(ctx, config, group.groupid);
    });
    // 关闭禁言
    ctx.cron(group.muteclosecron, async () => {
      await disableGroupMute(ctx, config, group.groupid);
    });
  });
}

// 开启禁言
async function enableGroupMute(ctx: Context, config: Config, groupId: string) {
  let bot = ctx.bots[`onebot:${config.enablebot}`];
  await bot.internal.setGroupWholeBan(groupId, true);
  if (config.opentext) {
    await bot.internal.sendGroupMsg(groupId, config.opentext);
  }
}

// 关闭禁言
async function disableGroupMute(ctx: Context, config: Config, groupId: string) {
  let bot = ctx.bots[`onebot:${config.enablebot}`];
  await bot.internal.setGroupWholeBan(groupId, false);
  if (config.closetext) {
    await bot.internal.sendGroupMsg(groupId, config.closetext);
  }
}
