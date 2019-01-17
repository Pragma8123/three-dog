exports.up = async (knex, Promise) => {
  await knex.schema.createTable('guilds', table => {
    table
      .string('id')
      .unique()
      .primary();
    table.text('name');
    table.integer('member_count').unsigned();
    table.string('region');
    table.integer('created_at').unsigned();
    table.integer('joined_at').unsigned();
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists('guilds');
};
