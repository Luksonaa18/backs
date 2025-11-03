import { UserService } from './user.service';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    getProfile(req: any): Promise<import("../auth/schema/auth.schema").User>;
}
