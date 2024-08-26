import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  injectionNo: number;

  @Column()
  vaccineName: string;

  @Column()
  batchNumber: string;
}
