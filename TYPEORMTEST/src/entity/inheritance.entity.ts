// 1. 상속을 받으면 상속받은 클래스들이 각각 개별의 테이블을 생성하는 inheritance
// 2. 싱글테이블 inheritance / 실제 테이블이 생기는 형태는 하나로 관리 된다.
// 차이는 테이블이 어떻게 구성 / 형성이 되냐의 차이 / 사용하는 부분은 같다.

import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

// 하나의 테이블로 생기게 된다.
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModle extends SingleBaseModel {
  @Column()
  country: string;
}
