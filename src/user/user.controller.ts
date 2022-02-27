import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController{
constructor(private userService: UserService){}
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        const id = req.user;
        return this.userService.getMyDetails(id);
        
    }

    @UseGuards(JwtGuard)
    @Post('me')
    getCredentials(@Req() req: Request){
            return this.userService.getCredentials(req.body.email)
    }
}