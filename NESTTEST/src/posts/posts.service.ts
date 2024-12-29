import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  // ????
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
}

//IoC Container가 인스턴스 (생성,제거,관리) 담당을 해준다.
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel) //Repository의 역할은 Entity에 대한 CRUD를 관리하는 것 (원하는 모델을 기반으로 데이터 베이스와 소통하는 것)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException();

    return post;

    // const post = postList.find(({ id: postId }) => postId === +id);
  }

  async createPost(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    // const post: PostModel = {
    //   id: postList[postList.length - 1].id + 1,
    //   author,
    //   title,
    //   content,
    //   likeCount: 0,
    // }; 이것도 되긴한다. 다만 1번 2번을 조합하는게 보편적인 방법이다.

    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
    });
    // 객체 바로 넣어도 되지만 이게 보편적
    // 자동으로 db 에서 id를 생성 해준다.

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save 기능 2가지 있음
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트 한다.

    const post = await this.postsRepository.findOne({ where: { id: postId } });

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

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }

  // primary key 같은경우 생성되는 순서대로 id가 1씩 올라간다.
  // 해당 id로 sort할때 유리하다.
}
