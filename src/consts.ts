import * as path from "node:path";
import { randomUUIDv7 } from "bun";
import { InlineQueryResultBuilder } from "grammy";
import { create as createYoutubeDl } from "youtube-dl-exec";

const GROUP_ID = process.env?.GROUP_ID;
const TOKEN = process.env?.TOKEN;
const COOKIES_FILE = process.env?.COOKIES_FILE;
const RATE_LIMIT = process.env?.RATE_LIMIT;

const TIKTOK_MOBILE_URL_REGEX =
  /^(?:https?:\/\/)?vm\.tiktok\.com\/[\w]{1,20}\/?$/;

const TIKTOK_DESKTOP_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w\.]{1,24}\/video\/\d+$/;

const INSTAGRAM_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[\w.]{1,30}\/)?(?:reels?\/|p\/)?[\w-]+\/?/;

const YOUTUBE_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:shorts\/)[\w-]+\/?/;

const URL_REGEXS = [
  TIKTOK_MOBILE_URL_REGEX,
  TIKTOK_DESKTOP_URL_REGEX,
  INSTAGRAM_URL_REGEX,
  YOUTUBE_URL_REGEX,
];

const failedArticle = InlineQueryResultBuilder.article(
  randomUUIDv7(),
  "Download Failed",
).text("Download failed. Try again!");

const rateLimitedArticle = InlineQueryResultBuilder.article(
  randomUUIDv7(),
  "Request Limit Reached",
).text(
  "To keep the bot running smoothly for everyone, you have to slow down. Please try again in a while.",
);

const binaryPath =
  process.platform === "win32" ? "./bin/yt-dlp.exe" : "./bin/yt-dlp";
const youtubeDl = createYoutubeDl(path.resolve(binaryPath));

export {
  COOKIES_FILE,
  failedArticle,
  GROUP_ID,
  INSTAGRAM_URL_REGEX,
  RATE_LIMIT,
  rateLimitedArticle,
  TIKTOK_DESKTOP_URL_REGEX,
  TIKTOK_MOBILE_URL_REGEX,
  TOKEN,
  URL_REGEXS,
  YOUTUBE_URL_REGEX,
  youtubeDl,
};
