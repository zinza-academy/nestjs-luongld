import { VaccineRegistration } from '@modules/vaccine-registrations/entities/vaccine-registration.entity';
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

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.vaccine,
  )
  vaccineRegistrations: Vaccine[];
}
