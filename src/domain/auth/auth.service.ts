import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from 'src/common/exceptions/api.exceptions';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (!user) throw ApiException.unauthorized('Invalid credentials');

    return {
      user,
      token: this.generateToken(user),
    };
  }

  async register({ email, password }: LoginDto) {
    const candidate = await this.userService.findByEmail(email);
    if (candidate) throw ApiException.badRequest('User already exists');

    const user = this.userRepository.create({ email, password });
    await this.userRepository.save(user);

    return {
      user: await this.userService.findByEmail(email),
      token: this.generateToken(user),
    };
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, id: user.id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    });
  }

  private async validateUser(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findOneWithPassword(email);
    if (!user) throw ApiException.unauthorized('Invalid credentials');

    const passwordEquals = await user.validatePassword(password);
    if (!passwordEquals) throw ApiException.unauthorized('Invalid credentials');

    delete user.password;
    return user;
  }
}
