
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 02_create.js
  OPERACIÓN: CREATE

  Objetivo:
  Insertar uno y varios estudiantes.
*/

// 1. Conectarnos a la base de datos
const universidad = db.getSiblingDB("universidad");
const estudiantes = universidad.getCollection("estudiantes");

print("=== OPERACIÓN CREATE ===");

// 2. CREATE: Insertar un documento
print("\n1. Insertar un estudiante");

const resultadoUno = estudiantes.insertOne({
  matricula: "005",
  nombre: "Sofia",
  edad: 20,
  carrera: "Sistemas",
  semestre: 2
});

print("Estudiante insertado correctamente");
printjson(resultadoUno);

// 3. CREATE: Insertar varios documentos
print("\n2. Insertar varios estudiantes");

const resultadoVarios = estudiantes.insertMany([
  {
    matricula: "006",
    nombre: "Pedro",
    edad: 23,
    carrera: "Industrial",
    semestre: 5
  },
  {
    matricula: "007",
    nombre: "Laura",
    edad: 21,
    carrera: "Sistemas",
    semestre: 3
  }
]);

print("Estudiantes insertados correctamente");
printjson(resultadoVarios);

// 4. Verificar los documentos insertados
print("\n=== NUEVOS ESTUDIANTES ===");

estudiantes.find({
  matricula: { $in: ["005", "006", "007"] }
}).forEach(printjson);

// 5. Contar los estudiantes registrados
print("\nTotal de estudiantes:");
print(estudiantes.countDocuments({}));
