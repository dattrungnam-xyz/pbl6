import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaType } from '../../type/media.type';
import { Question } from '../../question/entity/question.entity';
import { GroupQuestion } from '../../group-question/entity/groupQuestion.entity';

@Entity()
export class QuestionMedia {
  constructor(partial?: Partial<QuestionMedia>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  type: MediaType;

  @Expose()
  @Column()
  url: string;

  @Expose()
  @Column({ nullable: true })
  index: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Expose()
  @ManyToOne(() => GroupQuestion, (grp) => grp.questionMedia)
  groupQuestion: Promise<GroupQuestion>;
}
