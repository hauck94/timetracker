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
import { Label } from "./label";
import { Tracking } from "./tracking";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Tracking, (tracking) => tracking.id, {
    nullable: true
  })
  trackings: Tracking[];

  @ManyToMany(() => Label, (label) => label.tasks, {
    nullable: true,
    eager: true,
  })
  @JoinTable()
  labels: Label[];
}
