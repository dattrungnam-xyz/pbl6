import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entity/question.entity';
import { Part } from '../../part/entity/part.entity';
import { Test } from '../../test/entity/test.entity';

@Entity()
export class GroupQuestion {
  constructor(partial?: Partial<GroupQuestion>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // maybe this field to convert image to text question
  @Expose()
  @Column()
  detail: string;

  @Expose()
  @Column({nullable: true})
  describeAnswer: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => Question, (question) => question.group)
  listQuestion: Promise<Question[]>;

  @Expose()
  @ManyToOne(() => Part, (part) => part.listGroupQuestion)
  part: Promise<Part>;

  @Expose()
  @ManyToOne(() => Test, (test) => test.groupQuestion)
  test: Promise<Test>;
}