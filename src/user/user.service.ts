import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      const { password: pass, ...usuarioSinPassword } = user;
      return {
        ...usuarioSinPassword
      }
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return ([]);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id })
      if (!user) return new NotFoundException(`User with ${id} not found`)
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      Object.assign(user, updateUserDto);

      const actualizado = await this.userRepository.save(user);
      const { password, ...usuarioSinPassword } = actualizado;
      return usuarioSinPassword;
    } catch (error) {
      this.handleErrors(error);
    }

  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id })
      if (!user) return new NotFoundException(`User with ${id} not found`)
      await this.userRepository.remove( user );
    } catch (error) {
      this.handleErrors(error)
    }
  }

  handleErrors(error: any): any {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Check server logs')
  }
}
