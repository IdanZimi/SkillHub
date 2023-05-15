import { User } from '../../models/user.model'
import { sequelize } from "../database";


export class UserService {
    async createUser(name: string, email: string, password: string): Promise<User> {
        try {
            this.checkConnection()
            const user = await User.create({
                name,
                email,
                password,
            });
            
            return user;

        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            this.checkConnection()
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUserById(id: number, name: string, email: string, password: string): Promise<[number, User[]]> {
        try {
            this.checkConnection()
            const [updatedRowsCount, updatedUsers] = await User.update({
                name,
                email,
                password,
            }, {
                where: {
                    id,
                },
                returning: true,
            });

            return [updatedRowsCount, updatedUsers];
        } catch (error) {
            throw error;
        }
    }

    async deleteUserById(id: number): Promise<number> {
        try {
            this.checkConnection();
            const deletedRowsCount = await User.destroy({
                where: {
                    id,
                },
            });

            return deletedRowsCount;

        } catch (error) {
            throw error;
        }
    }

     async getAllUsers(): Promise<User[]> {
        try {
            this.checkConnection()
            const users = await User.findAll() 
            return users
        } catch (error) {
            throw error;
        }
    }

    async checkConnection() {
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            throw error;
        }
    }
}
