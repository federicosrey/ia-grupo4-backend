 ![version](https://img.shields.io/badge/version-1.0.0-blue.svg) 

## Presentacion del producto
![Product Presentation Image](https://i.ibb.co/TtMDY5Q/gipeylogo.png)

## Descripcion

<p>Nuestro proyecto consta en hacer una aplicacion tomando el rol de una entidad de credito, comunicarnos con distintos clientes y bancos para hacer las operatorias requeridas.</p>

## Tabla de contenidos

* [Integrantes](#Integrantes)
* [Tecnologia](#Tecnologia)
* [Instalacion](#Instalacion)
* [End-Points](#End-Points)
* [Base de datos](#Base-de-datos)
* [Recursos](#Recursos)


## Integrantes grupo 4

* Enriquez, Ariel Leandro               <b>Legajo : 1037578</b>
* Rey, Federico Sebastian               <b>Legajo : 1084711</b>
* Tessa, Geronimo Ezequiel              <b>Legajo : 1046413</b>

## Tecnologia

<img src="https://i.ibb.co/GR1VxFh/material-ui.png" width="64" height="64" /><img src="https://i.ibb.co/bsJMq4X/aps-504x498-small-transparent-pad-600x600-f8f8f8-u1.jpg" width="64" height="64" /><img src="https://i.ibb.co/8z4nT69/swagger-round.png" width="64" height="64" /><img src="https://i.ibb.co/gDdLc4Z/heroku.png" width="64" height="64" /><img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/html-logo.jpg?raw=true" width="64" height="64" /><img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react-logo.jpg?raw=true" width="64" height="64" />

## Instalacion

## FrontEnd

* Descargar la aplicacion del repositorio https://github.com/federicosrey/ia-grupo4-frontend
* En la carpeta del proyecto ejecutar <b>npm install</b>
* <b>cd</b> ia-grupo4-frontend
* Luego dar <b>npm start</b>
* Se levantará en local http://localhost:3000/
* Tambien se encuentra hosteado en Heroku https://ia-grupo4-frontend.herokuapp.com/

## BackEnd

* El backend de la aplicacion se encuesta en ek siguiente repositorio https://github.com/federicosrey/ia-grupo4-backend
* En la carpeta del proyecto ejecutar <b>npm install</b>
* <b>cd</b> ia-grupo4-backend
* Luego dar <b>npm start</b>
* Se levantará en local http://localhost:4000/
* Tambien se encuentra hosteado en Heroku https://ia-grupo4-backend.herokuapp.com/

## Navegadores soportados

Se probo en los siguientes navegadores: 

<img src="https://i.ibb.co/6v017Nk/pngegg.png">

## End-Points

El backend tiene configurado los siguientes endpoints :

<b><p>Cobro (api/users/agregarMovimiento)</b></p>
<p>Se utiliza para poder registrar los cobros de cada cliente</p>
<p>Metodo : POST</p>

 * cuiUsuario: String
 * cuitNegocio: String
 * numeroTarjeta: Integer
 * monto: Integer

Tanto los endpoints como los modelos de datos se encuentran en swagger en el siguiente link

- SWAGGER: <https://ia-grupo4-backend.herokuapp.com/endpoints/>

## Base de Datos

<p>Para la base de datos utilizamos MongoDB</p>
<p>Poseemos el siguiente Cluster configurado <b>cluster0.vypin.mongodb.net</b></p>
<p>En la ruta /ia-grupo4-backend/models, se encuentran los modelos de datos para los documentos</p>

## Recursos

- GIT: <https://github.com/federicosrey/ia-grupo4-backend>
- GIT: <https://github.com/federicosrey/ia-grupo4-frontend>
