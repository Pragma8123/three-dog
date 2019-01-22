exports.up = async (knex, Promise) => {
  await knex.schema.table('command_log', table => {
    table.string('channel_id').references('channels.id');
  });
};

exports.down = async (knex, Promise) => {
  await knex.schema.table('command_log', table => {
    table.dropColumn('channel_id');
  });
};
