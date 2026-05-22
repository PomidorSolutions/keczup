import { describe, expect, test } from "bun:test";
import { check_url } from "../src/utils";

describe("check_url", () => {
  test("tiktok desktop", () => {
    expect(
      check_url("https://www.tiktok.com/@dailybrrd/video/7642268238021266702"),
    ).toBe(true);
  });

  test("tiktok mobile", () => {
    expect(check_url("https://vm.tiktok.com/ZNdLTedR7/")).toBe(true);
  });

  test(`instagram reels ("reels" url)`, () => {
    expect(check_url("https://www.instagram.com/reels/C8d8RIIu-ZA/")).toBe(
      true,
    );
  });

  test(`instagram reels ("reel" url)`, () => {
    expect(check_url("https://www.instagram.com/reel/C8d8RIIu-ZA/")).toBe(true);
  });

  test("instagram reels as profile reel", () => {
    expect(
      check_url("https://www.instagram.com/dailybrrd/reel/C8d8RIIu-ZA/"),
    ).toBe(true);
  });

  test("instagram reels as a post", () => {
    expect(check_url("https://www.instagram.com/p/C8d8RIIu-ZA/")).toBe(true);
  });

  test("youtube shorts", () => {
    expect(check_url("https://www.youtube.com/shorts/wmLmhyPDsNo")).toBe(true);
  });

  test("youtube video", () => {
    expect(check_url("https://www.youtube.com/watch?v=qcPS9KKJ5Vg")).toBe(
      false,
    );
  });
});
