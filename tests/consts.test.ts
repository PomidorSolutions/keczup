import { describe, expect, test } from "bun:test";
import {
  INSTAGRAM_URL_REGEX,
  TIKTOK_DESKTOP_URL_REGEX,
  TIKTOK_MOBILE_URL_REGEX,
  YOUTUBE_URL_REGEX,
} from "../src/consts";

describe("Social Media Consts tests", () => {
  test("TIKTOK_MOBILE_URL_REGEX", () => {
    expect(
      TIKTOK_MOBILE_URL_REGEX.test("https://vm.tiktok.com/ZNdLTedR7/"),
    ).toBe(true);
  });

  test("TIKTOK_DESKTOP_URL_REGEX", () => {
    expect(
      TIKTOK_DESKTOP_URL_REGEX.test(
        "https://www.tiktok.com/@dailybrrd/video/7642268238021266702",
      ),
    ).toBe(true);
  });

  test("INSTAGRAM_URL_REGEX", () => {
    expect(
      INSTAGRAM_URL_REGEX.test("https://www.instagram.com/reels/C8d8RIIu-ZA/"),
    ).toBe(true);
    expect(
      INSTAGRAM_URL_REGEX.test("https://www.instagram.com/reel/C8d8RIIu-ZA/"),
    ).toBe(true);
    expect(
      INSTAGRAM_URL_REGEX.test(
        "https://www.instagram.com/dailybrrd/reel/C8d8RIIu-ZA/",
      ),
    ).toBe(true);
    expect(
      INSTAGRAM_URL_REGEX.test("https://www.instagram.com/p/C8d8RIIu-ZA/"),
    ).toBe(true);
  });

  test("YOUTUBE_URL_REGEX", () => {
    expect(
      YOUTUBE_URL_REGEX.test("https://www.youtube.com/shorts/wmLmhyPDsNo"),
    ).toBe(true);
    expect(
      YOUTUBE_URL_REGEX.test("https://www.youtube.com/watch?v=qcPS9KKJ5Vg"),
    ).toBe(false);
  });
});
