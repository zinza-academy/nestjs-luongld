import { User } from '@modules/users/entities/user.entity';
import { Vaccine } from '@modules/vaccine/entities/vaccine.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column({ type: 'boolean', default: false })
  isVaccinated: boolean;

  @Column()
  vaccinationSession: number;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  user: User;

  @ManyToMany(() => Vaccine)
  @JoinTable()
  vaccines: Vaccine[];
}
