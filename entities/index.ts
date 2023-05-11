import { Sequelize } from "sequelize";
import { UserFactory } from "./user.entity";

export const dbconnection = new Sequelize('test2','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export enum EntityPrifix {
    Users='tbUser'
}

export const userEntity = UserFactory(EntityPrifix.Users,dbconnection);
userEntity.sync();