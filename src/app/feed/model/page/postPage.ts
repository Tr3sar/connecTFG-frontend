import { Pageable } from "src/app/feed/model/page/pageable";
import { Post } from "../post.model";


export class PostPage {
    content: Post[];
    pageable: Pageable;
    totalElements: number;
}