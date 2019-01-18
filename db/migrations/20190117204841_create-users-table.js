exports.up = async (knex, Promise) => {
  await knex.schema.createTable('users', table => {
    table
      .string('id')
      .unique()
      .primary();
    table
      .string('guild_id')
      .notNull()
      .references('guilds.id');
    table.text('username').notNull();
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists('users');
};
