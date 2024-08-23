import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt } from "../utils/bcrypt.handle";


export const createAdminUser = async () => {
    try {
        const existingAdmin = await UserModel.findOne({ isAdmin: true });
        if (existingAdmin) {
            console.log('Usuario administrador ya existe');
            return;
        }
        
        const hashedPassword = await encrypt('123123');

        const newAdmin = new UserModel<User>({
            displayName: 'admin',
            email: 'admin@admin.com',
            password: hashedPassword,
            isAdmin: true
        });

        await newAdmin.save();
        console.log('Usuario administrador creado con éxito');
    } catch (error) {
        console.error('Error al crear usuario administrador');
    }
}