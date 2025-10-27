import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  categoria: Categoria;

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