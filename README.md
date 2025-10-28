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
* GET usuarios
* GET(id) usuarios
* POST usuarios
* PATCH usuarios
* DELETE usuarios

```
http://localhost:3000/productos
```
* GET productos
* GET(id) productos
* POST productos
* PATCH productos
* DELETE productos

```
http://localhost:3000/categorias
```
* GET categorias
* GET(id) categorias
* POST categorias
* PATCH categorias
* DELETE categorias
```
http://localhost:3000/recetas
```
* GET recetas
* GET(id) recetas
* POST recetas
* PATCH recetas
* DELETE recetas