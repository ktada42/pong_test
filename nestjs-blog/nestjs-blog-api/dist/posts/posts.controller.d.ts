import { PostsService } from "./posts.service";
import { PostType } from './post.interface';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): PostType[];
    create(post: PostType): void;
}
