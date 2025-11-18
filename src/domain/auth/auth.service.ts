import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
  async register({ email, password }: LoginDto) {
    const user = this.userRepository.create({ email, password });

    return await this.userRepository.save(user);
  }
}
