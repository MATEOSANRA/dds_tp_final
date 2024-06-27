const db = require("aa-sqlite"); // Accedemos a la base usando aa-sqlite

async function CrearBaseSiNoExiste() {
  await db.open("./.data/clubes.db"); // Abrimos la base de datos
  // await db.open(process.env.base);
  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      `INSERT INTO usuarios values
              (1,'admin','123','admin'),
              (2,'juan','123','member');`
    );
  }
  //
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'ligas'", // Consultamos si la tabla ligas existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla ligas existe, seteamos existe en true
  if (!existe) {
    // Si la tabla ligas no existe, la creamos
    await db.run(
      "CREATE TABLE ligas (IdLiga INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE);"
    );
    console.log('Tabla ligas creada');
    await db.run(
      `INSERT INTO ligas VALUES
            (1, 'Primera Division'),
            (2, 'Primera Nacional'),
            (3, 'Primera B'),
            (4, 'Federal A'),
            (5, 'Primera C'),
            (6, 'Torneo Regional Federal Amateur'),
            (7, 'Torneo Promocional Amateur'),
            (8, 'Liga Provincial'),
            (9, 'Liga Regional'),
            (10, 'Sin Liga')
            ;`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'clubes'", // Consultamos si la tabla ligas existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla clubes existe, seteamos existe en true
  if (!existe) {
    // Si la tabla libros no existe, la creamos
    await db.run(
      `CREATE TABLE clubes (IdClub INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE,
        FechaFundacion TEXT,
        IdLiga INTEGER,
        Abono real,
        Abierto boolean,
        FOREIGN KEY (IdLiga) REFERENCES ligas(IdLiga));`
    );
    //console.log('Tabla clubes creada');
    await db.run(
      // Insertamos libros en la tabla libros
      `INSERT INTO clubes VALUES
       (1, "River Plate", "25/05/1901", 1, 25000.00, 1),
       (2, "Boca Juniors", "03/04/1905", 1, 28000.00, 1),
       (3, "Independiente", "01/01/1905", 1, 22000.00, 1),
       (4, "Racing Club", "25/03/1903", 1, 21000.00, 1),
       (5, "San Lorenzo de Almagro", "01/07/1908", 1, 18000.00, 1),
       (6, "Vélez Sarsfield", "06/08/1913", 1, 17000.00, 1),
       (7, "Estudiantes de La Plata", "04/08/1905", 1, 16000.00, 1),
       (8, "Gimnasia y Esgrima La Plata", "03/06/1887", 1, 15000.00, 1),
       (9, "Newell's Old Boys", "03/08/1905", 1, 14000.00, 1),
       (10, "Rosario Central", "27/12/1889", 1, 13000.00, 1),
       (11, "Olimpo de Bahía Blanca", "20/02/1912", 2, 12000.00, 1),
       (12, "Agropecuario Argentino", "11/11/1989", 2, 11000.00, 1),
       (13, "Deportivo Madryn", "22/06/1979", 2, 10000.00, 1),
       (14, "Atlético San Martín de San Juan", "25/05/1908", 3, 9000.00, 1),
       (15, "Estudiantes de Río Cuarto", "11/01/1911", 3, 8000.00, 1),
       (16, "Gimnasia y Esgrima Mendoza", "18/09/1907", 3, 7000.00, 1),
       (17, "Independiente Chivilcoy", "22/02/1922", 4, 6000.00, 1),
       (18, "Sportivo Patria", "28/08/1923", 4, 5000.00, 1),
       (19, "Deportivo Español", "03/06/1898", 5, 4000.00, 0),
       (20, "Club Atlético Alumni", "01/01/1891", 5, 3000.00, 0);`
    );
  }

  console.log('Base de datos clubes creada');
  db.close(); // Cerramos la base de datos
}
CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste