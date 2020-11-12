import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updatedAt: string;
}
