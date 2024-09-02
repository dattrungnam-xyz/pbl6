import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Test } from '../../test/entity/test.entity';


export enum EngLishTestType {
  TOEIC = 'toeic',
  IELTS = 'ielts',
}

@Entity()
export class EngLishTest {
  constructor(partial?: Partial<EngLishTest>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: EngLishTestType,
    default: EngLishTestType.TOEIC,
  })
  type: EngLishTestType;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => Test, (test) => test.typeTest)
  listTest: Promise<Test[]>;
}
