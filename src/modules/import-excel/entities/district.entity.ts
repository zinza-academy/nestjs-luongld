import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';
import { VaccinationSite } from '@modules/vaccination-sites/entities/vaccination-site.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity()
export class District {
  @PrimaryColumn()
  id: number;

  @Column()
  district: string;

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @OneToMany(() => VaccinationSite, (vaccineSites) => vaccineSites.district)
  vaccineSites: VaccinationSite[];

  @OneToMany(() => User, (user) => user.district)
  users: User[];
}
