import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Receta } from '../../recetas/entities/receta.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Receta, (receta) => receta.usuario)
    recetas?: Receta[];
}