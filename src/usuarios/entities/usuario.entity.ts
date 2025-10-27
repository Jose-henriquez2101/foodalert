import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Receta } from '../../recetas/entities/receta.entity';
import { Product } from '../../productos/entities/product.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Receta, (receta) => receta.usuario, { onDelete: 'CASCADE' })
    recetas?: Receta[];

    @OneToMany(() => Product, (product) => product.usuario, { onDelete: 'CASCADE' })
    productos?: Product[];

    @OneToMany(() => Categoria, (categoria) => categoria.usuario, { onDelete: 'CASCADE' })
    categorias?: Categoria[];
}