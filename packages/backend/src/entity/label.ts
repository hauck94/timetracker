import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: string;
  
  @UpdateDateColumn()
  updatedAt: string;
}
