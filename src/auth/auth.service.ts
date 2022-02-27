import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto,AuthDtoSignin } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{
    
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }


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
        });


        // return the saved user in a form of jwt token
            const signed = await this.signToken(user.id, user.email)
            return { message: 'You are signed in',token:signed, success: true }
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
                    const signed = await this.signToken(result.id, result.email)
                   return { message: 'You are signed in',token:signed, success: true }
                } else {
                    return ({ message: 'Login failed',success:false });
                }
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    async signToken(userId: string, email:string) :Promise<string> {
        const payload = {
            sub: userId,
            email
        }
        return this.jwt.signAsync(payload, {
            expiresIn:'60m',
            secret:'justfordevelopment'
        });

    }
}