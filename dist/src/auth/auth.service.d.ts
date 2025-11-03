import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    Register(registerDto: RegisterDto): Promise<{
        token: string;
        user: {
            id: unknown;
            email: string;
            role: string;
        };
    }>;
    Login(loginDto: LoginDto): Promise<{
        token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
