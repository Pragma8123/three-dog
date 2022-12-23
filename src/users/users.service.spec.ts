import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: UsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(getRepositoryToken(User));

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

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = new CreateUserDto(
        user.id,
        user.email,
        user.username,
        user.discriminator,
        user.accessToken,
        user.refreshToken,
      );

      jest.spyOn(usersRepository, 'create').mockReturnValue(user);
      jest
        .spyOn(usersRepository, 'persistAndFlush')
        .mockImplementation(() => Promise.resolve());

      expect(await service.create(createUserDto)).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(user.id)).toEqual(user);
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      expect(await service.findOne(user.id)).toBeNull();
    });
  });
});
