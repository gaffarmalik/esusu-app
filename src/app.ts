import express from 'express';
import {json, urlencoded} from 'body-parser';
import { router as userRouter } from './routes/user';
import { router as groupRouter } from './routes/group';


const app = express();
app.use(json());
app.use(urlencoded({extended:false}));

app.use('/api/user', userRouter );
app.use('/api/group', groupRouter );



export default app;