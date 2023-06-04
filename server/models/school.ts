import { Model, Table, PrimaryKey, Column, DataType, AllowNull } from 'sequelize-typescript';
import { Optional } from 'sequelize';


interface SchoolData {
	reg_nr: number,
	nosaukums: string,
	adrese?: string,
	gps_lat?: number,
	gps_lon?: number,
	skolotaji?: number,
	skolotaju_videja_alga?: number,
	class_start_time?: number,
	class_end_time?: number,
	phone_number?: string,
	email?: string,
	website?: string
};

export type SchoolInput = Optional<SchoolData, 'adrese' | 'gps_lat' | 'gps_lon' | 'skolotaji' | 'skolotaju_videja_alga' |
	'class_start_time' | 'class_end_time' | 'phone_number' | 'phone_number' | 'email' | 'website'>;
type SchoolOutput = Required<SchoolData>;

/*
reg_nr: DataTypes.INT,
  nosaukums: DataTypes.STRING,
  adrese: DataTypes.STRING,
  gps_lat: DataTypes.DECIMAL,
  gps_lon: DataTypes.DECIMAL,
  skolotaji: DataTypes.INT,
  skolotaju_videja_alga: DataTypes.DECIMAL,
  class_start_time: DataTypes.INT,
  class_end_time: DataTypes.INT,
  phone_number: DataTypes.STRING,
  email: DataTypes.STRING,
  website: DataTypes.STRING
*/

@Table({
	tableName: 'schools',
	timestamps: false
})
export class School extends Model<SchoolData, SchoolInput>{
	@PrimaryKey
	@Column(DataType.BIGINT)
	reg_nr!: number;

	@Column(DataType.STRING)
	nosaukums!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	adrese!: string;

	@AllowNull(true)
	@Column(DataType.DECIMAL)
	gps_lat!: number;

	@AllowNull(true)
	@Column(DataType.DECIMAL)
	gps_lon!: number;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	skolotaji!: number;

	@AllowNull(true)
	@Column(DataType.DECIMAL)
	skolotaju_videja_alga!: number;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	class_start_time!: number;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	class_end_time!: number;

	@AllowNull(true)
	@Column(DataType.STRING)
	phone_number!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	email!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	website!: string;
};