import mongoose, { Schema } from 'mongoose';
import { Group } from './group';
import { User } from './user';


interface ContributionI{
    id?: () => string;
    visibility:  boolean;
    admin_id: string;
    _id?:string,
    members: any
}


const contributionSchema = new mongoose.Schema({
    amount: {type: String,required: true},
    contributor_id: {type: Schema.Types.ObjectId, ref: 'User' },
    group_id: { type: Schema.Types.ObjectId, ref: 'Group' },
}, {timestamps:true})



// groupSchema.method('findByEmail', function(){
//     return Contribution.findOne({email: this.email}).lean();
// });

const Contribution = mongoose.model<ContributionI>('Contribution', contributionSchema);



export {ContributionI,Contribution};