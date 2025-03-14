import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

type TUser = {
    name: string
    email: string
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}

@Controller('users')
export class UsersController {
    // Injecting services to the controller
    constructor(private readonly usersServices: UsersService) {} // The same as const usersService = new UserService()

    // Plan the routes that we want to handle

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersServices.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersServices.findOne(+id)
    }

    @Post() // POST /users
    create(@Body() user: TUser) {
        return this.usersServices.create(user)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: TUser) {
        return this.usersServices.update(+id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersServices.delete(+id)
    }
}
