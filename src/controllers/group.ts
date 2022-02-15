import { Request, Router, Response } from "express";
import { Contribution, ContributionI } from "../models/contribution";
import { Group } from "../models/group";
import mongoose from 'mongoose';
const getGroups = (req: Request, res: Response) => {
    return res.json({ "name": "dfnudhfd" });
}


const updateGroup = async (req: Request | any, res: Response) => {
    const group_id = req.params.group_id;
    const user_id = req.user._id;
    //Items that can be updated during the tenure;
    try {
        const { name, description, visibility } = req.body

        const updatedGroup = await Group.findOneAndUpdate({ admin: user_id, group_id }, { name, description, visibility });
        if (updatedGroup)
            return res.json({ "message": 'Group Updated Successfully', group_id });
        else
            return res.json({ "message": 'Unable to update Group at the moment', group_id });

    } catch (error) {
        return res.json({ user: req.user, error: error });
    }
}

const createGroup = async (req: any, res: Response) => {

    try {
        const { name, description, members, visibility, maxCapacity, fixed_amount, random_table } = req.body
        const group = new Group({
            name,
            description, visibility, members,
            maxCapacity,
            fixed_amount,
            admin_id: req.user._id
        });
        await group.save();
        return res.json({ "message": 'Group Created Successfully', user: req.user });

    } catch (error) {
        return res.json({ user: req.user, error: error });
    }


}


const joinGroupByInvite = async (req:any,res:Response) =>{
const group_id = req.params.group_id;
const user_id = req.user._id;
try {
    const groupLimit:any = await Group.findById(group_id);
    // console.log(groupLimit);
    if(groupLimit?.members.length < groupLimit?.maxCapacity){
        const pushToGroup = await Group.findByIdAndUpdate(group_id, {$addToSet: {members: user_id}});
        if(pushToGroup)
            return res.json({success:'Group Updated Successfully'});
        else
            return res.json({ error: 'All slots are filled up at moment' });

    }
    return res.json({ error: 'All slots are filled up at moment' });

     
} catch (error) {
    return res.json({ user: req.user, error: error });

}

}

const myGroupMembers = async (req:any,res:Response) =>{

    const admin_id = req.user._id;
    try {
        const myGroups = await Group.find({admin_id}).populate('members', '-password');
        if(myGroups)  return res.json({success:'Group Members', groups:myGroups })
         
    } catch (error) {
        return res.json({ user: req.user, error: error });
    
    }
    
}

const contributeToGroup = async(req:any, res:Response) =>{
//After Payment has been finalized on a service provider. This may serve the purpose of a API webhook;
const {amount, contributor_id } = req.body;
try {
    const contribute = await Contribution.create({
        amount: amount,
        contributor_id,
        group_id: req.params.group_id,
    });

    executePaymentTransaction(req, contribute)
    return res.json({success:'Payment Successful'});


} catch (error) {
    return res.json({ user: req.user, error: error });

}


}


const executePaymentTransaction = async (req:any, contribute:ContributionI) =>{
    await mongoose.startSession();
    mongoose.connection.transaction(async function executor(session) {
      try {
        // in isolation with atomicity
        const addToGroup = await Group.findOneAndUpdate({_id: req.params.group_id},{$addToSet:{contributions: contribute}} );
    } catch (err) {
          throw err;
      }
     });
}



const searchGroups = async (req:any,res:Response) =>{
    const {keyword} = req.params;
    try {
        const search = await Group.find({$text: {$search:keyword}},{ name: 1, description: 1 })
        return res.json({result: search});
    } catch (error) {
        return res.json({ user: req.user, error: error });

    }
   
 
}


export { getGroups, createGroup, updateGroup, joinGroupByInvite, myGroupMembers, searchGroups, contributeToGroup };