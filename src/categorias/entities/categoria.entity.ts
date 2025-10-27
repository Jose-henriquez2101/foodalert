import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../productos/entities/product.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => Product, product => product.categoria)
  productos: Product[];

  @ManyToOne(() => Usuario, (usuario) => usuario.categorias, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: Usuario;

  @Column({ nullable: true })
  usuarioId?: string;
}
