import mongoose from 'mongoose';


interface UserI{
    _id?: () => string;
    email: string;
    name: string;
    password?: string;
    signJSONToken(): any,
    registerUser(): any,
    createUser(): any,
    findByEmail(): any
}

const userSchema = new mongoose.Schema({
    email:{type: String,required: true},
    name:{type: String,required: true},
    password:{ type: String,required: true, select:false},
    created_at : { type : Date, default: Date.now }
}, {timestamps:true})


userSchema.method('createUser', async function(){
    const user =  await User.create({
        email: this.email,
        password: this.password,
        name: this.name
    });
    return user;
});

userSchema.method('findByEmail', function(){
    return User.findOne({email: this.email}).lean();
});

const User = mongoose.model<UserI>('User', userSchema);



export {UserI,User};