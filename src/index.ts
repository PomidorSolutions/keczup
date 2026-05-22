import { Bot } from "grammy";
import { composition } from "./handlers/composition";
import { logger } from "./logger";
import { startup_guard } from "./utils";

await startup_guard();

const bot = new Bot(process.env.TOKEN ?? "");

bot.use(composition);

logger.info("Ketczup is starting...");

bot.start({
  drop_pending_updates: false,
  onStart: (botInfo) => {
    logger.info(`Bot started, Logged in as ${botInfo.username}`);
  },
});
