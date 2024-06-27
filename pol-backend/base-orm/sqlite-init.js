// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/viajes.db");
  //await db.open(process.env.base);

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
      "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'provincias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table provincias( IdProvincia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("Tabla Provincias creada!");
    await db.run(
      "insert into provincias values    (1,'CHACO'),(2,'CORDOBA'),(3,'SANTA FE'),(4,'MENDOZA'),(5,'NEUQUEN'),(6,'SALTA'),(7,'JUJUY'),(8,'RIO NEGRO'),(9,'BUENOS AIRES'),(10,'MISIONES');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'destinos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table destinos( 
              Nombre text PRIMARY KEY NOT NULL UNIQUE
            , Altura real
            , IdProvincia integer
            , FechaMV text
            , Abierto boolean,
            FOREIGN KEY (IdProvincia) REFERENCES provincias(IdProvincia)
            );`
    );
    console.log("Tabla destinos creada!");

    await db.run(
      `insert into destinos values
      ('Parque Nacional El Impenetrable', 250.00, 1, '2017-01-19', 1 ),
      ('Isla del Cerrito', 50.00, 1, '2017-01-31', 1 ),
      ('Parque Nacional Chaco', 300.00, 1, '2017-01-12', 1 ),
      ('Campo del Cielo', 250.00, 1, '2017-01-30', 1 ),
      ('Termas de Sáenz Peña', 160.00, 1, '2016-12-28', 1 ),
      ('Villa Carlos Paz', 661.00, 2, '2017-01-01', 1 ),
      ('Traslasierra', 2000.00, 2, '2017-01-18', 1 ),
      ('Valle de Calamuchita', 1500.00, 2, '2017-02-03', 1 ),
      ('Córdoba Capital', 433.00, 2, '2016-12-25', 1 ),
      ('Mina Clavero', 780.00, 2, '2017-01-25', 1 ),
      ('Ciudad de Santa Fe', 53.00, 3,'2017-01-25', 1 ),
      ('Parque Nacional Cayastá', 80.00, 3,'2017-02-07', 1 ),
      ('Reserva Natural El Espinal', 100.00, 3,'2017-02-06', 1 ),
      ('Moisés Ville', 85.00, 3,'2016-12-25', 1 ),
      ('Rosario', 25.00, 3,'2017-02-07', 1 ),
      ('Ciudad de Mendoza', 746.00, 4,'2016-12-27', 1 ),
      ('Ruta del Vino', 1000.00, 4,'2017-01-08', 1 ),
      ('Alto El Peñón', 1850.00, 4,'2017-01-23', 1 ),
      ('Parque Provincial Aconcagua', 6962.00, 4,'2016-12-30', 1 ),
      ('Cañón del Atuel', 1500.00, 4,'2017-01-23', 1 ),
      ('Ruta de los 7 Lagos', 1600.00, 5,'2017-01-24', 1 ),
      ('Villa La Angostura', 860.00, 5,'2017-01-17', 1 ),
      ('San Martín de los Andes', 677.00, 5,'2017-02-04', 1 ),
      ('Parque Nacional Lanín', 3779.00, 5,'2017-01-19', 1 ),
      ('Neuquén Capital', 270.00, 5,'2017-02-03', 1 ),
      ('Quebrada de Humahuaca', 4000.00, 6,'2016-12-25', 1 ),
      ('Cafayate', 1628.00, 6,'2016-12-27', 1 ),
      ('Cachi', 2750.00, 6,'2017-01-26', 1 ),
      ('Salta Capital', 1187.00, 6,'2017-01-19', 1 ),
      ('Parque Nacional Los Cardones', 5000.00, 6,'2017-02-01', 1 ),
      ('Quebrada de Humahuaca Jujeña', 4000.00, 7,'2017-01-20', 1 ),
      ('Cerro de Siete Colores', 4920.00, 7,'2017-01-07', 1 ),
      ('Salinas Grandes', 3400.00, 7,'2017-01-05', 1 ),
      ('Purmamarca', 2370.00, 7,'2017-01-28', 1 ),
      ('Humahuaca', 2465.00, 7,'2017-01-27', 1 ),
      ('Bariloche', 800.00, 8,'2017-01-19', 1 ),
      ('San Carlos de Bariloche', 800.00, 8,'2017-02-04', 1 ),
      ('Circuito Chico', 1000.00, 8,'2017-02-04', 1 ),
      ('Isla Victoria y Bosque de Arrayanes', 800.00, 8,'2016-12-30', 1 ),
      ('Las Grutas', 20.00, 8,'2017-02-01', 1 ),
      ('Teatro Colón', 26.00, 9,'2017-01-13', 1 ),
      ('Caminito', 17.00, 9,'2017-01-31', 1 ),
      ('Floralis Genérica', 21.00, 9,'2016-12-25', 1 ),
      ('Jardín Japonés', 19.00, 9,'2017-01-07', 1 ),
      ('Puente de la Mujer', 9.00, 9,'2017-02-03', 1 ),
      ('Cataratas del Iguazú', 60.00, 10,'2017-01-20', 1 ),
      ('Ruinas de San Ignacio Miní', 230.00, 10,'2017-02-07', 1 ),
      ('Parque Nacional Misiones', 500.00, 10,'2017-01-31', 1 ),
      ('Saltos del Mocona', 180.00, 10,'2017-01-26', 1 ),
      ('Ruta de la Yerba Mate', 300.00, 10,'2017-01-06', 1 )
      ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
