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
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';
import { Tag } from '../../tag/entity/tag.entity';

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
  @OneToMany(() => Tag, (tag) => tag.test, {
    cascade: true,
    nullable: true,
  })
  tags: Promise<Tag[]>
}
