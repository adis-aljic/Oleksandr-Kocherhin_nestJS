import {Entity, PrimaryGeneratedColumn, Column ,BaseEntity} from "typeorm"

@Entity({name: "tags"})
export class TagEntity extends BaseEntity {
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string
};

