import { GROUP_ID, TOKEN, URL_REGEXS } from "./consts";

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
};

const startup_guard = () => {
  if (!GROUP_ID || !TOKEN) {
    throw new Error("GROUP_ID and TOKEN environment variables are required");
  }
};

export { check_url, startup_guard };
