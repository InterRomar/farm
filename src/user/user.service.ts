import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const createUserObject = new CreateUserDto();

    Object.keys(createUserDto).forEach((key: string) => {
      createUserObject[key] = createUserDto[key] || null;
    });

    createUserObject.password = hashPassword;

    const validatorErrors = await validate(createUserObject);

    if (validatorErrors.length > 0) {
      throw new BadRequestException();
    }

    const newUserRecord = await this.userRepository.save(createUserObject);

    const userWithouPassword = plainToClass(User, newUserRecord);
    return userWithouPassword;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }

  findOneByLogin(login: string): Promise<User> {
    return this.userRepository.findOneBy({ login });
  }

  // TODO
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
