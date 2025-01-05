import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // // 모델에 해당되는 객체 생성 - 저장은 안한다. 생성만
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });

    // // new UserModel({
    // //   email: 'test@codefactory.ai',
    // // }); 이거와 같다.

    // 생성도 하고 저장도 한다.
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음 (find 함수와 create가 섞인 느낌)
    // const user3 = await this.userRepository.preload({
    //   id: 100,
    //   email: 'code@codefactory.ai',
    // });

    // 삭제하기
    // await this.userRepository.delete(101);

    // 값을 증가시킴
    // await this.userRepository.increment(
    //   {
    //     id: 3,
    //   },
    //   'count',
    //   20,
    // );

    // 값을 감소시킴
    // await this.userRepository.decrement({ id: 1 }, 'count', 1);

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // email에 0이 들어가는 count의 값을 다 더하게 된다.
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {});

    // 최댓값
    // const max = await this.userRepository.maximum('count', { id: LessThan(4) });

    // find 하기에 설명
    // const users = await this.userRepository.find({});

    // 하나만 찾는다.
    // 여러개의 값을 찾게 된다면 첫번째 값만 가져오게 된다.
    // const userOne = await this.userRepository.findOne({
    //   order: {
    //     id: 'ASC',
    //   },
    //   where: {
    //     email: Not(IsNull()),
    //   },
    //   // where: {
    //   //   id: 3,
    //   // },
    // });

    // 페이지네이션 때 사용을 하게 되는데
    // 값을 찾고 몇개의 값이 존재하는지 필터하는 것
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    // const user = this.userRepository.create({
    //   // title: 'test title',
    //   email: 'asdasd@asdasd.com',
    //   role: Role.ADMIN,
    // });

    // await this.userRepository.save(user);

    // return user;
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Get('users')
  getHello() {
    return this.userRepository.find({
      // TypeORM 유틸리티
      where: {
        // 아닌경우 가져오기
        // id: Not(1),
        // 값보다 미만
        // id: LessThan(30),
        // 값보다 이하
        // id: LessThanOrEqual(30),
        // 값보다 초과
        // id: MoreThan(30),
        // 값보다 이상
        // id: MoreThanOrEqual(30),
        // 같은경우
        // id: Equal(30),
        // 유사값
        // %를 붙이면 상관 없다는 것 => %google% 앞뒤로 아무거나 와도 상관 없음
        // %0%
        // email: Like('%0%'),
        // 대문자 소문자 구분 안하는 유사값
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 9]),
        // null인 경우 가져오기
        // id: IsNull(),
      },

      // // FindManyOptions
      // // 어떤 프로퍼티를 선택할지
      // // 기본은 모든 프로퍼티를 가져온다.
      // // 만약에 select를 정의하지 않으면
      // // select를 정의하면 정의된 프로퍼티만 가져온다.
      // select: {
      //   id: true,
      //   version: true,
      // },
      // // 필터링할 조건을 입력하게 된다. And 조건으로 묶이게 된다.
      // where: {
      //   profile: Not(IsNull()),
      // },
      // // or 조건으로 가져오고 싶다면? 하기 처럼
      // // where: [{ id: 3 }, { version: 1 }],
      // // 관계를 가져오는 법
      // // relations을 가져오면 select, where 등에서도 쿼리 사용 가능하다.
      // relations: {
      //   profile: true,
      // },
      // // 오름차 (ASC) 내림차 (DESC)
      order: {
        // profile: {
        //   id: 'ASC',
        // },
        id: 'ASC',
      },
      // // 처음 몇개를 제외할지
      // skip: 0,
      // // 몇개를 가져올지 (기본 값은 테이블 전체의 길이),
      // take: 1,
    });
  }

  @Patch('users/:id')
  async pstchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    await this.userRepository.save({ ...user, email: user.email + '0' });

    return user;
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdasd@asdasd.com',
      profile: {
        profileImg: 'cascade.png',
      }, // cascade true 값으로 가능하다.
    });

    // const profile = await this.profileRepository.save({
    //   user,
    //   profileImg: 'asda.png',
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'adasdasd',
    });

    const post = await this.postRepository.save({
      author: user,
      title: 'sdasdad',
    });

    const post2 = await this.postRepository.save({
      author: user,
      title: 'sdasdad',
    });

    return [post, post2];
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });
    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
