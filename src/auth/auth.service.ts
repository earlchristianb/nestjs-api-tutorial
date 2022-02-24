import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";



@Injectable()
export class AuthService{
   
    signup() {
        return {message:'You are signed up', success:true}
    }
    
    signin() {
        return {message:'You are signed in', success:true}
    }
}