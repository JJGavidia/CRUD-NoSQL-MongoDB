
/*
  PROYECTO: CRUD NoSQL con MongoDB
  ARCHIVO: 06_verificacion.js

  Objetivo:
  Verificar los resultados finales
  de las operaciones CRUD.
*/

// 1. Seleccionar la base de datos
const universidad = db.getSiblingDB("universidad");
const estudiantes = universidad.getCollection("estudiantes");

print("=== VERIFICACIÓN GENERAL DEL CRUD ===");

let pruebasCorrectas = 0;
let pruebasFallidas = 0;

// Función para comprobar cada resultado
function verificar(descripcion, condicion) {
  if (condicion) {
    print("CORRECTO: " + descripcion);
    pruebasCorrectas++;
  } else {
    print("ERROR: " + descripcion);
    pruebasFallidas++;
  }
}

// 2. Comprobar cantidad final de documentos
verificar(
  "Existen exactamente 4 estudiantes",
  estudiantes.countDocuments({}) === 4
);

// 3. Comprobar estudiantes existentes
print("\n=== VERIFICAR ESTUDIANTES ===");

const esperados = [
  { matricula: "001", nombre: "Ana", semestre: 4 },
  { matricula: "002", nombre: "Luis", semestre: 4 },
  { matricula: "005", nombre: "Sofia", semestre: 3 },
  { matricula: "007", nombre: "Laura", semestre: 4 }
];

esperados.forEach(function(esperado) {
  const encontrado = estudiantes.findOne({
    matricula: esperado.matricula
  });

  verificar(
    esperado.nombre + " existe con semestre " + esperado.semestre,
    encontrado !== null &&
    encontrado.nombre === esperado.nombre &&
    encontrado.semestre === esperado.semestre &&
    encontrado.carrera === "Sistemas"
  );
});

// 4. Comprobar documentos eliminados
print("\n=== VERIFICAR ELIMINACIONES ===");

["004", "003", "006"].forEach(function(matricula) {
  verificar(
    "La matrícula " + matricula + " fue eliminada",
    estudiantes.countDocuments({ matricula: matricula }) === 0
  );
});

// 5. Comprobar que no hay estudiantes de Industrial
verificar(
  "No quedan estudiantes de Industrial",
  estudiantes.countDocuments({ carrera: "Industrial" }) === 0
);

// 6. Mostrar los documentos finales
print("\n=== DOCUMENTOS FINALES ===");

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

// 7. Resumen
print("\n=== RESULTADO DE LAS PRUEBAS ===");
print("Pruebas correctas: " + pruebasCorrectas);
print("Pruebas fallidas: " + pruebasFallidas);

if (pruebasFallidas === 0) {
  print("RESULTADO FINAL: TODAS LAS PRUEBAS PASARON");
} else {
  print("RESULTADO FINAL: HAY RESULTADOS POR REVISAR");
  quit(1);
}
