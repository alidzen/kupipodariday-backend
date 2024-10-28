import { IsUrl, Length } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../..//users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 250 })
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  raised: number;

  @Column({ length: 1024 })
  @Length(1, 1024)
  description: string;

  @Column({ type: 'int', default: 0 })
  copied: number;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.wishes, { onDelete: 'CASCADE' })
  owner: User;
}
