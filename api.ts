import {  Application,Request, Response, NextFunction} from "express";
import  cors from 'cors';
import bodyParser from "body-parser";
import express from 'express'
import { dbconnection } from "./entities";
import { UserController } from "./controllers/user.controller";


let app:Application = express();
app.use(cors());
app.use(bodyParser.json());

dbconnection.authenticate().then(r=>{
    console.log("connect to database success");
    app.post('/login',UserController.login)
    app.put('/admin/createUser',UserController.checkAdminAuthorizeToken, UserController.createUser);
    app.get('/getUsers',UserController.checkAuthorize,UserController.getUserList);
    app.get('/getUserDetail/:id',UserController.checkAuthorize,UserController.checkIsYourSelf,UserController.getUserDetail);
    app.delete('/deleteUser',UserController.checkAuthorize,UserController.deleteUser)
})


app.listen(8881,'0.0.0.0',()=>{
    console.log("Server runing on port: 8881");
    
})