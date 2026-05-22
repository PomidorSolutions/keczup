import * as fs from "node:fs/promises";
import * as path from "node:path";
import { GROUP_ID, TOKEN, URL_REGEXS, youtubeDl } from "./consts";
import { logger } from "./logger";

/**
 * Checks if a given URL is a valid shortform URL.
 * @param url The URL of the shortform video to download.
 * @returns `true` if the URL is a valid shortform URL, `false` otherwise.
 */
const check_url = (url: string) => {
  for (const test of URL_REGEXS) {
    if (test.test(url)) {
      return true;
    }
  }

  return false;
};

const checkLastestVersion = async () => {
  const releaseReq = await fetch(
    "https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest",
  );
  const releaseResp = await releaseReq.json();

  const { tag_name: latestVersion } = (await releaseResp) as {
    [key: string]: string;
  };
  return latestVersion;
};

const downloadYTDLP = async (latestVersion: string | undefined) => {
  if (!latestVersion) {
    latestVersion = "latest";
  }

  const cpuArch = process.arch as string;
  const osPlatform = process.platform as string;
  const execExt = osPlatform === "win32" ? ".exe" : "";
  const ytdlBinPath = path.join(__dirname, "bin", `yt-dlp${execExt}`);
  await fs.mkdir(path.join(__dirname, "bin"), { recursive: true });

  const platformMap = {
    linux_x64: "linux",
    linux_arm64: "linux_aarch64",
    win32_x64: "x86",
    win32_arm64: "arm64",
  };

  const versionPlatform =
    platformMap[`${osPlatform}_${cpuArch}` as keyof typeof platformMap] ??
    `${osPlatform}_${cpuArch}`;

  const latestYtdlUrl = `https://github.com/yt-dlp/yt-dlp/releases/download/${latestVersion}/yt-dlp_${versionPlatform}${execExt}`;
  const apiResp = await fetch(latestYtdlUrl);
  const respData = await apiResp.arrayBuffer();
  const binBuffer = Buffer.from(respData);
  // TODO: add checksums
  await fs.writeFile(ytdlBinPath, binBuffer);
  await fs.chmod(ytdlBinPath, 0o755);
};

const checkYtdlUpdates = async () => {
  let version: string | null = null;
  try {
    version = (await youtubeDl("", { version: true })) as unknown as string;
  } catch (err) {
    if ((err as { code: string | undefined })?.code === "ENOENT") {
      // assume youtube-dl is not installed, set version to null
      version = null;
    }
  }

  const latestVersion = await checkLastestVersion();

  if (latestVersion === version) {
    return;
  }

  logger.info(`Updating youtube-dl from ${version} to ${latestVersion}`);
  await downloadYTDLP(latestVersion);
};

const startup_guard = async () => {
  if (!GROUP_ID || !TOKEN) {
    throw new Error("GROUP_ID and TOKEN environment variables are required");
  }
  await checkYtdlUpdates();
};

export { check_url, startup_guard };
