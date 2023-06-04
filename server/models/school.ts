import { Model, Table, PrimaryKey, Column, DataType, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { StudentCount } from './student_count.js';


interface SchoolData{
	reg_nr: number,
	nosaukums: string,
	adrese: string,
	gps_lat: number,
	gps_lon: number,
	skolotaji: number,
	skolotaju_videja_alga: number,
	class_start_time: number,
	class_end_time: number,
	phone_number: string,
	email: string,
	website: string
};

type SchoolInput = Optional<SchoolData, never>;
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
	tableName: 'schools'
})
export class School extends Model<SchoolData, SchoolInput>{
	@PrimaryKey
	@Column(DataType.INTEGER)
	reg_nr!: number;

	@Column(DataType.STRING)
	nosaukums!: string;

	@Column(DataType.STRING)
	adrese!: string;
	
	@Column(DataType.DECIMAL)
	gps_lat!: number;

	@Column(DataType.DECIMAL)
	gps_lon!: number;

	@Column(DataType.INTEGER)
	skolotaji!: number;

	@Column(DataType.DECIMAL)
	skolotaju_videja_alga!: number;
	
	@Column(DataType.INTEGER)
	class_start_time!: number;
	
	@Column(DataType.INTEGER)
	class_end_time!: number;
	
	@Column(DataType.STRING)
	phone_number!: string;

	@Column(DataType.STRING)
	email!: string;

	@Column(DataType.STRING)
	website!: string;

	@HasMany(() => StudentCount, 'school')
	studentCounts?: ReturnType<() => StudentCount>;
};