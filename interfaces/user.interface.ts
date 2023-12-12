export enum UserRoles {
    admin = 'admin',
    noRole = 'noRole'
  }
  
  export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRoles;
    password?: string;
    createdAt: string;
  }