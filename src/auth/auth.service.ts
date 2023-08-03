import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string) {
    const userRecord = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .select('user')
      .addSelect('user.password')
      .getOne();

    if (!userRecord) {
      throw new NotFoundException({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException({ message: 'Wrong password' });
    }

    const payload = { sub: userRecord.id, login: userRecord.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
