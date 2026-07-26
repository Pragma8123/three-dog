# AGENTS.md - Developer & Agent Guide for Three Dog

Welcome! This document serves as the authoritative guide for AI agents and human developers working on **Three Dog**—the Fallout 3 Galaxy News Radio (GNR) Discord Bot.

---

## 1. Project Overview & Purpose

**Three Dog** is a Discord bot inspired by Fallout 3's iconic radio host, Three Dog ("*Aaaaowww! Bringing you the truth, no matter how bad it hurts!*").

### Key Features
- **GNR Radio Streaming**: Joins voice channels and streams Galaxy News Radio broadcasts (`gnr.ogg`).
- **Fallout Memes**: Fetches and posts Fallout-related memes from Reddit (`/meme`).
- **Top.gg Integration**: Links to voting pages and posts bot metrics to Top.gg (`/vote`).
- **Web Frontend**: Serves a single-page Vue 3 dashboard at `/` alongside the backend NestJS REST API.
- **Health Monitoring**: Dedicated health check endpoint at `/api/health`.

---

## 2. Tech Stack & Architecture

### Core Technologies
- **Backend Framework**: NestJS v11 (TypeScript)
- **Discord Library**: `discord.js` v14 + `@discord-nestjs/core` v5
- **Voice / Audio Engine**: `@discordjs/voice` + `@discordjs/opus`
- **Frontend Client**: Vue 3 + Vite + TypeScript (served via `@nestjs/serve-static`)
- **Build System**: Nest CLI + Webpack HMR (`webpack-hmr.config.js`)
- **Testing**: Jest (Unit + E2E with `ts-jest`)
- **Containerization**: Docker (Multi-stage build using `node:lts-jod`)
- **CI/CD & Releases**: GitHub Actions + `semantic-release`
- **Code Quality**: ESLint + Prettier + Husky

### System Architecture & State Model
```
 +-------------------------------------------------------+
 |                     Discord API                       |
 +---------------------------+---------------------------+
                             |
                   Discord Gateway / Voice
                             |
                             v
 +-------------------------------------------------------+
 |                 Three Dog NestJS App                  |
 |                                                       |
 |  +--------------------+    +-----------------------+  |
 |  |    BotModule       |    |     RedditModule      |  |
 |  |  - BotGateway      |    |  - RedditService      |  |
 |  |  - BotService      |    +-----------------------+  |
 |  |  - RadioService    |    |      TGGModule        |  |
 |  |    (gnr.ogg audio) |    |  - TGGService (Top.gg)|  |
 |  +--------------------+    +-----------------------+  |
 |            |                            |             |
 |            v                            v             |
 |  +-------------------------------------------------+  |
 |  |              AppModule (Root)                   |  |
 |  +-------------------------------------------------+  |
 |                            |                          |
 |            +---------------+---------------+          |
 |            v                               v          |
 |  +-------------------+           +------------------+ |
 |  | HealthController  |           | ServeStatic      | |
 |  |  GET /api/health  |           | (Vue 3 Client)   | |
 |  +-------------------+           +------------------+ |
 +-------------------------------------------------------+
```

> [!NOTE]
> **Stateless Design**: Three Dog operates without a persistent database. It relies strictly on `discord.js` memory caches and Discord Gateway state. Restarting the process clears active voice connections.

---

## 3. Development Setup & Commands

### Prerequisites
- **Node.js**: v20+ (LTS Jod)
- **npm**: v10+
- **FFmpeg / Build Tools**: Required for audio transcoding and native `@discordjs/opus` compilation on Linux/macOS.

### Initial Setup
```bash
# 1. Install root backend dependencies
npm install

# 2. Install client frontend dependencies
cd client && npm install && cd ..

# 3. Configure environment variables
cp .env.sample .env
```

### Key NPM Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run start:dev` | Start NestJS backend in development mode with Webpack HMR |
| `npm run build` | Build both NestJS backend and Vue 3 frontend (`client/dist`) |
| `npm run start:prod` | Run the compiled production app (`dist/main.js`) |
| `npm run lint` | Run ESLint across backend and frontend |
| `npm run format` | Format code using Prettier (`prettier --write`) |
| `npm run test` | Run unit tests with Jest |
| `npm run test:e2e` | Run end-to-end tests using `jest-e2e.json` |
| `npm run test:cov` | Generate test coverage report |
| `cd client && npm run dev` | Launch Vite development server for Vue frontend |

---

## 4. Module Structure & Key Files

```
three-dog/
├── gnr.ogg                    # 84MB Galaxy News Radio broadcast audio file
├── nest-cli.json              # NestJS CLI configuration
├── webpack-hmr.config.js      # Webpack Hot Module Replacement config
├── Dockerfile                 # Multi-stage Docker build
├── .env.sample                # Sample environment configuration
├── src/                       # NestJS Backend source code
│   ├── main.ts                # App entrypoint (listens on port 3000)
│   ├── app.module.ts          # Root module (wires features & static asset serving)
│   ├── health.controller.ts   # Health check controller (/api/health)
│   ├── bot/                   # Core Discord Bot module
│   │   ├── bot.module.ts      # Bot module definition
│   │   ├── bot.service.ts     # General bot business logic
│   │   ├── bot.gateway.ts     # Discord gateway event handlers
│   │   ├── bot.controller.ts  # HTTP endpoints for bot status
│   │   ├── radio.service.ts   # Voice channel joining & gnr.ogg audio streaming
│   │   └── commands/          # Slash command definitions
│   │       ├── tune-in.command.ts   # /tunein - Join voice channel & play GNR
│   │       ├── tune-out.command.ts  # /tuneout - Leave voice channel
│   │       ├── meme.command.ts      # /meme - Post Fallout meme
│   │       ├── vote.command.ts      # /vote - Link to Top.gg voting
│   │       └── help.command.ts      # /help - Show bot commands
│   ├── reddit/                # Reddit integration module
│   │   ├── reddit.module.ts
│   │   └── reddit.service.ts  # Fetches Fallout memes from subreddits
│   └── tgg/                   # Top.gg (TGG) integration module
│       ├── tgg.module.ts
│       └── tgg.service.ts     # Top.gg API client for server counts & voting stats
├── client/                    # Vue 3 Frontend (Vite Single-Page Application)
│   ├── index.html             # Client HTML entrypoint
│   ├── vite.config.ts         # Vite build configuration
│   ├── src/
│   │   ├── App.vue            # Main App layout
│   │   └── views/HomeView.vue # Web dashboard view
│   └── public/                # Static assets (Three Dog logo, GNR logo, fonts)
└── test/                      # E2E testing suite
    └── jest-e2e.json          # Jest E2E configuration
```

---

## 5. Coding & Workflow Conventions

### NestJS & `@discord-nestjs/core` Guidelines
- Feature logic **must** be encapsulated within dedicated NestJS modules (`src/<feature>/<feature>.module.ts`).
- Slash commands use `@discord-nestjs/core` decorators (`@Command()`, `@Handler()`).
- Always use NestJS dependency injection (`@Injectable()`) for services.

### Code Style & Formatting
- **TypeScript**: Strict mode enabled (`tsconfig.json`). Explicitly declare return types on public methods.
- **Imports**: Group standard library imports first, external npm packages second, internal modules third.
- **Linting**: ESLint handles unused imports and Vue component syntax. Run `npm run lint` before committing.
- **Formatting**: Adhere to Prettier formatting. Run `npm run format` to auto-format changes.

### Git & Release Protocol
- **Conventional Commits**: Commit messages **must** follow conventional commit syntax (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- **Automated Versioning**: `semantic-release` automatically generates version tags and changelogs on pushes to the `main` branch based on commit prefixes.

---

## 6. Testing Strategy

- **Unit Tests**: Co-located with source files as `*.spec.ts`. Focus on service isolation using Jest mocks (`jest.fn()`).
- **E2E Tests**: Located in `test/` directory. Run via `npm run test:e2e` using `jest-e2e.json`.
- **Coverage Target**: Aim for code coverage across services (`radio.service.ts`, `reddit.service.ts`, `tgg.service.ts`).

---

## 7. Deployment & CI/CD Pipeline

### Docker Multi-Stage Build
The `Dockerfile` utilizes a three-stage build process with `node:lts-jod` as the base image:
1. **`development`**: Installs all dependencies and supports local containerized dev mode.
2. **`build`**: Compiles NestJS backend and Vue 3 frontend (`npm run build`).
3. **`production`**: Copies built artifacts (`dist/` and `client/dist/`) and production dependencies only to minimize image size.

```bash
# Build production Docker image
docker build -t three-dog:latest .

# Run production container
docker run -d -p 3000:3000 --env-file .env three-dog:latest
```

### GitHub Actions Workflows
- **`test.yml`**: Runs on pull requests to `main`. Executes linter, unit tests, and E2E tests.
- **`release.yml`**: Runs on pushes to `main`. Triggers `semantic-release` for version tagging.
- **`build_and_push.yml`**: Builds the multi-stage Docker container and pushes it to the container registry.

---

## 8. Environment Variables

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `BOT_TOKEN` | **Yes** | Discord Bot secret token from Discord Developer Portal | `NzA1...` |
| `TGG_TOKEN` | Optional | Top.gg API token for posting bot stats | `eyJhbG...` |
| `PORT` | Optional | Port for HTTP server (Defaults to `3000`) | `3000` |
| `NODE_ENV` | Optional | Environment mode (`development` \| `production`) | `production` |

---

## 9. Common Tasks for AI Agents

### Task A: Adding a New Slash Command
1. Create a new command file in `src/bot/commands/my-command.command.ts`.
2. Annotate the class with `@Command({ name: 'my-command', description: '...' })`.
3. Implement the `handler` method using `@Handler()`.
4. Register the command in `src/bot/bot.module.ts` under `providers`.
5. Add corresponding unit tests in `src/bot/commands/my-command.command.spec.ts`.

### Task B: Modifying GNR Audio / Radio Service
- Audio streaming logic resides in `src/bot/radio.service.ts`.
- Uses `@discordjs/voice` (`createAudioPlayer`, `createAudioResource`, `joinVoiceChannel`).
- Ensure audio resource handles `gnr.ogg` cleanly without memory leaks when looping or leaving voice channels.

### Task C: Updating Reddit Meme Sources
- Subreddit fetching logic resides in `src/reddit/reddit.service.ts`.
- Check active subreddits (e.g., `r/FalloutMemes`, `r/Fallout`, `r/fnv`). Ensure NSFW post filtering is maintained.

### Task D: Modifying the Vue Frontend
- Frontend code is inside `client/`.
- Edit `client/src/views/HomeView.vue` or add components under `client/src/components/`.
- Verify static serving by running `npm run build` and testing `GET /`.

---

## 10. Gotchas & Pitfalls

> [!WARNING]
> **Audio File Presence (`gnr.ogg`)**: The 84MB `gnr.ogg` file must exist in the root folder. Ensure it is preserved in Docker build stages and not omitted in custom deployment artifacts.

> [!IMPORTANT]
> **Top.gg (TGG) Acronym**: In this repository, **TGG** stands for **Top.gg** (the Discord bot directory service). `tgg.service.ts` communicates with the Top.gg API to update server counts and check vote status.

> [!CAUTION]
> **Native Opus Compilation**: `@discordjs/opus` requires native build tools (gcc/g++, make, python3) during `npm install`. The Dockerfile includes these build dependencies in the build stage.

> [!NOTE]
> **Discord Gateway Intents**: The bot requires **Guild Voice States** (`GUILD_VOICE_STATES`) and **Guilds** (`GUILD_MESSAGES` / `GUILDS`) enabled in both code and the Discord Developer Portal for voice channel functionality.
