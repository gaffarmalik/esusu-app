
import passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import { User, UserI } from '../models/user';
import jwt from 'jsonwebtoken';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}


const validateAuthToken = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err:any, user: UserI) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

const signAuthToken = (user:UserI|any) =>{
   
  const token = jwt.sign({
        iss: user.name,
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      }, 'secret' );

      return{...user,token };
};


export {validateAuthToken, signAuthToken};