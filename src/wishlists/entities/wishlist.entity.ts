import { Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 250 })
  @Length(1, 250)
  name: string;

  @Column({ length: 1500, nullable: true })
  @Length(0, 1500)
  desctiption: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
