require('dotenv').config();
const ThreeDog = require('./ThreeDog');

const threeDog = new ThreeDog(process.env.BOT_TOKEN);
threeDog.launch();
