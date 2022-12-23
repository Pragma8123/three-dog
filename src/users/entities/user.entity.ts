import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @Property()
  email?: string;

  @Property()
  username?: string;

  @Property()
  discriminator?: string;

  @Property()
  accessToken?: string;

  @Property()
  refreshToken?: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
