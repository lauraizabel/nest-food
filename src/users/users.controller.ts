import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/admin')
  async createAdminUser(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDTO);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
}
