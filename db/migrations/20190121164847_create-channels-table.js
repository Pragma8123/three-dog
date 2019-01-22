exports.up = async (knex, Promise) => {
  await knex.schema.createTable('channels', table => {
    table
      .string('id')
      .unique()
      .primary();
    table
      .string('guild_id')
      .notNull()
      .references('guilds.id');
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists('channels');
};
