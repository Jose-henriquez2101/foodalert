import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreReceta: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column('json')
  ingredientes: {
    productId: string;
    cantidadUsada: number;
    unidad: string;
  }[];

  @Column({ nullable: true })
  tiempoPreparacion?: number;

  @CreateDateColumn()
  fechaCreacion: Date;a
}
