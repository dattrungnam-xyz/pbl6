import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenGroup } from '../../listen-group/entity/listenGroup.entity';
import { ListenLesson } from '../../listen-lesson/entity/listenLesson.entity';

@Entity()
export class ListenSentence {
  constructor(partial: Partial<ListenSentence>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sentence: string;

  @Column()
  audio: string;

  @Column()
  index: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => ListenLesson, (listenLesson) => listenLesson.listenSentences)
  listenLesson: ListenLesson;
}
