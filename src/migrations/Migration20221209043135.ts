import { Migration } from '@mikro-orm/migrations';

export class Migration20221209043135 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` text not null, `email` text not null, `username` text not null, `discriminator` text not null, `access_token` text not null, `refresh_token` text not null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`id`));',
    );
  }
}
