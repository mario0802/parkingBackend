import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text', {
        select: false
    })
    password: string;

}
