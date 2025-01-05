import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   firstName: string;

  //   @Column()
  //   lastName: string;

  @Column(() => Name)
  name: Name;

  @Column()
  salary: string;
}

// 중복 및 반복 해결 방안
// 1. entity embedding 으로 해결 중복된 프로퍼티 생성으로 해결
// 2. Inheritance OOP 방식.
