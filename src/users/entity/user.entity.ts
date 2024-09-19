import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../type/role.type';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ unique: true })
  username: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column({ nullable: true })
  avatar: string;

  @Expose()
  @Column({ nullable: true, length: 11 })
  phone: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordResetToken: String;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
