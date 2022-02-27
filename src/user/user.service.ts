import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { json } from "stream/consumers";

@Injectable()
export class UserService{
constructor(private prisma:PrismaService){}
   
    async getMyDetails(id:Express.User) {
         const user = await this.prisma.users.findFirst({
            where: {
            id:id
             }, select: {
                 id:true,email:true,firstName:true,lastName:true
             },
         },
        
         )
        return user
    }
    
   async getCredentials(email:string):Promise<Object>{
        const user : Object = await this.prisma.users.findFirst({
            where: {
            email:email
            }, select: {
                id: true,
                email:true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
                hash:false
            }
        })
       console.log(email)
       return user;
       
    }
    
}