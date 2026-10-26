
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 05_delete.js
  OPERACIÓN: DELETE

  Objetivo:
  Eliminar uno o varios estudiantes
  utilizando filtros de MQL.
*/

// 1. Seleccionar la base de datos
const universidad = db.getSiblingDB("universidad");
const estudiantes = universidad.getCollection("estudiantes");

print("=== OPERACIÓN DELETE ===");

// 2. Contar los estudiantes antes de eliminar
print("\n1. TOTAL ANTES DE ELIMINAR");
print(estudiantes.countDocuments({}));

// 3. Mostrar el estudiante que vamos a eliminar
print("\n2. BUSCAR A CARLOS");

printjson(
  estudiantes.findOne({ matricula: "004" })
);

// 4. DELETE ONE: Eliminar un documento
print("\n3. ELIMINAR A CARLOS");

const resultadoUno = estudiantes.deleteOne({
  matricula: "004"
});

printjson(resultadoUno);

// 5. Verificar que Carlos ya no existe
print("\n4. VERIFICAR ELIMINACIÓN DE CARLOS");

const carlos = estudiantes.findOne({
  matricula: "004"
});

if (carlos === null) {
  print("Carlos ya no existe en la colección.");
} else {
  print("Carlos todavía existe.");
}

// 6. Mostrar estudiantes de Industrial
print("\n5. ESTUDIANTES DE INDUSTRIAL ANTES DE ELIMINAR");

estudiantes.find(
  { carrera: "Industrial" },
  { _id: 0, matricula: 1, nombre: 1 }
).forEach(printjson);

// 7. DELETE MANY: Eliminar varios documentos
print("\n6. ELIMINAR ESTUDIANTES DE INDUSTRIAL");

const resultadoVarios = estudiantes.deleteMany({
  carrera: "Industrial"
});

printjson(resultadoVarios);

// 8. Verificar que ya no hay estudiantes de Industrial
print("\n7. ESTUDIANTES DE INDUSTRIAL RESTANTES");

print(
  estudiantes.countDocuments({ carrera: "Industrial" })
);

// 9. Mostrar los documentos restantes
print("\n8. ESTUDIANTES RESTANTES");

estudiantes.find(
  {},
  {
    _id: 0,
    matricula: 1,
    nombre: 1,
    carrera: 1,
    semestre: 1
  }
).sort({ matricula: 1 }).forEach(printjson);

// 10. Contar documentos finales
print("\n9. TOTAL FINAL DE ESTUDIANTES");

print(estudiantes.countDocuments({}));

print("\n=== OPERACIÓN DELETE FINALIZADA ===");
