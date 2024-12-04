import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenGroup } from '../../listen-group/entity/listenGroup.entity';
import { ListenLession } from '../../listen-lession/entity/listenLession.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(
    () => ListenLession,
    (listenLession) => listenLession.listenSentences,
  )
  listenLession: ListenLession;
}
