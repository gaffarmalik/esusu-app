
const dotenv = require('dotenv');

import mongoose from 'mongoose';
import app from './src/app';

const DB_URL = 'mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@cluster0.jn76i.mongodb.net/mollo_app?retryWrites=true&w=majority'
try {
    mongoose.connect(DB_URL,
    ()=>{ 
        app.listen(3000, ()=> console.log('server and DB is running on port 3000')) 
    })

} catch (error) {
    console.log('error',error)
}
