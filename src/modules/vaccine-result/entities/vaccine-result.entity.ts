import { VaccinationSite } from '@modules/vaccination-sites/entities/vaccination-site.entity';
import { VaccineRegistration } from '@modules/vaccine-registrations/entities/vaccine-registration.entity';
import { Vaccine } from '@modules/vaccines/entities/vaccine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VaccineResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vaccineRegistrationId: number;

  @Column()
  vaccineId: number;

  @Column()
  vaccinationSiteId: number;

  @ManyToOne(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.vaccineResults,
  )
  vaccineRegistration: VaccineRegistration;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineResults)
  vaccine: Vaccine;

  @ManyToOne(
    () => VaccinationSite,
    (vaccinationSite) => vaccinationSite.vaccineResults,
  )
  vaccinationSite: VaccinationSite;
}
