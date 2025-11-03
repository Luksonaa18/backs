import { Model } from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
