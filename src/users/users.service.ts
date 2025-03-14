import { Injectable } from '@nestjs/common';

type TUser = {
    name: string
    email: string
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Igor Colombini",
            "email": "mail@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Maria Padilha",
            "email": "mail@example.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Gabriel Nunes",
            "email": "mail@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Pedro Henrique",
            "email": "mail@example.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Luan Bruno",
            "email": "mail@example.com",
            "role": "ENGINEER"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    create(user: TUser) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: TUser) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser}
            }
            return user
        })
        return this.findOne(id) // return the updated user
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return  removedUser
    }
}
