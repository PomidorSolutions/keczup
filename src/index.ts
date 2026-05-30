import { Bot } from "grammy";
import { composition } from "./handlers/composition";
import { logger } from "./logger";
import { handleGracefulExit, startupGuard } from "./utils";

await startupGuard();

const bot = new Bot(process.env.TOKEN ?? "");

bot.use(composition);

logger.info("Ketczup is starting...");

bot.start({
  drop_pending_updates: false,
  onStart: (botInfo) => {
    logger.info(`Bot started, Logged in as ${botInfo.username}`);
  },
});

process.once("SIGINT", () => handleGracefulExit(bot));
process.once("SIGTERM", () => handleGracefulExit(bot));
