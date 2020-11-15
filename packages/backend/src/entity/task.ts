
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Tracking } from "./tracking";
import { Label } from "./label";



@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Tracking, trackings => trackings.task, {nullable : true})
  trackings: Tracking[];

  @ManyToMany(() => Label, {
    nullable : true 
  })
    @JoinTable()
    labels: Label[];
}
