import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel], //데이터 베이스와 연동될 모델들
      synchronize: true, //nest.js typeorm code 와 database sync를 자동으로 맞출 것이냐
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
