# Privy Auth `create-react-app` Starter

This is a template for integrating [Privy Auth](https://www.privy.io/) into a new [`create-react-app`](https://create-react-app.dev/) project.

## Setup:

1. Clone this repository locally.
```
git clone https://github.com/privy-io/privy-create-react-app.git
```

2. Run the command `npm i` to install the necessary dependencies.

3. Setup your environment by running `cp .env.example .env`, and adding your Privy app ID to `.env`.

## Building locally:

In your project directory, run `npm run start`. You can now visit http://localhost:3000 to see the site and login with Privy!

## Check out:

- `src/index.js` for how to use the `PrivyProvider` and pass in your Privy `appId`
- `src/App.js` for how to use the `usePrivy()` hook, fields like `authenticated` and `user`, and methods like `login` and `logout`
- `config-overrides.js` for how to [handle common issues with Webpack 5](https://docs.privy.io/guide/troubleshooting/webpack)
