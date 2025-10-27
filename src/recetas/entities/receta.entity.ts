import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable,} from 'typeorm';
import { Product } from '../../productos/entities/product.entity';

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
  fechaCreacion: Date;

  // Relación ManyToMany opcional con Product
  @ManyToMany(() => Product, { nullable: true })
  @JoinTable({
    name: 'recetas_productos',
    joinColumn: { name: 'recetaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  productos?: Product[];
}
