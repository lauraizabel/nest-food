import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserRole } from './users-role';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(
    createUserDTO: CreateUserDTO,
    role: UserRole,
  ): Promise<Users> {
    const { email, name, password, username } = createUserDTO;
    const user = this.create();

    user.email = email;
    user.username = username;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso.');
      } else {
        throw new InternalServerErrorException('Erro ao salvar o usuário.');
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
