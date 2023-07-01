import { PostType } from './post.interface';
export declare class PostsService {
    private readonly posts;
    findAll(): PostType[];
    create(post: PostType): void;
}
