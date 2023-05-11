import { NextFunction, Request, Response } from "express";
import { APIService } from "../services/api.service";
import { UserModel } from "../entities/user.entity";
import { dbconnection, userEntity } from "../entities";

export class UserController {
    constructor() { }

    static checkAdminAuthorizeToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['super-admin-authorization'] + '';
        if (APIService.validateSuperAdmin(token)) return next();
        res.status(402).send('You have no an authorization...!');
    }

    static async createUser(req: Request, res: Response) {
        try {
            const user = req.body as UserModel;
            delete user.id;

            dbconnection.transaction().then(transaction => {
                userEntity.findOne({ where: { userName: user.userName, phoneNumber: user.phoneNumber }, transaction }).then(async r => {
                    console.log(r);
                    
                    if (r) {
                        await transaction.rollback();
                        res.send(APIService.errRes('User exist'));
                    } else {
                        userEntity.create(user).then(r => {
                            res.send(APIService.okRes(r, 'create Ok'));
                        }).catch(e => {
                            res.send(APIService.errRes(e))
                        })
                    }
                })
            })

        } catch (error) {

        }
    }
}