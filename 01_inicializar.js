
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 01_inicializar.js

  Objetivo:
  Preparar la base de datos universidad
  e insertar estudiantes de ejemplo.
*/

// 1. Seleccionar la base de datos
const universidad = db.getSiblingDB("universidad");

// 2. Seleccionar la colección
const estudiantes = universidad.getCollection("estudiantes");

// 3. Limpiar los datos de prácticas anteriores
// ATENCIÓN: elimina todos los documentos de esta colección.
estudiantes.deleteMany({});

// 4. Insertar los estudiantes iniciales
const resultado = estudiantes.insertMany([
  {
    matricula: "001",
    nombre: "Ana",
    edad: 20,
    carrera: "Sistemas",
    semestre: 2
  },
  {
    matricula: "002",
    nombre: "Luis",
    edad: 21,
    carrera: "Sistemas",
    semestre: 3
  },
  {
    matricula: "003",
    nombre: "Maria",
    edad: 22,
    carrera: "Industrial",
    semestre: 4
  },
  {
    matricula: "004",
    nombre: "Carlos",
    edad: 19,
    carrera: "Sistemas",
    semestre: 2
  }
]);

// 5. Mostrar los resultados
print("=== BASE DE DATOS INICIALIZADA ===");
print("Base de datos: universidad");
print("Colección: estudiantes");
print("Documentos insertados: " + Object.keys(resultado.insertedIds).length);

// 6. Verificar los documentos
print("\n=== ESTUDIANTES REGISTRADOS ===");
estudiantes.find().forEach(printjson);
