Install:
===================
```sh
npm i
```

Configure:
===================
env
-------------------
Need set environment variable `NODE_ENV` in `development` or `production`.

.env
```env
SERVER_PORT=3000
```

more info [dotenv](https://github.com/motdotla/dotenv)

configs
-------------------
Configs must be placed in `/config` directory.

By default we use 3 config files:
`default.json`,`development.json`,`production.json`. 

`default.json` - general config

`production.json` - only for production

`develop.json` - only for develop

For example:

default.json
```json
{
  "server_port":4000
}
```

development.json
```json
{
  "env":"development"
}
```

production.json
```json
{
  "env":"production"
}
```

more info [node-config](https://github.com/lorenwest/node-config).


Usage:
===================
```npm run build``` - build application.

```npm run watch``` - watch mode.

```npm run serve``` - run server.

```npm run lint:fix``` - fix problems.

```npm run test``` - run tests.