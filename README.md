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
5. Reconstruccion de la base de datos semilla
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
* GET /usuarios
  POSTMAN: (http://localhost:3000/usuarios)
  Lista todos los usuarios existentes.

* GET /usuarios/:id
  POSTMAN: (http://localhost:3000/usuarios/ID)
  Obtiene un usuario por su ID.

* POST /usuarios
  POSTMAN: (http://localhost:3000/usuarios)
  Crea un nuevo usuario.
  INPUT (ejemplo):
  ```json
  {
    "nombre": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }
  ```

* PATCH /usuarios/:id
  POSTMAN: (http://localhost:3000/usuarios/ID)
  Edita un usuario existente. Envía solo los campos que quieras actualizar.
  INPUT (ejemplo):
  ```json
  {
    "nombre": "Nombre Editado",
    "email": "nuevo@email.com"
  }
  ```

* DELETE /usuarios/:id
  POSTMAN: (http://localhost:3000/usuarios/ID)
  Elimina un usuario por su ID.

```
http://localhost:3000/productos
```
* GET /productos
  POSTMAN: (http://localhost:3000/productos)
  Lista todos los productos disponibles.

* GET /productos/:id
  POSTMAN: (http://localhost:3000/productos/ID)
  Obtiene un producto por su ID.

* POST /productos
  POSTMAN: (http://localhost:3000/productos)
  Crea un nuevo producto.
  INPUT (ejemplo): Para efectos practicos estos id no son reales, reemplazar por los disponibles
  ```json
  {
    "nombre": "Tomate",
    "cantidad": 10,
    "unidadMedida": "kg",
    "categoriaId": "9ebdfc9a-d0ed-4a9b-8944-02edd694e187",
    "usuarioId": "539dfece-6f76-4a19-b1b4-2bbaaf432d5c",
    "fechaCaducidad": 20251006
  }
  ```

* PATCH /productos/:id
  POSTMAN: (http://localhost:3000/productos/ID)
  Edita un producto existente. Envía solo los campos a cambiar.
  INPUT (ejemplo):
  ```json
  {
    "cantidad": 15,
    "unidadMedida": "kg"
  }
  ```

* DELETE /productos/:id
  POSTMAN: (http://localhost:3000/productos/ID)
  Elimina un producto por su ID.

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
* GET /recetas
    POSTMAN: (http://localhost:3000/categorias)
    Lista todas las recetas disponibles

* GET /recetas/:id
    POSTMAN: (http://localhost:3000/categorias/ID)
    Lista una receta por ID

* POST /recetas/:id
    POSTMAN: (http://localhost:3000/recetas)
    Crea una nueva receta
    INPUT (ejemplo): Para efectos practicos estos id no son reales, reemplazar por los disponibles
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

* PATCH /recetas/:id
    POSTMAN: (http://localhost:3000/recetas/ID)
    Edita una receta existente. Puedes actualizar campos básicos y/o los items de productos.
    - Para actualizar solo campos básicos (nombre, descripcion, tiempoPreparacion): enviar solo esos campos.
    - Para reemplazar productos, enviar `productoItems` (reemplaza la relación completa).
    INPUT (ejemplo: actualizar productos y datos): Para efectos practicos estos id no son reales, reemplazar por los disponibles
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

* DELETE /recetas/:id
    POSTMAN: (http://localhost:3000/recetas/ID)
    Elimina una receta por su ID (no elimina los productos en sí, solo la receta y sus asociaciones).