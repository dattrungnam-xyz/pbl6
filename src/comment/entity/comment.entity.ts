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
import { User } from '../../users/entity/user.entity';
import { Test } from '../../test/entity/test.entity';

@Entity()
export class Comment {
  constructor(partial?: Partial<Comment>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  // @ManyToOne(() => User, (user) => user.comments)
  // @Expose()
  // user: Promise<User>;

  // @Expose()
  // @CreateDateColumn()
  // createdAt: Date;

  // @Expose()
  // @DeleteDateColumn({ nullable: true })
  // deletedAt: Date;

  // @Column()
  // @Expose()
  // content: string;

  // @ManyToOne(() => Test, (test) => test.comments, { nullable: true })
  // @Expose()
  // test?: Promise<Test>;

  // @OneToMany(() => Comment, (comment) => comment.parentComment, {
  //   nullable: true,
  // })
  // @Expose()
  // subComment?: Promise<Comment[]>;

  // @ManyToOne(() => Comment, (comment) => comment.subComment, { nullable: true })
  // @Expose()
  // parentComment?: Promise<Comment>;
}