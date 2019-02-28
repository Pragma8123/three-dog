const r = require('rethinkdbdash')();
const tables = ['guilds', 'users', 'stats'];

(async () => {
  await Promise.all([
    tables.map(t =>
      r
        .tableCreate(t)
        .run()
        .catch(err => console.log(`Error creating table ${t}: ${err}`))
    ),
  ]);
  await sleep(1000 * 10);
  console.log('Tables created!');
  r.getPoolMaster().drain();
})();

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
