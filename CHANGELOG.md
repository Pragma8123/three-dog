## [1.11.1](https://github.com/Pragma8123/three-dog/compare/v1.11.0...v1.11.1) (2024-11-21)


### Bug Fixes

* **reddit:** fix errors on meme command ([54a2af3](https://github.com/Pragma8123/three-dog/commit/54a2af3791ac142fb0d88e635b3b7f2208b87df0))

# [1.11.0](https://github.com/Pragma8123/three-dog/compare/v1.10.3...v1.11.0) (2024-01-09)


### Bug Fixes

* **deps:** npm audit fix --force ([6d538c9](https://github.com/Pragma8123/three-dog/commit/6d538c901af8b4a2a8a6b61cbada8e4ac47111a9))
* **deps:** update axios to equivalent version in nestjs/axios ([844646d](https://github.com/Pragma8123/three-dog/commit/844646d8d03fe0c3b4da78bbdb22ab144f103240))


### Features

* **reddit:** cache requests to reddit ([0a2abdc](https://github.com/Pragma8123/three-dog/commit/0a2abdc995ef45e9dbdebeb3d8eb240aa64a3e92))

## [1.10.3](https://github.com/Pragma8123/three-dog/compare/v1.10.2...v1.10.3) (2023-10-23)


### Reverts

* Revert "build(actions): use npm install instead of ci" ([a3b7879](https://github.com/Pragma8123/three-dog/commit/a3b7879501e8f6c4b66182039378f3ab9b0531b7))

## [1.10.2](https://github.com/Pragma8123/three-dog/compare/v1.10.1...v1.10.2) (2023-03-21)


### Bug Fixes

* correct event listener mem leak ([f4b5dd0](https://github.com/Pragma8123/three-dog/commit/f4b5dd098077e11e906f67734790d823fc317e3b))

## [1.10.1](https://github.com/Pragma8123/three-dog/compare/v1.10.0...v1.10.1) (2023-03-08)


### Bug Fixes

* **voice:** allow for infinite missed frames and listeners ([a92e30d](https://github.com/Pragma8123/three-dog/commit/a92e30d7eeff6d17e9aa73d278ca736b8137e76a))
* **voice:** fix issue with voice disconnecting after ~1min ([55a4111](https://github.com/Pragma8123/three-dog/commit/55a4111c351a31110740ad2a21481725e9ddb8de))

# [1.10.0](https://github.com/Pragma8123/three-dog/compare/v1.9.1...v1.10.0) (2023-03-08)


### Bug Fixes

* **commands:** update commands for [@discord-nestjs](https://github.com/discord-nestjs) v5 ([0ba3caf](https://github.com/Pragma8123/three-dog/commit/0ba3caf5b1742de41b4a54f9629744e53e192758))


### Features

* **bot:** log interactions with user tag ([34a8d16](https://github.com/Pragma8123/three-dog/commit/34a8d16b6f404dadd5e1656b66f577b603074290))

## [1.9.1](https://github.com/Pragma8123/three-dog/compare/v1.9.0...v1.9.1) (2023-01-19)


### Reverts

* Revert "fix(auth): change /discord/login to a POST route" ([2e9d125](https://github.com/Pragma8123/three-dog/commit/2e9d125501f74ff4973bcbd519e59a9e760331f6))

# [1.9.0](https://github.com/Pragma8123/three-dog/compare/v1.8.2...v1.9.0) (2023-01-18)


### Bug Fixes

* **bot:** correct issue with posting guild count ([bb7c067](https://github.com/Pragma8123/three-dog/commit/bb7c06737ffeb9d257edae405388cf96ea2fd693))
* **commands:** fix undefined version in /help command ([0e8d1b9](https://github.com/Pragma8123/three-dog/commit/0e8d1b9fffd146a897b94cfbba352d3a623a0f15))


### Features

* **docker:** enable graceful shutdown on SIGINT ([5bf1f44](https://github.com/Pragma8123/three-dog/commit/5bf1f440dd36c800f8cf39a9e84a236987aab888))

## [1.8.2](https://github.com/Pragma8123/three-dog/compare/v1.8.1...v1.8.2) (2023-01-18)


### Bug Fixes

* **auth-jwt:** set JWT token expiry to 7 days ([945498b](https://github.com/Pragma8123/three-dog/commit/945498baac9589e9f8e91388323f7f885dfee403))
* **auth:** change /discord/login to a POST route ([4a79196](https://github.com/Pragma8123/three-dog/commit/4a791963459438ecac79c841cdd7b8aa019cac5c))

## [1.8.1](https://github.com/Pragma8123/three-dog/compare/v1.8.0...v1.8.1) (2023-01-10)


### Bug Fixes

* **bot-voice:** fix issue with radio not playing ([80dee6c](https://github.com/Pragma8123/three-dog/commit/80dee6cd62b2fc43272afdc99e92d7296686069e))

# [1.8.0](https://github.com/Pragma8123/three-dog/compare/v1.7.0...v1.8.0) (2023-01-04)


### Features

* add healthcheck API endpoint ([a4113f3](https://github.com/Pragma8123/three-dog/commit/a4113f3a3b7a374d55340984b790db38b2dd665e))

# [1.7.0](https://github.com/Pragma8123/three-dog/compare/v1.6.1...v1.7.0) (2022-12-26)


### Bug Fixes

* Correct errors when not using request contexts ([1a81040](https://github.com/Pragma8123/three-dog/commit/1a81040c2f60577985f5fd93b21f2c70e3f90765))


### Features

* Add GNR listener count to /api/bot ([0f7b0b2](https://github.com/Pragma8123/three-dog/commit/0f7b0b22d8734bb34566240b452adab46a8e11fb))

## [1.6.1](https://github.com/Pragma8123/three-dog/compare/v1.6.0...v1.6.1) (2022-12-23)


### Bug Fixes

* **BotGateway:** Handle Discord gateway errors gracefully ([c59536d](https://github.com/Pragma8123/three-dog/commit/c59536defd925a84857e6955476cf92e90d8a799))

# [1.6.0](https://github.com/Pragma8123/three-dog/compare/v1.5.1...v1.6.0) (2022-12-10)


### Bug Fixes

* **client:** Fix GitHub repo link ([bf20974](https://github.com/Pragma8123/three-dog/commit/bf20974efa37ed9f0474d48b44ad40d0322f5350))


### Features

* **bot:** Add bot endpoint to backend ([79bdc7a](https://github.com/Pragma8123/three-dog/commit/79bdc7a7799b44950574df7fb92e1c9aec2d334a))

## [1.5.1](https://github.com/Pragma8123/three-dog/compare/v1.5.0...v1.5.1) (2022-12-09)


### Bug Fixes

* **oauth:** Handle invalid code errors gracefully ([442b5d9](https://github.com/Pragma8123/three-dog/commit/442b5d9e22183bdd33f51f478a550e8d93089973))

# [1.5.0](https://github.com/Pragma8123/three-dog/compare/v1.4.0...v1.5.0) (2022-12-09)


### Features

* **backend:** Add discord w/ JWT auth ([ca8912e](https://github.com/Pragma8123/three-dog/commit/ca8912ede9efe68e05c3d2207ecdc50383dc5795))

# [1.4.0](https://github.com/Pragma8123/three-dog/compare/v1.3.1...v1.4.0) (2022-12-03)


### Features

* **client:** adding Vue to the front end ([2761bb5](https://github.com/Pragma8123/three-dog/commit/2761bb596e352859d430f4f04d886fbe3b22f291))
* **client:** adding Vue to the front end ([bab8d53](https://github.com/Pragma8123/three-dog/commit/bab8d53e54bcb875dcc8648595e75d1653fd1ea3))

## [1.3.1](https://github.com/Pragma8123/three-dog/compare/v1.3.0...v1.3.1) (2022-11-29)


### Bug Fixes

* **client:** fix Open Graph tags ([c02f86c](https://github.com/Pragma8123/three-dog/commit/c02f86c6aa588656cc61028f08c24c572b848275))

# [1.3.0](https://github.com/Pragma8123/three-dog/compare/v1.2.1...v1.3.0) (2022-11-28)


### Features

* **client:** init client ([#83](https://github.com/Pragma8123/three-dog/issues/83)) ([16e389f](https://github.com/Pragma8123/three-dog/commit/16e389f092718c3bc1531d67a9ea4d123ee7c96f))

## [1.2.1](https://github.com/Pragma8123/three-dog/compare/v1.2.0...v1.2.1) (2022-11-26)


### Bug Fixes

* testing semantic-release ([14c387a](https://github.com/Pragma8123/three-dog/commit/14c387a3e96a25df8a2320b5202fa64c30f61ef1))
