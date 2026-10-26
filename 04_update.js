
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 04_update.js
  OPERACIÓN: UPDATE

  Objetivo:
  Modificar uno o varios documentos
  utilizando MQL.
*/

// 1. Seleccionar la base de datos
const universidad = db.getSiblingDB("universidad");
const estudiantes = universidad.getCollection("estudiantes");

print("=== OPERACIÓN UPDATE ===");

// 2. Mostrar el estudiante antes del cambio
print("\n1. ANA ANTES DE LA ACTUALIZACIÓN");

printjson(
  estudiantes.findOne({ matricula: "001" })
);

// 3. UPDATE ONE: Modificar un documento
print("\n2. ACTUALIZAR SEMESTRE DE ANA");

const resultadoUno = estudiantes.updateOne(
  { matricula: "001" },
  { $set: { semestre: 3 } }
);

printjson(resultadoUno);

// 4. Verificar el cambio
print("\n3. ANA DESPUÉS DE LA ACTUALIZACIÓN");

printjson(
  estudiantes.findOne({ matricula: "001" })
);

// 5. Mostrar estudiantes antes del cambio masivo
print("\n4. ESTUDIANTES DE SISTEMAS ANTES DEL CAMBIO");

estudiantes.find(
  { carrera: "Sistemas" },
  { _id: 0, nombre: 1, semestre: 1 }
).forEach(printjson);

// 6. UPDATE MANY: Modificar varios documentos
print("\n5. INCREMENTAR UN SEMESTRE A ESTUDIANTES DE SISTEMAS");

const resultadoVarios = estudiantes.updateMany(
  { carrera: "Sistemas" },
  { $inc: { semestre: 1 } }
);

printjson(resultadoVarios);

// 7. Verificar los cambios
print("\n6. ESTUDIANTES DE SISTEMAS ACTUALIZADOS");

estudiantes.find(
  { carrera: "Sistemas" },
  { _id: 0, nombre: 1, semestre: 1 }
).forEach(printjson);

// 8. Mostrar cantidad de estudiantes
print("\n7. TOTAL DE ESTUDIANTES");

print(estudiantes.countDocuments({}));

print("\n=== ACTUALIZACIONES FINALIZADAS ===");
