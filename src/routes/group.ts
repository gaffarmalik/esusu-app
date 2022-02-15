import { Router } from "express";
import { getGroups, createGroup, updateGroup, joinGroupByInvite, myGroupMembers, searchGroups, contributeToGroup } from "../controllers/group";
import { validateAuthToken } from "../utils/validateAuthToken";
import passport from "passport";

const router = Router();

router.get('/', getGroups);
router.post('/create', passport.authenticate('jwt',{session: false}), createGroup);
router.patch('/settings/:group_id', passport.authenticate('jwt',{session: false}), updateGroup);
router.put('/invite/:group_id', passport.authenticate('jwt',{session: false}), joinGroupByInvite);
router.get('/all', passport.authenticate('jwt',{session: false}), myGroupMembers);
router.get('/search/:keyword', searchGroups); //Doesn't require authentication
router.post('/contribute/:group_id', contributeToGroup); //


export {router};