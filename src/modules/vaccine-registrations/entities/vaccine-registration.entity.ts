import { User } from '@modules/user/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  user: User;
}
