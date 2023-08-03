import UserRole from '../enums/UserRole';

export class CreateUserDto {
  login: string;
  name?: string;
  password?: string;
  role: UserRole;
}
