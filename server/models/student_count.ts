import { Model, Table, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { School } from './school.js';


/*
date date,
	school INT REFERENCES myschema.schools,
	count_1_klase INT,
	count_2_klase INT,
	count_3_klase INT,
	count_4_klase INT,
	count_5_klase INT,
	count_6_klase INT,
	count_7_klase INT,
	count_8_klase INT,
	count_9_klase INT,
	count_10_klase INT,
	count_11_klase INT,
	count_12_klase INT
*/

interface StudentCountData {
	date: Date;
	school: number;
	count_1_klase: number;
	count_2_klase: number;
	count_3_klase: number;
	count_4_klase: number;
	count_5_klase: number;
	count_6_klase: number;
	count_7_klase: number;
	count_8_klase: number;
	count_9_klase: number;
	count_10_klase: number;
	count_11_klase: number;
	count_12_klase: number;
};

export type StudentCountInput = Optional<StudentCountData, never>;
type StudentCountOutput = Required<StudentCountData>;

@Table({
	tableName: 'student_count',
	timestamps: false,
})
export class StudentCount extends Model<StudentCountData, StudentCountInput>{
	@Column
	date!: Date;

	@ForeignKey(() => School)
	@Column(DataType.BIGINT)
	school!: number;

	@Column
	count_1_klase!: number;

	@Column
	count_2_klase!: number;

	@Column
	count_3_klase!: number;

	@Column
	count_4_klase!: number;

	@Column
	count_5_klase!: number;

	@Column
	count_6_klase!: number;

	@Column
	count_7_klase!: number;

	@Column
	count_8_klase!: number;

	@Column
	count_9_klase!: number;

	@Column
	count_10_klase!: number;

	@Column
	count_11_klase!: number;

	@Column
	count_12_klase!: number;

	@BelongsTo(() => School, 'school')
	schoolInstance?: ReturnType<() => School> | null;

	totalStudents(): number {
		return this.count_1_klase +
			this.count_1_klase +
			this.count_2_klase +
			this.count_3_klase +
			this.count_4_klase +
			this.count_5_klase +
			this.count_7_klase +
			this.count_8_klase +
			this.count_9_klase +
			this.count_10_klase +
			this.count_11_klase +
			this.count_12_klase;
	}
};