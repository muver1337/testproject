    import {prisma} from '../utils/prisma';
    import {User as PrismaUser, Prisma} from '@prisma/client';

    export class User {
        id: string;
        name: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        email: string;
        password: string;
        role: 'user' | 'admin';
        status: 'active' | 'inactive';

        constructor(user: PrismaUser) {
            this.id = user.id;
            this.name = user.name;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.birthDate = user.birthDate;
            this.email = user.email;
            this.password = user.password;
            this.role = user.role;
            this.status = user.status;
        }

        static async findById(id: string): Promise<User | null> {
            const userData = await prisma.user.findUnique({where: {id}});
            return userData ? new User(userData as PrismaUser) : null;
        }

        static async findByEmail(email: string): Promise<User | null> {
            const userData = await prisma.user.findUnique({where: {email}});
            return userData ? new User(userData as PrismaUser) : null;
        }

        static async getAll(): Promise<User[]> {
            const usersData = await prisma.user.findMany();
            return usersData.map((user: PrismaUser) => new User(user));
        }

        static async create(data: Prisma.UserCreateInput): Promise<User> {
            const userData = await prisma.user.create({
                data: {
                    ...data,
                    status: 'active',
                },
            });
            return new User(userData as PrismaUser);
        }

        async updateStatus(status: 'active' | 'inactive'): Promise<this> {
            const updatedUser = await prisma.user.update({
                where: {id: this.id},
                data: {status},
            });
            this.status = updatedUser.status;
            return this;
        }
    }
