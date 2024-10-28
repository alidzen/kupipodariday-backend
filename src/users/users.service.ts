import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findOne(query: FindOptionsWhere<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: query });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOwn(userId: number): Promise<User> {
    return this.findOne({ id: userId });
  }

  async updateOne(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(userId, updateUserDto);
    return this.findOne({ id: userId });
  }

  // TODO:
  // fix that this does not return user wishes
  // continue to test other routes
  // check that only owner can update his own wishes
  async getWishesByUserId(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { wishes: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.wishes;
  }

  async getWishesByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['wishes'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user.wishes;
  }

  async findMany(query: string): Promise<User[]> {
    return await this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }
}
