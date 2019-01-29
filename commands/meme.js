require('dotenv').config();
const axios = require('axios');
const logger = require('../logger');

const subs = ['FalloutMemes', 'FalloutHumor', 'NewVegasMemes'];
const domains = ['i.redd.it', 'i.imgur.com'];

module.exports = async (bot, msg) => {
  try {
    const sub = subs[Math.floor(Math.random() * subs.length)];
    const { data } = await axios.get(`https://reddit.com/r/${sub}.json`, {
      params: {
        sort: 'top',
        t: 'week',
        limit: 50,
      },
    });
    // We only want SFW image posts
    const posts = data.data.children.filter(
      post =>
        !post.data.is_video &&
        domains.includes(post.data.domain) &&
        !post.data.over_18
    );

    // Select random post
    const post = posts[Math.floor(Math.random() * posts.length)].data;

    const title =
      post.title.length > 256 ? `${post.title.slice(0, 253)}...` : post.title;

    const flair = post.link_flair_text
      ? `\`${post.link_flair_text}\``
      : undefined;

    bot.createMessage(msg.channel.id, {
      embed: {
        title: title,
        description: flair,
        url: `https://reddit.com${post.permalink}`,
        image: { url: post.url },
        color: 0x1aff80, // Fallout 3 UI green
        footer: {
          text: `👍 ${post.ups} | 💬 ${post.num_comments} | ${
            post.subreddit_name_prefixed
          } | u/${post.author}`,
        },
      },
    });
  } catch (err) {
    logger.error('Meme error', err);
  }
};
