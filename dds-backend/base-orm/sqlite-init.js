// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/clubes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'perfiles'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table perfiles( IdPerfil INTEGER PRIMARY KEY AUTOINCREMENT, Usuario text NOT NULL UNIQUE, Contrasenia text NOT NULL, Permiso text NOT NULL);"
    );
    console.log("tabla perfiles creada!");
    await db.run(
      "insert into perfiles values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'carnetsfamilias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table carnetsfamilias( IdCarnetFamilia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla carnetsfamilias creada!");
    await db.run(
      "insert into carnetsfamilias values	(1,'FUTBOL'),(2,'BASKET'),(3,'VOLEY'),(4,'HOCKEY'),(5,'PADEL'),(6,'TENIS'),(7,'NATACION'),(8,'PATIN'),(9,'EQUITACION'),(10,'GOLF');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'carnets'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table carnets( 
              IdCarnet INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , ValorCuota real
            , CodigoDeBarra
            , IdCarnetFamilia integer
            , FechaAlta text
            , Activo boolean,
            FOREIGN KEY (IdCarnetFamilia) REFERENCES carnetsfamilias(IdCarnetFamilia)
            );`
    );
    console.log("tabla carnets creada!");

    await db.run(
      `insert into carnets values
      (1,'Martin Fernandez',500.00, 'AA000AA', 1, '2017-01-19', 1 ),
      (2,'Paula Martinez',350.00, 'AA000AB', 3, '2018-01-31', 1 ),
      (3,'Yaquelin Juarez',2300.00, 'AA000AC', 5, '2019-01-12', 1 ),
      (4,'Gustavo Demitrosky',3000.00, 'AA001AA', 7, '2020-01-30', 0 ),
      (5,'Beatriz Nuria',3300.00, 'AA001AG', 9, '2021-12-28', 1 ),
      (7,'Domingo Walsh',4800.00, 'AA001AR', 2, '2022-01-01', 1 ),
      (8,'Pablo Fernandez',5200.00, 'AA070YH', 4, '2023-01-18', 1 ),
      (9,'Fernando Brown',5600.00, 'AA070GQ', 6, '2024-02-03', 1 ),
      (10,'Delfina Amsterdam',4800.00, 'AA070WW', 8, '2017-12-25', 1 ),
      (11,'Armando Paredes',4000.00, 'AB054FF', 10, '2016-01-25', 1 ),
      (12,'Arana Matarazzo',3200.00, 'AB059WE', 1, '2018-01-25', 0 ),
      (13,'Mateo Crack',2410.00, 'AB051RT', 3, '2019-02-07', 1 ),
      (14,'Claudio Notari',7200.00, 'AB071LO', 5, '2020-02-06', 1 ),
      (15,'Carla Zurita',6100.00, 'AB078GR', 7, '2021-12-25', 1 ),
      (16,'Cecilia Cuccitinni',3400.00, 'AB074VC', 9, '2022-02-07', 1 ),
      (17,'Kevin Goristiaga',4100.00, 'AB126WS', 2, '2023-12-27', 0 ),
      (18,'Damian Venegas',7000.00, 'AB128IE', 4,'2016-01-08', 1 ),
      (19,'Drista Klarkson',2250.00, 'AB125PZ', 6, '2017-01-23', 1 ),
      (20,'Daniel Alvarado',6100.00, 'AB193LE', 8, '2018-12-30', 1 ),
      (21,'Dardo Estupinan',5500.00, 'AC147ED', 10, '2019-01-23', 1 ),
      (22,'Hernan Tirano',6700.00, 'AC258UV', 1, '2020-01-24', 1 ),
      (23,'Ines Peralta',3200.00, 'AC369HE', 3, '2021-01-17', 1 ),
      (24,'Hugo Barco',1200.00, 'AC789UY', 5, '2022-02-04', 1 ),
      (25,'Jaime Insaurralde',2300.00, 'AC456JD', 7, '2023-01-19', 1 ),
      (26,'Juliana Quiroga',8900.00, 'AC123PK', 9, '2024-02-03', 1 ),
      (27,'Jacinta Ongania',5600.00, 'AC159RW', 2, '2016-12-25', 0 ),
      (28,'Lionel Maradona',10000.00, 'AC951RA', 4, '2017-12-27', 1 ),
      (29,'Luisana Argenti',4400.00, 'AC753JE', 6, '2017-01-26', 1 ),
      (30,'Laura Garcia',6400.00, 'AC357SL', 8, '2018-01-19', 1 ),
      (31,'Mariana Lovato',8100.00, 'AD894EE', 10, '2018-02-01', 1 ),
      (32,'Maria Duarte',8500.00, 'EA854KI', 1, '2019-01-20', 0 ),
      (33,'Marcos David',7400.00, 'ER732KN', 3, '2019-01-07', 1 ),
      (34,'Nancy Pazo',9200.00, 'EP214LP', 5, '2020-01-05', 1 ),
      (35,'Nicefolo Libre',7600.00, 'EG415AS', 7, '2020-01-28', 1 ),
      (36,'Omar Esposito',6200.00, 'EX231KJ', 9, '2021-01-27', 1 ),
      (37,'Paula Palacios',11200.00, 'EK000UE', 2, '2021-01-19', 1 ),
      (38,'Francisco Salome',2600.00, 'EE58611', 4, '2022-02-04', 1 ),
      (39,'Franchesca Kurzawa',8300.00, 'EV343ER', 6, '2022-02-04', 0 ),
      (40,'Lisandro Facciano',9600.00, 'OE684AW', 8, '2023-12-30', 1 ),
      (41,'Gimena Irigoyen',3500.00, 'RG123QW', 10, '2023-02-01', 1 ),
      (42,'Gustavo Iosef',8900.00, 'RT456IO', 1, '2017-01-13', 1 ),
      (43,'Gonzalo Frescolate',13000.00, 'RY789AS', 3, '2017-01-31', 1 ),
      (44,'Graciela Pereyra',11100.00, 'RZ098ZX', 5, '2016-12-25', 0 ),
      (45,'German Garmendia',6200.00, 'RB435LO', 7, '2016-01-07', 1 ),
      (46,'Romina Denver',2500.00, 'RK047HE', 9, '2018-02-03', 1 ),
      (47,'Roberto Musso',2400.00, 'RN832MN', 2, '2018-01-20', 1 ),
      (48,'Tatiana Manzano',11300.00, 'WS215II', 4, '2019-02-07', 1 ),
      (49,'Uriel Transito',12300.00, 'WQ777AS', 6, '2019-01-31', 1 ),
      (50,'Samuel Luque',13500.00, 'VG777TA', 7, '2020-01-26', 0 )
      ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
