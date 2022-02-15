import mongoose, { Schema } from 'mongoose';
import { User } from './user';


interface GroupI{
    id?: () => string;
    visibility:  boolean;
    admin_id: string;
    _id?:string,
    members: any,
    name: string,
    description: String,
    maxCapacity: number, 
    fixed_amount: number,
    random_table: Array<any>,
    total_balance: number
}


const groupSchema = new mongoose.Schema({
    admin_id:{type: String,required: true},
    name:{type:String, required: true, index:true},
    description:{type:String, required: true, index: true},
    visibility:{type: Boolean,required: true, default: false},
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    contributions: [{ type: Schema.Types.ObjectId, ref: 'Contribution' }],
    maxCapacity: {type: Number, default: 2},
    fixed_amount:{type:Number, required: true},
    random_table: {type: Schema.Types.Array},
    total_balance: {type: Number, default:0}

}, {
    timestamps:true
})



groupSchema.method('createGroup', async function(){
    return await Group.create({
        admin_id: this.admin_id,
        name: this.name,
        description: this.description,
        // members:
     });
});

//For Search Purposes
groupSchema.index({ name: 'text', description: 'text' });

const Group = mongoose.model<GroupI>('Group', groupSchema);



export {GroupI,Group};