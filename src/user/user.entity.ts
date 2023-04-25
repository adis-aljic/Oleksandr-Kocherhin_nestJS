import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from "typeorm"
import { hash } from "bcrypt";


@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ default: "" })
    bio: string;

    @Column({ default: "" })
    image: string;

    @Column()
    password: string;
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}