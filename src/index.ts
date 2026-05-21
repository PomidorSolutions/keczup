import { Bot } from "grammy";
import { composition } from "./handlers/handlers";
import { startup_guard } from "./utils";

startup_guard();

const bot = new Bot(process.env.TOKEN ? process.env.TOKEN : "");

bot.use(composition);

console.log("Ketczup is starting...");

bot.start({ drop_pending_updates: false });
