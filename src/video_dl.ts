import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { COOKIES_FILE, youtubeDl } from "./consts";
import { logger } from "./logger";
import { checkUrl } from "./utils";

/**
 * Validates the download context.
 * @param url The URL of the TikTok video to download.
 * @throws Error if the URL is missing or invalid.
 */
async function validateDownloadContext(url: string): Promise<void> {
  if (!url) {
    throw new Error("Invalid download context: URL is missing.");
  }

  if (!checkUrl(url)) {
    throw new Error("Invalid download context: URL is not a valid video URL.");
  }
}

const cookiesFileImport = COOKIES_FILE ? { cookies: COOKIES_FILE } : {};

/**
 * Downloads a TikTok video using yt-dlp and returns the video as a byte array.
 * @param url The URL of the TikTok video to download.
 * @returns A promise that resolves with the video as a byte array or rejects if an error occurs.
 */
export async function downloadVideo(url: string): Promise<Uint8Array> {
  let tempdir = null;
  try {
    await validateDownloadContext(url);
    logger.info(`Downloading video from ${url}...`);

    // logger.info("creating temp dir")
    // Create a temporary file path
    tempdir = await fs.mkdtemp(path.join(tmpdir(), "videodl-"));
    const tmpFilePath = path.join(tempdir, "file.mp4");

    // Download the video using youtube-dl-exec and output to a temporary file
    await youtubeDl(url, {
      output: tmpFilePath,
      format: "mp4",
      dumpSingleJson: true,
      // @ts-expect-error - no simulate is actually a working option
      noSimulate: true,
      // check whether video is vertical and under 5 minutes
      matchFilter: "aspect_ratio < 1 & duration <= 300",
      // import cookies file from yt-dlp/youtube-dl export, if specified in environment variable
      ...cookiesFileImport,
    });

    // Read the file into a Buffer
    const buffer = await fs.readFile(tmpFilePath);

    // Delete the temporary file
    await fs.unlink(tmpFilePath);

    // Delete the temporary directory
    await fs.rm(tempdir, { recursive: true });

    logger.info("Successfully downloaded video to buffer");
    return buffer;
  } catch (error) {
    logger.error(`Failed to download video: ${error}`);

    // Delete the temporary directory if it exists, just in case
    if (tempdir && (await fs.exists(tempdir))) {
      await fs.rm(tempdir, { recursive: true });
    }
    throw error;
  }
}
