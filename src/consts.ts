import { randomUUIDv7 } from "bun";
import { InlineQueryResultBuilder } from "grammy";

const GROUP_ID = process.env?.GROUP_ID;
const TOKEN = process.env?.TOKEN;
const COOKIES_FILE = process.env?.COOKIES_FILE;

const TIKTOK_MOBILE_URL_REGEX =
  /^(?:https?:\/\/)?vm\.tiktok\.com\/[\w]{1,20}\/?$/;

const TIKTOK_DESKTOP_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w\.]{1,24}\/video\/\d+$/;

const INSTAGRAM_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:[\w.]{1,30}\/)?(?:reels?\/|p\/)?[\w-]+\/?/;

const URL_REGEXS = [
  TIKTOK_MOBILE_URL_REGEX,
  TIKTOK_DESKTOP_URL_REGEX,
  INSTAGRAM_URL_REGEX,
];

const failedArticle = InlineQueryResultBuilder.article(
  randomUUIDv7(),
  "Download Failed",
).text("Download failed. Try again!");

export {
  COOKIES_FILE,
  failedArticle,
  GROUP_ID,
  INSTAGRAM_URL_REGEX,
  TIKTOK_DESKTOP_URL_REGEX,
  TIKTOK_MOBILE_URL_REGEX,
  TOKEN,
  URL_REGEXS,
};
