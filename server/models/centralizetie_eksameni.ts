/*

Table centralizetie_eksameni {
  school bigint
  anglu_val numeric
  biologija numeric
  fizika numeric
  francu_val numeric
  kimija numeric
  krievu_val numeric
  latv_val numeric
  vesture numeric
  matematika numeric
  vacu_val numeric
}
*/
import { Model, Table, Column, DataType, AllowNull, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { School } from './school.js';


interface CentralizetieEksameniData {
	school: number;
	year: number;
	optimal_level: boolean;
	anglu_val?: number;
	francu_val?: number;
	krievu_val?: number;
	vacu_val?: number;
	latv_val?: number;
	biologija?: number;
	fizika?: number;
	kimija?: number;
	vesture?: number;
	matematika?: number;
};

export type CentralizetieEksameniInput = Optional<CentralizetieEksameniData, 'anglu_val'|'biologija'|'fizika'|'francu_val'|
	'kimija'|'krievu_val'|'latv_val'|'matematika'|'vacu_val'|'vesture'>;
export type CentralizetieEksameniOutput = Required<CentralizetieEksameniData>;

@Table({
	tableName: 'centralizetie_eksameni',
	timestamps: false,
})
export class CentralizetieEksameni extends Model<CentralizetieEksameniData, CentralizetieEksameniInput>{
	@ForeignKey(() => School)
	@Column(DataType.BIGINT)
	school: number;

	@Column(DataType.INTEGER)
	year: number;

	@Default(false)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	optimal_level: boolean | null;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	anglu_val?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	biologija?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	fizika?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	francu_val?: number | null;

	@AllowNull(true)
	@Column(DataType.INTEGER)
	kimija?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	krievu_val?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	latv_val?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	vesture?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	matematika?: number | null;
	
	@AllowNull(true)
	@Column(DataType.INTEGER)
	vacu_val?: number | null;

	@BelongsTo(() => School, 'school')
	schools?: ReturnType<() => School> | null;
};

