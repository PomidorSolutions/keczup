import { type CommandContext, Composer, type Context } from "grammy";

const composer = new Composer();
composer.command(
  "start",
  async (ctx: CommandContext<Context>): Promise<void> => {
    const botUsername = ctx.me.username;
    ctx.reply(
      `Hello! In order to use this bot, go to your desired chat and type following message: "@${botUsername} link" and wait a few seconds until your video appears. After that, click on it and send!`,
    );
  },
);

export { composer as startComposer };
