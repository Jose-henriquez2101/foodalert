import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Receta } from './receta.entity';
import { Product } from '../../productos/entities/product.entity';

@Entity({ name: 'receta_producto' })
export class RecetaProducto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recetaId: string;

  @Column()
  productId: string;

  @Column('float', { nullable: true })
  cantidadUsada?: number;

  @Column({ nullable: true })
  unidad?: string;

  @ManyToOne(() => Receta, (receta) => receta.recetaProductos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetaId' })
  receta: Receta;

  @ManyToOne(() => Product, (product) => product.recetaProductos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
