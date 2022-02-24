import { Injectable } from "@nestjs/common";

@Injectable()
export class PostService{

    getPost() {
        return 'all post'
    }
}