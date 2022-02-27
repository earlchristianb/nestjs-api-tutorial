
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'justfordevelopment'
        })
    }

    async validate(payload: {
        sub: string;
        email: string;
    }) {
       
    
        console.log(payload.sub)
        
        return payload.sub;

    }
}