import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto,AuthDtoSignin } from "./dto";
import * as argon from 'argon2'


@Injectable()
export class AuthService{
    
   constructor(private prisma: PrismaService){}

    async signup(dto: AuthDto) {
        //generate the password hash
        
        //save the new user in the db
        try {
            const result = await this.prisma.users.findUnique({
                where: {
                    email:dto.email
                }
            })
            if (result) {
                return {
                    result: 'Email has been taken', success: false
                }
            }
            const hash = await argon.hash(dto.password);

             const user = await this.prisma.users.create({
            data: {
                email: dto.email,
                hash: hash,
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
            select: {
                email: true,
                firstName: true,
                lastName:true,
            }
        });


        // return the saved user
            return user;
        } catch (error) {
            return error;
        }
       

        // return {message:'You are signed up', success:true}
    }
    
    async signin(dto: AuthDtoSignin) {

        try {
            const result = await this.prisma.users.findUnique({
                where: {
                    email:dto.email
                }
            })
            console.log(result)

            if (!result) {
                return{message:"This email is not registered",succes:false}
            }
            if (result) {
                const pwMatches = await argon.verify(result.hash, dto.password)
                if (pwMatches) {
                    return {message:'You are signed in', success:true}
                } else {
                    return ({ message: 'Login failed',success:false });
                }
            }

        } catch (error) {
            console.log(error)
        }
        
    }
}