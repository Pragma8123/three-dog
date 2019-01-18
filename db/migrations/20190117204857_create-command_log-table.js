exports.up = async (knex, Promise) => {
  await knex.schema.createTable('command_log', table => {
    table.increments('id').primary();
    table
      .string('guild_id')
      .notNull()
      .references('guilds.id');
    table
      .string('user_id')
      .notNull()
      .references('users.id');
    table.string('command').notNull();
    table.timestamp('executed_at').defaultTo(knex.fn.now());
    table.text('error');
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists('command_log');
};
