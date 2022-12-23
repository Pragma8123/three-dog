import { Migration } from '@mikro-orm/migrations';

export class Migration20221223174911 extends Migration {
  async up(): Promise<void> {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql(
      'CREATE TABLE `_knex_temp_alter670` (`id` text NOT NULL, `email` text, `username` text NOT NULL, `discriminator` text, `access_token` text, `refresh_token` text, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, PRIMARY KEY (`id`));',
    );
    this.addSql('INSERT INTO "_knex_temp_alter670" SELECT * FROM "user";;');
    this.addSql('DROP TABLE "user";');
    this.addSql('ALTER TABLE "_knex_temp_alter670" RENAME TO "user";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }
}
