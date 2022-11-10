# Privy Auth `create-react-app` Starter

This is a template for integrating Privy Auth into a new [`create-react-app`](https://create-react-app.dev/) project.

## Setup:

First, run the following command to clone this repository locally:
```
git clone https://github.com/privy-io/privy-create-react-app.git
```

Next, run the command `npm i` to install the necessary dependencies.

Then, in `src/index.js`, on line 12, update the `appId` within the `PrivyProvider` to be your Privy app ID.

## Building locally:

In your project directory, run `npm run start`. You can now visit http://localhost:3000 to see the site and login with Privy!

## Check out:
- `src/index.js` for how to wrap your React components with the `PrivyProvider` and how to pass in your Privy `appId`
- `src/App.js` for how to use the `usePrivy()` hook, fields like `authenticated` and `user`, and methods like `login` and `logout`
- `config-overrides.js` for how to bypass create-react-app's incompatibility with Webpack 5 when using web3 libraries
