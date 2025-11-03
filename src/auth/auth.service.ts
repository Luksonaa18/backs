import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async Register(registerDto: RegisterDto) {
    const { name, email, password, role } = registerDto;
    const existing = await this.userModel.findOne({ email });
    if (existing)
      throw new BadRequestException('User with this email Already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashed,
      role,
    });
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return {
      token,
      user: { id: user._id, email: user.email, role: user.role },
    };
  }
  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
