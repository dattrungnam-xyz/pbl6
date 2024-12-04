import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListenGroup } from '../../listen-group/entity/listenGroup.entity';
import { ListenSentence } from '../../listen-sentence/entity/listenSentence.entity';

@Entity()
export class ListenLession {
  constructor(partial: Partial<ListenLession>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  audio: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => ListenGroup, (listenGroup) => listenGroup.listenLessions)
  listenGroup: ListenGroup;

  @OneToMany(
    () => ListenSentence,
    (listenSentence) => listenSentence.listenLession,
  )
  listenSentences: ListenSentence[];
}
