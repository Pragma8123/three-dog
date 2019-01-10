require('dotenv').config(); // Load env variables from .env
const Bundler = require('parcel-bundler');
const path = require('path');
const app = require('express')();

const bundler = new Bundler(
  path.join(__dirname, 'index.html'),
);

app.use(bundler.middleware());

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
});
