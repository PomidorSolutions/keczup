![image](.github/assets/logo.svg)

An inline Telegram bot for fetching short-form videos (Shorts, Reels, TikToks) directly into any chat

# Features

- YouTube Shorts, Instagram Reels, TikTok support
- Invoking with `@keczupbot <url>` anywhere in Telegram
- Auto-updating of yt-dlp to stay compatible with platform changes
- Smart filtering of long/unwanted content

# How to use

0. Send `/start` to `@ketchupbot` on Telegram, in order to initialize the bot for your account. You only have to do this once.
1. Go to any Telegram chat and start your message by mentioning `@keczupbot` followed by a link, e.g. `@keczupbot https://vm.tiktok.com/...`
2. Wait while bot fetches the video (indicated by emoji/send button changing into a loading spinner). This may take a few seconds.
3. Once the video is fetched, a popup with video will appear above the message input field.
4. Click on it and send it away!

# Installation

## Self-hosting (Docker)

- Clone the repository and enter the directory

```bash
git clone https://github.com/pomidorsolutions/keczup
cd keczup
```

- Create `.env`

```bash
cp .env.sample .env
```

- Fill in your `.env` values
- Build and run the Docker container with Docker Compose

```bash
docker compose build
docker compose up -d
```

## Local development

### Requirements

- [Mise](https://mise.jdx.dev/getting-started.html) for dev tool management
- Docker & Docker Compose for running in production

### Setup

- Clone the repository and enter the directory

```bash
git clone https://github.com/pomidorsolutions/keczup
cd keczup
```

- Install dev tools (Bun, etc.) via Mise

```bash
mise install
mise activate
```

- Install dependencies and create `.env`

```bash
bun install
cp .env.sample .env
```

- Fill in your `.env` values

- Run the bot

```bash
bun run index.ts
```

# Thanks

- [yt-dlp](https://github.com/yt-dlp/yt-dlp/) - video extraction
- [grammY](https://github.com/grammyjs/grammy) - telegram bot framework
- [EndRayRei](https://instagram.com/endrayrei) - Logo design
