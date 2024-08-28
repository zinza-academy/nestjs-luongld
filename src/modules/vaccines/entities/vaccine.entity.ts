import { VaccineResult } from '@modules/vaccine-result/entities/vaccine-result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => VaccineResult, (vaccineResult) => vaccineResult.vaccine)
  vaccineResults: VaccineResult[];
}
