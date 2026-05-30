import { describe, expect, test } from "bun:test";
import { checkUrl, parseRateLimit } from "../src/utils";

describe("checkUrl", () => {
  test("tiktok desktop", () => {
    expect(
      checkUrl("https://www.tiktok.com/@dailybrrd/video/7642268238021266702"),
    ).toBe(true);
  });

  test("tiktok mobile", () => {
    expect(checkUrl("https://vm.tiktok.com/ZNdLTedR7/")).toBe(true);
  });

  test(`instagram reels ("reels" url)`, () => {
    expect(checkUrl("https://www.instagram.com/reels/C8d8RIIu-ZA/")).toBe(true);
  });

  test(`instagram reels ("reel" url)`, () => {
    expect(checkUrl("https://www.instagram.com/reel/C8d8RIIu-ZA/")).toBe(true);
  });

  test("instagram reels as profile reel", () => {
    expect(
      checkUrl("https://www.instagram.com/dailybrrd/reel/C8d8RIIu-ZA/"),
    ).toBe(true);
  });

  test("instagram reels as a post", () => {
    expect(checkUrl("https://www.instagram.com/p/C8d8RIIu-ZA/")).toBe(true);
  });

  test("youtube shorts", () => {
    expect(checkUrl("https://www.youtube.com/shorts/wmLmhyPDsNo")).toBe(true);
  });

  test("youtube video", () => {
    expect(checkUrl("https://www.youtube.com/watch?v=qcPS9KKJ5Vg")).toBe(false);
  });
});

describe("parseRateLimit", () => {
  test("undefined input (env var not set)", () => {
    const rateLimit = parseRateLimit(undefined);
    expect(rateLimit).toEqual(undefined);
  });

  test("defined input", () => {
    const rateLimit = parseRateLimit("100/1");
    expect(rateLimit).toEqual({ limit: 100, timeFrame: 1 });
  });
});
