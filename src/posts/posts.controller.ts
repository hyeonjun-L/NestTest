import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
}

const postList: Post[] = [
  { id: 1, author: '홍길동', title: '길동', content: '의적 활동하는 홍길동' },
  { id: 2, author: '홍동', title: '길동', content: '의적 활동하는 홍길동' },
  { id: 3, author: '동', title: '길동', content: '의적 활동하는 홍길동' },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Post[] {
    return postList;
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return postList.find(({ id: postId }) => postId === +id);
  }
}
