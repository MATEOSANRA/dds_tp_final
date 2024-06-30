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





  // TABLAS DE LIGAS Y EQUIPOS


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
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'clubes'", // Consultamos si la tabla clubes existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla clubes existe, seteamos existe en true
  if (!existe) {
    // Si la tabla clubes no existe, la creamos
    await db.run(
      `CREATE TABLE clubes (IdClub INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE,
        FechaFundacion STRING,
        IdLiga INTEGER,
        Abono real,
        Abierto boolean,
        FOREIGN KEY (IdLiga) REFERENCES ligas(IdLiga));`
    );
    console.log('Tabla clubes creada');
    await db.run(
      // Insertamos clubes en la tabla clubes
      `INSERT INTO clubes VALUES
       (1, "River Plate", "1901-05-25", 1, 25000.00, 1),
       (2, "Boca Juniors", "1905-04-03", 1, 28000.00, 1),
       (3, "Independiente", "1905-01-01", 1, 22000.00, 1),
       (4, "Racing Club", "1903-03-25", 1, 21000.00, 1),
       (5, "San Lorenzo de Almagro", "1908-07-01", 1, 18000.00, 1),
       (6, "Vélez Sarsfield", "1913-08-06", 1, 17000.00, 1),
       (7, "Estudiantes de La Plata", "1905-08-04", 1, 16000.00, 1),
       (8, "Gimnasia y Esgrima La Plata", "1887-06-03", 1, 15000.00, 1),
       (9, "Newell's Old Boys", "1905-08-03", 1, 14000.00, 1),
       (10, "Rosario Central", "1889-12-27", 1, 13000.00, 1),
       (11, "Olimpo de Bahía Blanca", "1912-02-20", 2, 12000.00, 1),
       (12, "Agropecuario Argentino", "1989-11-11", 2, 11000.00, 1),
       (13, "Deportivo Madryn", "1979-06-22", 2, 10000.00, 1),
       (14, "Atlético San Martín de San Juan", "1908-05-25", 3, 9000.00, 1),
       (15, "Estudiantes de Río Cuarto", "1911-01-1", 3, 8000.00, 1),
       (16, "Gimnasia y Esgrima Mendoza", "1907-09-18", 3, 7000.00, 1),
       (17, "Independiente Chivilcoy", "1922-02-22", 4, 6000.00, 1),
       (18, "Sportivo Patria", "1923-08-28", 4, 5000.00, 1),
       (19, "Deportivo Español", "1898-06-03", 5, 4000.00, 0),
       (20, "Club Atlético Alumni", "1891-01-01", 5, 3000.00, 0);`
    );
  }





// TABLAS DE JUGADORES Y POSICIONES

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'posiciones'", // Consultamos si la tabla posiciones existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla posiciones existe, seteamos existe en true
  if (!existe) {
    // Si la tabla posiciones no existe, la creamos
    await db.run(
      "CREATE TABLE posiciones (IdPosicion INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE);"
    );
    console.log('Tabla posiciones creada');
    await db.run(
      `INSERT INTO posiciones VALUES
            (0, 'Arquero'),
            (1, 'Defensor'),
            (2, 'Mediocampista'),
            (3, 'Delantero')
            ;`
    );
  }



  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'jugadores'", // Consultamos si la tabla ligas existe
    []
  );
  if (res.contar > 0) existe = true; // Si la tabla clubes existe, seteamos existe en true
  if (!existe) {
    // Si la tabla jugadores no existe, la creamos
    await db.run(
      `CREATE TABLE jugadores (IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre TEXT NOT NULL UNIQUE,
        FechaNacimiento STRING,
        IdPosicion INTEGER,
        Retirado boolean,
        FOREIGN KEY (IdPosicion) REFERENCES posiciones(IdPosicion));`
    );
    console.log('Tabla jugadores creada');
    await db.run(
      `INSERT INTO jugadores VALUES
       (1, 'Lionel Messi', '1987-06-24', 3, 1),
       (2, 'Diego Maradona', '1960-10-30', 2, 0),
       (3, 'Gabriel Batistuta', '1969-06-01', 3, 0),
       (4, 'Sergio Agüero', '1988-06-02', 3, 0),
       (5, 'Juan Román Riquelme', '1978-06-24', 2, 0),
       (6, 'Javier Zanetti', '1973-08-19', 1, 0),
       (7, 'Daniel Passarella', '1953-05-16', 1, 0),
       (8, 'Roberto Ayala', '1973-03-14', 1, 0),
       (9, 'Oscar Ruggeri', '1962-01-30', 1, 0),
       (10, 'Mario Kempes', '1954-07-05', 3, 0),
       (11, 'Ángel Di María', '1988-05-31', 2, 1),
       (12, 'Paulo Dybala', '1995-11-21', 3, 1),
       (13, 'Leandro Paredes', '1994-06-29', 2, 1),
       (14, 'Rodrigo De Paul', '1994-05-24', 2, 1),
       (15, 'Lautaro Martínez', '1997-03-22', 3, 1),
       (16, 'Julián Álvarez', '2000-01-31', 3, 1),
       (17, 'Lisandro Martínez', '1998-01-24', 1, 1),
       (18, 'Cristian Romero', '2000-03-27', 1, 1),
       (19, 'Germán Pezzella', '1991-11-10', 1, 1),
       (20, 'Emiliano Martínez', '1992-01-02', 0, 1);`
    );
  }



// TABLAS DE ESTADIOS Y PROVINCIAS



existe = false;
res = await db.get(
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'estadios'", // Consultamos si la tabla ligas existe
  []
);
if (res.contar > 0) existe = true; // Si la tabla clubes existe, seteamos existe en true
if (!existe) {
  // Si la tabla estadios no existe, la creamos
  await db.run(
    `CREATE TABLE estadios (IdEstadio INTEGER PRIMARY KEY AUTOINCREMENT, 
    Nombre TEXT NOT NULL UNIQUE,
    Capacidad INTEGER NOT NULL,
    FechaInauguracion STRING NOT NULL,
    Abono REAL NOT NULL,
    IdProvincia,
    Activo boolean NOT NULL,
    FOREIGN KEY (IdProvincia) REFERENCES provincias(IdProvincia));`
  );
  console.log('Tabla estadios creada');
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
        (23,'Alfredo Beranger', 25000, '1991-04-28', 350.00, 19, 1);`
  );
}



existe = false;
res = await db.get(
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'provincias'", // Consultamos si la tabla posiciones existe
  []
);
if (res.contar > 0) existe = true; // Si la tabla provincias existe, seteamos existe en true
if (!existe) {
  // Si la tabla provincias no existe, la creamos
  await db.run(
    "CREATE TABLE provincias (IdProvincia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT NOT NULL UNIQUE);"
  );
  console.log('Tabla provincias creada');
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
            (20, 'Santiago del Estero')
          ;`
  );
}




  console.log('Base de datos clubes creada');
  db.close(); // Cerramos la base de datos
}
CrearBaseSiNoExiste(); // Ejecutamos la función CrearBaseSiNoExiste
module.exports = CrearBaseSiNoExiste; // Exportamos la función CrearBaseSiNoExiste
