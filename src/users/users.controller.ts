import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
    model: { type: User },
    query: {
        maxLimit: 5,
    },
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public readonly service: UsersService) {}
}
