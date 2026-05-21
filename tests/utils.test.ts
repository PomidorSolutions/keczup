import { describe, expect, test } from "bun:test";
import { check_url } from "../src/utils";

describe("Utils tests", () => {
  test("check_url helper function", () => {
    expect(check_url("https://vm.tiktok.com/ZNdLTedR7/")).toBe(true);
    expect(
      check_url("https://www.tiktok.com/@dailybrrd/video/7642268238021266702"),
    ).toBe(true);
    expect(check_url("https://www.instagram.com/reels/C8d8RIIu-ZA/")).toBe(
      true,
    );
    expect(check_url("https://www.instagram.com/reel/C8d8RIIu-ZA/")).toBe(true);
    expect(
      check_url("https://www.instagram.com/dailybrrd/reel/C8d8RIIu-ZA/"),
    ).toBe(true);
    expect(check_url("https://www.instagram.com/p/C8d8RIIu-ZA/")).toBe(true);
  });
});
