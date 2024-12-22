import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  // ????
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
}

let postList: PostModel[] = [
  {
    id: 1,
    author: '홍길동',
    title: '길동',
    content: '의적 활동하는 홍길동',
    likeCount: 111,
  },
  {
    id: 2,
    author: '홍동',
    title: '길동',
    content: '의적 활동하는 홍길동',
    likeCount: 111,
  },
  {
    id: 3,
    author: '동',
    title: '길동',
    content: '의적 활동하는 홍길동',
    likeCount: 111,
  },
];

//IoC Container가 인스턴스 (생성,제거,관리) 담당을 해준다.
@Injectable()
export class PostsService {
  getAllPosts() {
    return postList;
  }

  getPostById(id: number) {
    const post = postList.find(({ id: postId }) => postId === +id);

    if (!post) throw new NotFoundException();

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: postList[postList.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
    };

    postList.push(post);
    // postList = [...postList, post];

    return post;
  }

  updatePost(id: number, author: string, title: string, content: string) {
    const post = postList.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    postList = postList.map((prevPost) =>
      prevPost.id === id ? post : prevPost,
    );

    return post;
  }

  deletePost(id: number) {
    const post = postList.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    postList = postList.filter((post) => post.id !== +id);

    return id;
  }
}
