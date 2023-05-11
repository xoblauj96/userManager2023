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
    app.put('/admin/createUser',UserController.checkAdminAuthorizeToken, UserController.createUser)
})


app.listen(8881,'0.0.0.0',()=>{
    console.log("Server runing on port: 8881");
    
})