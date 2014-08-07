## Example Waffle.io Webhook Client

This application uses Waffle.io's oauth API to login, and consumes Waffle webhooks. Use this application as an example for writing your own Waffle client.

To run this app, you'll need to set a few environment variables:

- `WAFFLE_CLIENT_ID` and `WAFFLE_CLIENT_SECRET`: the application client id you've configured on Waffle. Currently, contact support@waffle.io to be granted a client id and secret.
- `CALLBACK_BASE_URL`: The url to configure the webhook to send events to. When running locally, we use [ngrok](ngrok.com) to route a real url to our localhost.

To start the app:

- `npm install`
- `npm start`, or, if setting env vars inline: `WAFFLE_CLIENT_ID=<your id> WAFFLE_CLIENT_SECRET=<your secret> CALLBACK_BASE_URL=<http://<something>.ngrok.com npm start`

We use the [passport-waffle.io](https://github.com/waffleio/  passport-waffle.io) strategy for oauth. It's open source, if you're building a NodeJS application it's the way to go.
