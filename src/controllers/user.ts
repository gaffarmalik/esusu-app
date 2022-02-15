import { Request, Router, Response } from "express";
import { Group } from "../models/group";
import { User } from "../models/user";
import { signAuthToken } from "../utils/validateAuthToken";
const router = Router();


const getUsers = async (req: Request, res: Response)=>{
    const user = new User();
    const users = await User.find();

    return res.json({"users": users});
}


const loginUser = async (req: Request, res: Response)=>{
    const user = new User();
    const users = await User.find();

    return res.json({"users": users});
}


const registerUser = async (req: Request, res: Response)=>{
    try {
        const { email,password,name } = req.body;
        // req.
        console.log(email, password, name);
    
        if(email && password && name){
            const user = new User({email, password, name});
            if(!(await user.findByEmail())){
                const created = await user.createUser();
                console.log(user);
                return res.json({"user": signAuthToken(user), 'userrr': user });
            }
        }
        return res.json({"message":'This email is already registered'});
    
    } catch (error) {
        return res.json({"message":'Error'});

    }

}

export {getUsers, loginUser, registerUser};