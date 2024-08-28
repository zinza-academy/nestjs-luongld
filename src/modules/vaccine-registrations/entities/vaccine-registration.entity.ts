import { User } from '@modules/users/entities/user.entity';
import { VaccineResult } from '@modules/vaccine-result/entities/vaccine-result.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VaccineRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  priorityGroup: string;

  @Column()
  healthInsuranceCardNumber: string;

  @Column()
  job: string;

  @Column()
  workPlace: string;

  @Column()
  addressCurrent: string;

  @Column({ type: 'date' })
  desiredVaccinationDate: Date;

  @Column()
  vaccinationSession: number;

  @Column({ type: 'boolean', default: false })
  isVaccinated: boolean;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  user: User;

  @OneToMany(
    () => VaccineResult,
    (vaccineResult) => vaccineResult.vaccineRegistration,
  )
  vaccineResults: VaccineResult[];
}
