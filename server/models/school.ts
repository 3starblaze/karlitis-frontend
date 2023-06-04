import { Model, Table, PrimaryKey, Column, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { StudentCount } from './student_count.js';
import { CentralizetieEksameni } from './centralizetie_eksameni.js';


interface SchoolData {
	reg_nr: number,
	nosaukums: string,
	adrese: string | null,
	// We use the EPSG::3857 projection system for GPS coordinates
	gps_x: number | null,
	gps_y: number | null,
	skolotaji: number | null,
	skolotaju_videja_alga: number | null, // in EUR
	class_start_time: number | null,
	class_end_time: number | null,
	phone_number: string | null,
	email: string | null,
	website: string | null
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
	adrese!: string | null;

	@AllowNull(true)
	@Column(DataType.BIGINT)
	gps_x!: number | null;

	@AllowNull(true)
	@Column(DataType.BIGINT)
	gps_y!: number | null;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	skolotaji!: number | null;

	@AllowNull(true)
	@Column(DataType.DECIMAL)
	skolotaju_videja_alga!: number | null;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	class_start_time!: number | null;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	class_end_time!: number | null;

	@AllowNull(true)
	@Column(DataType.STRING)
	phone_number!: string | null;

	@AllowNull(true)
	@Column(DataType.STRING)
	email!: string | null;

	@AllowNull(true)
	@Column(DataType.STRING)
	website!: string | null;

	@HasMany(() => StudentCount, 'school')
	studentCounts?: ReturnType<() => StudentCount[]> | null;

	@HasMany(() => CentralizetieEksameni, 'school')
	CEx?: ReturnType<() => CentralizetieEksameni[]> | null;
};