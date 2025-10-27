import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  cantidad: number;

  @Column()
  unidadMedida: string; // ej: "kg", "litros", "unidades"

  @ManyToOne(() => Categoria, categoria => categoria.productos, {
  onDelete: 'SET NULL',
  })
  categoria: Categoria;


  @ManyToOne(() => Usuario, (usuario) => usuario.productos, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: Usuario;

  @Column({ nullable: true })
  usuarioId?: string;

  @Column()
  fechaCaducidad: number;

  @CreateDateColumn({nullable: true})
  fechaRegistro?: number;

  @Column({
    type: 'enum',
    enum: ['vigente', 'proximo_a_vencer', 'caducado'],
    default: 'vigente',
  })
  estado: 'vigente' | 'proximo_a_vencer' | 'caducado';

}