import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './district.entity';
import { Ward } from './ward.entity';
import { VaccinationSite } from '@modules/vaccination-sites/entities/vaccination-site.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity()
export class Province {
  @PrimaryColumn()
  id: number;

  @Column()
  province: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @OneToMany(() => Ward, (ward) => ward.province)
  wards: Ward[];

  @OneToMany(() => VaccinationSite, (vaccineSites) => vaccineSites.province)
  vaccineSites: VaccinationSite[];

  @OneToMany(() => User, (user) => user.province)
  users: User[];
}
