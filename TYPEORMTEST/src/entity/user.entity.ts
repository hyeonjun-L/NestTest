import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // 자동으로 ID를 생성한다.
  // @PrimaryGeneratedColumn()
  // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
  // 테이블 안에서 각각의 Row를 구분 할 수 있는 칼럼이다.
  // @PrimaryColumn() 직접 넣겠다.
  // @PrimaryGeneratedColumn('uuid')
  // PrimaryGeneratedColumn -> 순서대로 위로 올라감
  // uuid로 생성되게 가능하다.
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   // 데이터베이스에서 인지하는 칼럼 타입 (타입 변경하면 기존 값 변경 됨?)
  //   // 자동으로 유추됨
  //   type: 'varchar',
  //   // 데이터베이스 칼럼 이름
  //   name: 'title',
  //   // 값의 길이
  //   // 입력 할 수 있는 글자의 길이가 300
  //   length: 300,
  //   // null이 가능한지
  //   nullable: true,
  //   // true면 처음 저장할때만 값 지정 가능
  //   // 이후엔 값 변경 불가능
  //   update: true,
  //   // find()를 실행할때 기본으로 값을 불러올지 false면 그냥 find() 만으로는 안불러짐
  //   // 기본값이 true
  //   select: false,
  //   // 기본 값
  //   // 아무것도 입력 안했을때 기본으로 입력되게 되는 값
  //   default: 'default value',
  //   // 칼럼중에서 유일무이한 값이 돼야하는지 (회원 가입 이메일)
  //   unique: false,
  // })
  // title: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // CreateDateColumn 데이터가 생성되는 날짜와 시간이 자동으로 찍힘
  @CreateDateColumn()
  createAt: Date;

  // UpdateDateColumn 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힘
  @UpdateDateColumn()
  updateAt: Date;

  //   데이터가 업데이트 될때마다 1씩 올라간다.
  //  처음 값은 1
  // save 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  //   데이터를 생성할 때 마다 1씩 올라가는
  //   @Column()
  //   @Generated('increment')
  //   additionalId: number;

  // 매번 생성 될대마다 additionalId에 uuid를 넣어 줄 수 있다.
  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할때마다 항상 같이 가져올 relation
    // 굳이 query 에서 relation으로 가져오라고 안해도 가져오게 된다.
    eager: false,
    // save() 저장할때 relation을 한번에 같이 저장 가능하다.
    cascade: true,
    // null이 가능한지
    nullable: true,
    // 관계가 삭제 했을때
    // no action => 아무것도 안함
    // casecade => 참조하는Row도 같이 삭제 (부모에서 자식으로 삭제 됨)
    // set null => 참조하는 Row에서 참조 id를 null로 변경
    // set default => 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict => 참조하고 있는 Row가 있는 경우 참조당하는 Row 삭제 불가
    onDelete: 'CASCADE',
  })
  @JoinColumn() // 조인을 어디서 하냐에 따라서 다른 테이블을 레퍼런스하는 칼럼이 생기는 곳을 정할 수 있다. (하위 개념으로 생각하면 편할 듯?)
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
