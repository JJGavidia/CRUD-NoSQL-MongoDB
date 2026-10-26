
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 03_read.js
  OPERACIÓN: READ

  Objetivo:
  Consultar documentos utilizando MQL.
*/

// 1. Seleccionar la base de datos
const universidad = db.getSiblingDB("universidad");
const estudiantes = universidad.getCollection("estudiantes");

print("=== OPERACIÓN READ ===");

// 2. READ: Consultar todos los estudiantes
print("\n1. CONSULTAR TODOS LOS ESTUDIANTES");

estudiantes.find().forEach(printjson);

// 3. READ: Buscar un estudiante específico
print("\n2. BUSCAR UN ESTUDIANTE POR MATRÍCULA");

printjson(
  estudiantes.findOne({ matricula: "001" })
);

// 4. READ: Filtrar por carrera
print("\n3. ESTUDIANTES DE SISTEMAS");

estudiantes.find({
  carrera: "Sistemas"
}).forEach(printjson);

// 5. READ: Filtrar por edad
print("\n4. ESTUDIANTES MAYORES DE 20 AÑOS");

estudiantes.find({
  edad: { $gt: 20 }
}).forEach(printjson);

// 6. READ: Utilizar dos condiciones
print("\n5. ESTUDIANTES DE SISTEMAS CON 20 AÑOS O MÁS");

estudiantes.find({
  $and: [
    { carrera: "Sistemas" },
    { edad: { $gte: 20 } }
  ]
}).forEach(printjson);

// 7. READ: Utilizar el operador OR
print("\n6. ESTUDIANTES DE SISTEMAS O INDUSTRIAL");

estudiantes.find({
  $or: [
    { carrera: "Sistemas" },
    { carrera: "Industrial" }
  ]
}).forEach(printjson);

// 8. READ: Ordenar por edad
print("\n7. ESTUDIANTES ORDENADOS POR EDAD");

estudiantes.find().sort({
  edad: 1
}).forEach(printjson);

// 9. READ: Proyección de campos
print("\n8. MOSTRAR SOLO NOMBRE Y CARRERA");

estudiantes.find(
  {},
  {
    _id: 0,
    nombre: 1,
    carrera: 1
  }
).forEach(printjson);

// 10. READ: Contar documentos
print("\n9. TOTAL DE ESTUDIANTES");

print(estudiantes.countDocuments({}));

print("\n=== CONSULTAS FINALIZADAS ===");
