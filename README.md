# CRUD NoSQL con MongoDB — Gestión de Estudiantes

## Descripción

Proyecto académico desarrollado para la materia **Bases de Datos Avanzadas**, cuyo objetivo es demostrar el funcionamiento de las operaciones CRUD utilizando MongoDB Query Language (MQL).

Se implementa un sistema sencillo de gestión de estudiantes mediante una base de datos NoSQL orientada a documentos.

El proyecto permite crear, consultar, actualizar y eliminar documentos, además de verificar automáticamente los resultados.

## Tecnologías utilizadas

- MongoDB Community Server: almacenamiento de documentos.
- MongoDB Shell (`mongosh`): ejecución de comandos MQL.
- MongoDB Compass: visualización y comprobación de datos.
- Visual Studio Code: desarrollo y ejecución de scripts.
- JavaScript: lenguaje utilizado en los archivos.
- Windows 11: sistema operativo de desarrollo.

**Nota:** No es necesario instalar Node.js para ejecutar este proyecto. Los archivos se ejecutan mediante `mongosh`.

## Base de datos

- **Nombre:** `universidad`
- **Colección:** `estudiantes`
- **Conexión:** `mongodb://localhost:27017`

Cada estudiante contiene los campos `matricula`, `nombre`, `edad`, `carrera` y `semestre`. MongoDB también genera automáticamente un identificador `_id`.

Ejemplo de documento:

```json
{
  "matricula": "001",
  "nombre": "Ana",
  "edad": 20,
  "carrera": "Sistemas",
  "semestre": 2
}
```

## Estructura del proyecto

```text
CRUD-NoSQL-MongoDB/
├── 01_inicializar.js
├── 02_create.js
├── 03_read.js
├── 04_update.js
├── 05_delete.js
├── 06_verificacion.js
└── README.md
```

## Operaciones implementadas

| Archivo | Operación | Descripción |
|---|---|---|
| `01_inicializar.js` | Inicialización | Prepara cuatro estudiantes de ejemplo |
| `02_create.js` | CREATE | Inserta documentos con `insertOne()` e `insertMany()` |
| `03_read.js` | READ | Realiza consultas, filtros, ordenamientos y proyecciones |
| `04_update.js` | UPDATE | Modifica documentos con `updateOne()` y `updateMany()` |
| `05_delete.js` | DELETE | Elimina documentos con `deleteOne()` y `deleteMany()` |
| `06_verificacion.js` | Verificación | Ejecuta nueve comprobaciones automáticas |

## Instalación y requisitos

Para ejecutar el proyecto en Windows se requiere instalar:

1. [Visual Studio Code](https://code.visualstudio.com/download).
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community).
3. [MongoDB Shell](https://www.mongodb.com/try/download/shell).
4. [MongoDB Compass](https://www.mongodb.com/try/download/compass).

Instalar MongoDB Server como servicio de Windows.

Para comprobar que está funcionando, abrir PowerShell y ejecutar:

```powershell
Get-Service MongoDB
```

El estado esperado es `Running`.

Para comprobar la conexión:

```powershell
mongosh "mongodb://localhost:27017"
```

Dentro de MongoDB Shell, ejecutar:

```javascript
db.runCommand({ ping: 1 })
```

El resultado esperado es `{ ok: 1 }`.

## Ejecución del proyecto

Abrir la carpeta `CRUD-NoSQL-MongoDB` en Visual Studio Code y seleccionar **Terminal > Nueva terminal**.

Los archivos deben ejecutarse en orden mediante los siguientes comandos.

### 1. Inicializar la base de datos

```powershell
mongosh "mongodb://localhost:27017" --file "01_inicializar.js"
```

Se registran cuatro estudiantes iniciales: Ana, Luis, Maria y Carlos.

**Advertencia:** Este script elimina previamente todos los documentos existentes en `universidad.estudiantes`. Debe utilizarse únicamente sobre la colección de práctica.

### 2. CREATE — Crear documentos

```powershell
mongosh "mongodb://localhost:27017" --file "02_create.js"
```

Utiliza `insertOne()` para insertar a Sofia y `insertMany()` para insertar a Pedro y Laura.

**Resultado esperado:** 7 estudiantes registrados.

### 3. READ — Consultar documentos

```powershell
mongosh "mongodb://localhost:27017" --file "03_read.js"
```

Incluye consultas utilizando:

- `find()` y `findOne()`.
- Operadores `$gt`, `$gte`, `$and` y `$or`.
- Ordenamiento mediante `sort()`.
- Proyección para seleccionar campos.
- Conteo mediante `countDocuments()`.

Ejemplo de filtro:

```javascript
{ carrera: "Sistemas" }
```

**Resultado esperado:** 5 estudiantes de Sistemas.

### 4. UPDATE — Actualizar documentos

```powershell
mongosh "mongodb://localhost:27017" --file "04_update.js"
```

Utiliza `updateOne()` junto con `$set` para modificar el semestre de Ana.

Posteriormente utiliza `updateMany()` junto con `$inc` para incrementar el semestre de los estudiantes de Sistemas.

**Resultado esperado:** 5 estudiantes modificados en la actualización masiva.

### 5. DELETE — Eliminar documentos

```powershell
mongosh "mongodb://localhost:27017" --file "05_delete.js"
```

Utiliza `deleteOne()` para eliminar a Carlos y `deleteMany()` para eliminar a los estudiantes de Industrial.

**Resultado esperado:** 4 estudiantes restantes.

### 6. Verificación automática

```powershell
mongosh "mongodb://localhost:27017" --file "06_verificacion.js"
```

El programa comprueba la cantidad final de documentos, los estudiantes que permanecen registrados, sus semestres y las eliminaciones realizadas.

Resultado esperado:

```text
Pruebas correctas: 9
Pruebas fallidas: 0
RESULTADO FINAL: TODAS LAS PRUEBAS PASARON
```

## Resultado final

Después de ejecutar correctamente todos los archivos, la colección contiene:

| Matrícula | Nombre | Carrera | Semestre |
|---|---|---|---|
| 001 | Ana | Sistemas | 4 |
| 002 | Luis | Sistemas | 4 |
| 005 | Sofia | Sistemas | 3 |
| 007 | Laura | Sistemas | 4 |

## Verificación mediante MongoDB Compass

Abrir MongoDB Compass y conectar utilizando:

`mongodb://localhost:27017`

Seleccionar la base de datos `universidad` y la colección `estudiantes`.

En la pestaña **Documents** es posible visualizar los documentos y utilizar filtros MQL, como:

```json
{ "carrera": "Sistemas" }
```

Después de cada operación se puede utilizar **Refresh** para comprobar los cambios.

## Reiniciar la demostración

Para volver a ejecutar el proyecto desde el principio:

```powershell
mongosh "mongodb://localhost:27017" --file "01_inicializar.js"
```

Después ejecutar los archivos restantes en orden.

No se recomienda ejecutar repetidamente `02_create.js` o `04_update.js` sin reiniciar, ya que pueden insertarse documentos duplicados o incrementarse nuevamente los semestres.

## Conclusiones

Este proyecto demuestra que MongoDB permite administrar documentos mediante las cuatro operaciones fundamentales CRUD utilizando MQL.

La combinación de scripts JavaScript, MongoDB Shell y MongoDB Compass facilita la comprensión de los comandos y permite comprobar visualmente sus resultados.

Finalmente, las nueve verificaciones automáticas permiten validar que la colección terminó en el estado esperado.

## Referencias

- [Documentación oficial de MongoDB](https://www.mongodb.com/docs/manual/)
- [Operaciones CRUD de MongoDB](https://www.mongodb.com/docs/manual/crud/)
- [Documentación de MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/)
- [Documentación de MongoDB Compass](https://www.mongodb.com/docs/compass/)