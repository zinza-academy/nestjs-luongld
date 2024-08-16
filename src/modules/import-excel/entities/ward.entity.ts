import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';

@Entity()
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column()
  ward: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @ManyToOne(() => Province, (province) => province.wards)
  province: Province;
}
