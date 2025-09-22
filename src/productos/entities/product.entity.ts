import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column()
  categoria: string; // ej: "Lácteos", "Carnes", "Verduras"

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