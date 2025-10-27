export interface Receta {
    id: string;
    nombreReceta: string;
    descripcion?: string;
    tiempoPreparacion?: number;
    usuarioId?: string;
}