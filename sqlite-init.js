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


  /* TABLAS ESTADIOS Y PROVINCIAS */
  existe = false;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'provincias'", // Consultamos si la tabla ligas existe
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE TABLE provincias (IdProvincia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE);"
    );
    console.log('Tabla Provincias creada');
    await db.run(
      `INSERT INTO provincias VALUES
            (1, 'Buenos Aires'),
            (2, 'Córdoba'),
            (3, 'Santa Fe'),
            (4, 'Ciudad Autónoma de Buenos Aires'),
            (5, 'Entre Ríos'),
            (6, 'Mendoza'),
            (7, 'San Juan'),
            (8, 'Río Negro'),
            (9, 'Neuquén'),
            (10, 'Chubut'),
            (11, 'La Pampa'),
            (12, 'San Luis'),
            (13, 'Corrientes'),
            (14, 'Chaco'),
            (15, 'Formosa'),
            (16, 'Misiones'),
            (17, 'Jujuy'),
            (18, 'Salta'),
            (19, 'Tucumán'),
            (20, 'Santiago del Estero')`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'estadios'", // Consultamos si la tabla estadios existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla estadios existe, seteamos existe en true
  if (!existe) {
    await db.run(
      `CREATE TABLE estadios (IdEstadio INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE,
        Capacidad INTEGER NOT NULL,
        FechaInauguracion STRING NOT NULL,
        Abono REAL NOT NULL,
        Activo boolean NOT NULL,
        FOREIGN KEY (IdProvincia) REFERENCES provincias(IdProvincias));`
    );
    //console.log('Tabla Estadios creada');
    await db.run(
      `INSERT INTO estadios VALUES
        (1, 'Monumental Antonio Vespucio Liberti', 70844, '1936-06-06', 1200.00, 4, 0),
        (2, 'José Amalfitani', 49500, '1949-06-11', 800.00, 4, 1),
        (3, 'Mario Alberto Kempes', 57289, '1978-10-25', 950.00, 3, 1),
        (4, 'Presidente Perón', 49700, '2008-02-03', 750.00, 4, 1),
        (5, 'La Bombonera', 49000, '1940-04-03', 1000.00, 4, 1),
        (6, 'Malvinas Argentinas', 42000, '1978-10-25', 600.00, 3, 0),
        (7, 'Gigante de Arroyito', 41654, '1963-06-16', 550.00, 2, 0),
        (8, 'Jardín de Infantes', 23500, '1999-09-26', 400.00, 2, 1),
        (9, 'Nuevo Gasómetro', 16300, '2013-02-16', 350.00, 4, 1),
        (10,'Pedro Carmona Sarmiento', 23500, '2008-04-25', 450.00, 2, 1),
        (11,'Juan Gilberto Funes', 25000, '1987-02-07', 300.00, 3, 1),
        (12,'La Ciudadela', 30000, '1931-07-25', 400.00, 3, 1),
        (13,'25 de Mayo', 17000, '1973-09-09', 250.00, 2, 1),
        (14,'Monumental José Fierro', 33500, '1938-05-20', 500.00, 21, 1),
        (15,'Padre Ernesto Martearena', 25000, '2001-02-17', 350.00, 22, 1),
        (16,'Juan Domingo Perón', 30000, '2000-07-19', 450.00, 18, 1),
        (17,'Mario Alberto Kempes (Catamarca)', 16000, '1978-10-25', 250.00, 21, 1),
        (18,'Felipe Barraza', 18000, '1986-06-29', 300.00, 14, 1),
        (19,'Carlos Augusto Mercado', 17000, '1978-10-25', 250.00, 23, 1),
        (20,'Centeno', 27500, '1969-07-20', 400.00, 11, TRUE),
        (21,'Tomás Adolfo Ducó', 19000, '1971-10-02', 300.00, 4, 1),
        (22,'José María Minella', 25000, '1974-09-02', 350.00, 11, 1),
        (23,'Alfredo Beranger', 25000, '1991-04-28', 350.00, 19, 1)`
    )
  }
  console.log('Base de datos estadios creada');
  db.close(); // Cerramos la base de datos
}

CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste