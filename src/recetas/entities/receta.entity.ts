import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receta {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    ingredientes: string; 
    
}
