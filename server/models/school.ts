import { Model, Table, PrimaryKey, Column, DataType, AllowNull } from 'sequelize-typescript';
import { Optional } from 'sequelize';


interface SchoolData {
	reg_nr: number,
	nosaukums: string,
	adrese?: string,
	// We use the EPSG::3857 projection system for GPS coordinates
	gps_x?: number,
	gps_y?: number,
	skolotaji?: number,
	skolotaju_videja_alga?: number, // in EUR
	class_start_time?: number,
	class_end_time?: number,
	phone_number?: string,
	email?: string,
	website?: string
};

export type SchoolInput = Optional<SchoolData, 'adrese' | 'gps_x' | 'gps_y' | 'skolotaji' | 'skolotaju_videja_alga' |
	'class_start_time' | 'class_end_time' | 'phone_number' | 'phone_number' | 'email' | 'website'>;
type SchoolOutput = Required<SchoolData>;

@Table({
	tableName: 'schools',
	timestamps: false,
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
	@Column(DataType.BIGINT)
	gps_x!: number;

	@AllowNull(true)
	@Column(DataType.BIGINT)
	gps_y!: number;

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