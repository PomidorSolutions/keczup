import { randomUUIDv7 } from "bun";
import { Composer, InlineQueryResultBuilder, InputFile } from "grammy";
import { failedArticle, GROUP_ID, URL_REGEXS } from "../consts";
import { logger } from "../logger";
import { downloadVideo } from "../video_dl";

const composer = new Composer();

composer.inlineQuery(URL_REGEXS, async (ctx) => {
  const query = ctx.inlineQuery.query;
  const inlineQueryId = ctx.inlineQuery.id;
  const now = Date.now();
  logger.info(
    `query is ${query}, id: ${inlineQueryId}, timestamp: ${now} | sent by ${ctx.inlineQuery.from.id} || @${ctx.inlineQuery.from.username}`,
  );

  if (!query || !GROUP_ID) {
    return;
  }

  try {
    // Download the TikTok video
    const videoBuffer = await downloadVideo(query);
    logger.info("Video download started successfully!");

    // Upload the video to Telegram
    const message = await ctx.api.sendVideo(
      GROUP_ID,
      new InputFile(videoBuffer, "tiktok.mp4"),
    );

    // logger.info("Message object:", message);

    if (!message?.video) {
      logger.error("Failed to upload video to Telegram or retrieve file_id");
      return;
    }

    const fileId = message.video.file_id;

    // Send the video as a cached MP4
    const results = [
      InlineQueryResultBuilder.videoCached(
        randomUUIDv7(),
        "Downloaded Video (click me to send)",
        fileId,
        {},
      ),
    ];
    await ctx.answerInlineQuery(results, { cache_time: 3600 });
  } catch (error) {
    logger.error(`Failed to start video download: ${error}`);
    await ctx.answerInlineQuery([failedArticle], {
      cache_time: 60,
    });
  }
});

export { composer as inlineComposer };
