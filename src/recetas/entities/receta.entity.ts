import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { RecetaProducto } from './receta-producto.entity';

@Entity()
export class Receta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreReceta: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  tiempoPreparacion?: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  // Relación entre receta y productos con datos adicionales (cantidad, unidad)
  @OneToMany(() => RecetaProducto, (rp) => rp.receta, { cascade: true })
  recetaProductos?: RecetaProducto[];

  @ManyToOne(() => Usuario, (usuario) => usuario.recetas, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: Usuario;

  @Column({ nullable: true })
  usuarioId?: string;
}
