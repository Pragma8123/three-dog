require('dotenv').config();
const axios = require('axios');
const logger = require('../logger');

const subs = ['FalloutMemes', 'FalloutHumor', 'NewVegasMemes'];
const domains = ['i.redd.it', 'i.imgur.com'];
const cooldownTime = 2500; // 2.5 seconds
const cooldowns = new Set();

// Cache subreddits
const subCache = new Map();
const fetchSubs = () => {
  for (let i = 0; i < subs.length; i += 1) {
    const s = subs[i];
    axios
      .get(`https://reddit.com/r/${s}.json`, {
        params: {
          sort: 'hot',
          limit: 50,
        },
      })
      .then((res) => subCache.set(s, res.data))
      .catch((err) => logger.error(null, err));
  }
};
fetchSubs(); // Initial fetch
setInterval(fetchSubs, 1000 * 60 * 5); // Every 5 min

function hasCD(userId) {
  return cooldowns.has(userId);
}

function addCD(userId) {
  if (hasCD(userId)) return;
  cooldowns.add(userId);
  setTimeout(() => cooldowns.delete(userId), cooldownTime);
}

module.exports = async (ctx, msg) => {
  const { bot } = ctx;
  // Check if user has cooldown
  if (hasCD(msg.author.id)) {
    await bot.createMessage(
      msg.channel.id,
      `${msg.author.mention} You must wait ${cooldownTime
        / 1000} seconds before using this command again.`,
    );

    return;
  }
  addCD(msg.author.id);

  const sub = subs[Math.floor(Math.random() * subs.length)];
  const { data } = subCache.get(sub);

  // We only want SFW image posts
  const posts = data.children.filter(
    (post) => !post.data.is_video
      && domains.includes(post.data.domain)
      && !post.data.over_18
      && post.data.score >= 50,
  );

  // Select random post
  const post = posts[Math.floor(Math.random() * posts.length)].data;

  const title = post.title.length > 256 ? `${post.title.slice(0, 253)}...` : post.title;

  const flair = post.link_flair_text
    ? `\`${post.link_flair_text}\``
    : undefined;

  await bot.createMessage(msg.channel.id, {
    embed: {
      title,
      description: flair,
      url: `https://reddit.com${post.permalink}`,
      image: { url: post.url },
      color: 0x1aff80, // Fallout 3 UI green
      footer: {
        text: `👍 ${post.ups} | 💬 ${post.num_comments} | ${post.subreddit_name_prefixed} | u/${post.author}`,
      },
    },
  });
};
