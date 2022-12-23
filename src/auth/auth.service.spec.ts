import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            createIfNotExists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    user = new User();
    user.id = '123';
    user.email = 'wumpus@gmail.com';
    user.username = 'wumpus';
    user.discriminator = '1234';
    user.accessToken = 'abc';
    user.refreshToken = 'def';
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user from usersService', async () => {
      jest.spyOn(usersService, 'createIfNotExists').mockResolvedValue(user);

      expect(
        await service.validateUser(user.accessToken, user.refreshToken, user),
      ).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return a valid JWT', async () => {
      const result = await service.login(user);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      );
    });
  });
});
