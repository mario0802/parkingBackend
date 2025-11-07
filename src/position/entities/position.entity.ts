import { Floor } from "../../floor/entities/floor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'positions' })
export class Position {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', {
        unique: true
    })
    code: string;

    @Column('int', {
        array: true,
        default: [0,0,0,0]
    })
    coordenadas: number[];

    @Column('boolean', { default: true })
    active: boolean;

    @ManyToOne(() => Floor, { nullable: true })
    @JoinColumn({ name: 'id_floor' })
    floor: Floor | null;
}
