<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecucion de la app

1. clonar el repositorio
2. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
3. ejecutar el siguiente comando para instalar todas dependencias
```
npm install

```
4. Levantar la base de datos y ejecucion de la aplicacion
```
docker-compose up -d 
```
5. Reconstruccion de la base de datos semilla (Los id de las entidades son generadas de manera aleatoria, nunca seran iguales)
```
http://localhost:3000/seed
```

## stack usado
* PostgreSQL
* Nest
* Docker
## ENDPOINT LISTOS
```
http://localhost:3000/usuarios
```
* GET usuarios
* GET(id) usuarios
* POST usuarios
* PATCH usuarios
* DELETE usuarios

```
http://localhost:3000/productos
```
* GET productos
* POSTMAN: (http://localhost:3000/productos)
  Lista todos los productos
* GET(id) productos
* POSTMAN: (http://localhost:3000/productos/ID)
  Lista el producto por su id
* POST productos
* POSTMAN: (http://localhost:3000/productos)
  Ingresar un nuevo producto
* Input 
{
  nombre: 'Arroz', cantidad: 50, unidadMedida: 'kg', categoria: 'Cereales', fechaCaducidad: 20251201
}
* PATCH productos
* POSTMAN (http://localhost:3000/productos/ID)
  Cambiar o actualizar un producto existente
* Input
{
  nombre: 'Arroz integral', cantidad: 50, unidadMedida: 'kg', categoria: 'Cereales', fechaCaducidad: 20251201
}
* DELETE productos
* POSTMAN (http://localhost:3000/productos/ID)
  Eliminar un producto mediante su id

```
http://localhost:3000/categorias
```
* GET /categorias
* POSTMAN: (http://localhost:3000/categorias
  )
  Lista todas las categorías disponibles.

* GET /categorias/:id
* POSTMAN: (http://localhost:3000/categorias/ID
  )
  Obtiene una categoría específica por su ID.

* POST /categorias
* POSTMAN: (http://localhost:3000/categorias
  )
  Crea una nueva categoría.

* Input:

  {
    "nombre": "nombreCategoria"
  }


* PATCH /categorias/:id
* POSTMAN: (http://localhost:3000/categorias/ID
  )
  Edita una categoría existente.

* Input:

  {
    "nombre": "nombreCategoriaEditado"
  }


* DELETE /categorias/:id
* POSTMAN: (http://localhost:3000/categorias/ID
)
  Elimina una categoría por su ID.

```
http://localhost:3000/recetas
```
* GET recetas
    POSTMAN: (http://localhost:3000/categorias)
    Lista todas las recetas disponibles

* GET(id) recetas
    POSTMAN: (http://localhost:3000/categorias/ID)
    Lista una receta por ID

* POST recetas
    POSTMAN: (http://localhost:3000/recetas)
    Crea una nueva receta
    INPUT (ejemplo):
    ```json
    {
      "nombreReceta": "Arroz con Leche Casero",
      "descripcion": "Postre tradicional de arroz con leche y azúcar",
      "tiempoPreparacion": 45,
      "usuarioId": "87e8b694-7f0f-455a-acd7-e9f36792425e",
      "productoItems": [
        { "productId": "5a36200f-23b1-4a42-959b-9c7cf35a6697", "cantidadUsada": 0.25, "unidad": "kg" },
        { "productId": "c61b6ec8-fa15-4769-b9e6-fb81e299831d", "cantidadUsada": 1, "unidad": "litros" }
      ]
    }
    ```

* PATCH recetas
    POSTMAN: (http://localhost:3000/recetas/ID)
    Edita una receta existente. Puedes actualizar campos básicos y/o los items de productos.
    - Para actualizar solo campos básicos (nombre, descripcion, tiempoPreparacion): enviar solo esos campos.
    - Para reemplazar productos, enviar `productoItems` (reemplaza la relación completa).
    INPUT (ejemplo: actualizar productos y datos):
    ```json
    {
      "nombreReceta": "Arroz con Leche Especial",
      "descripcion": "Versión mejorada",
      "tiempoPreparacion": 40,
      "productoItems": [
        { "productId": "5a36200f-23b1-4a42-959b-9c7cf35a6697", "cantidadUsada": 0.3, "unidad": "kg" },
        { "productId": "ba1e6908-1932-4439-a371-8aeef8149834", "cantidadUsada": 0.15, "unidad": "kg" }
      ]
    }
    ```

* DELETE recetas
    POSTMAN: (http://localhost:3000/recetas/ID)
    Elimina una receta por su ID (no elimina los productos en sí, solo la receta y sus asociaciones).