import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    ingredientes: string; 
    
}
