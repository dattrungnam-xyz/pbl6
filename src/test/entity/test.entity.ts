import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';
import { Tag } from '../../tag/entity/tag.entity';
import { TestPractice } from '../../test-practice/entity/testPractice.entity';
import { Paginated } from '../../pagination/paginator';
import { Comment } from '../../comment/entity/comment.entity';

@Entity()
export class Test {
  constructor(partial?: Partial<Test>) {
    Object.assign(this, partial);
  }
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  time: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @OneToMany(() => GroupQuestion, (group) => group.test, {
    cascade: true,
    nullable: false,
  })
  groupQuestions: Promise<GroupQuestion[]>;

  @Expose()
  @ManyToMany(() => Tag, (tag) => tag.test, {
    cascade: true,
    nullable: true,
  })
  tags: Promise<Tag[]>;

  @Expose()
  @OneToMany(() => TestPractice, (testPractice) => testPractice.test, {
    cascade: true,
    nullable: true,
  })
  testPractices: Promise<TestPractice[]>;

  @Expose()
  @OneToMany(() => Comment, (comment) => comment.test, {
    nullable: true,
  })
  comments: Promise<Comment[]>;
}

export class PaginatedTest extends Paginated<Test>(Test) {}
