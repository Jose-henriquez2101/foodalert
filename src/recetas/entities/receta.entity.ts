import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../productos/entities/product.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

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

  @ManyToOne(() => Usuario, (usuario) => usuario.recetas, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: Usuario;

  @Column({ nullable: true })
  usuarioId?: string;
}
