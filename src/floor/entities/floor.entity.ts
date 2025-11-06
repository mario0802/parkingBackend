import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'floors' })
export class Floor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    })
    name:string;

    @Column('text')
    description:string;

    @Column('boolean', {default:true})
    active:boolean;
}
