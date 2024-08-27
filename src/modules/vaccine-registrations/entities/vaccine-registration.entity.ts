import { User } from '@modules/users/entities/user.entity';
import { Vaccine } from '@modules/vaccines/entities/vaccine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'date' })
  injectionTime: Date;

  @Column()
  injectionSite: string;

  @Column({ type: 'boolean', default: false })
  isVaccinated: boolean;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  user: User;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineRegistrations)
  vaccine: Vaccine;
}
