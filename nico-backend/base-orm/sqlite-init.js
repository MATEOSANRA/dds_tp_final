// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/platos.db");
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
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'comidasfamilias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table comidasfamilias( IdTipoComida INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla comidasfamilias creada!");
    await db.run(
      "insert into comidasfamilias values	(1,'Italiana'),(2,'Mexicana'),(3,'China'),(4,'Japonesa'),(5,'India');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'comidas'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table comidas( 
              IdComida INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Precio real
            , IdTipoComida integer
            , Calorias integer
            , FechaPreparado text
            , Vencido boolean,
            FOREIGN KEY (IdTipoComida) REFERENCES comidasfamilias(IdTipoComida)
            );`
    );
    console.log("tabla comidas creada!");

    await db.run(
      `insert into comidas values
      (1,'Lasagna',1500.00, 1, 400,'2017-01-19', 1 ),
      (2,'Pizza',1800.00, 1, 500,'2017-01-31', 1 ),
      (3,'Pasta', 2700.00, 1, 570,'2017-01-12', 1 ),
      (4,'Risotto', 3000.00, 1, 150,'2017-01-30', 1 ),
      (5,'Tiramisú', 3200.00, 1, 300,'2016-12-28', 1 ),
      (6,'Panzerotti', 3500.00, 1, 400,'2016-12-28', 1 ),
      (7,'Gelato', 4800.00, 1, 1000,'2017-01-01', 1 ),
      (8,'Focaccia',5400.00, 1, 700,'2017-01-18', 1 ),
      (9,'Bruschetta',5300.00, 1, 100,'2017-02-03', 1 ),
      (10,'Carpaccio',4800.00, 1, 850,'2016-12-25', 1 ),
      (11,'Tacos', 4200.00, 2, 520,'2017-01-25', 0 ),
      (12,'Burritos', 3700.00, 2, 910,'2017-01-25', 1 ),
      (13,'Enchiladas', 3500.00, 2, 450,'2017-02-07', 1 ),
      (14,'Quesadillas', 4300.00, 2, 330,'2017-02-06', 1 ),
      (15,'Mole poblano', 2800.00, 2, 970,'2016-12-25', 1 ),
      (16,'Guacamole', 4100.00, 2, 640,'2017-02-07', 1 ),
      (17,'Churros', 1600.00, 2, 670,'2016-12-27', 1 ),
      (18,'Margarita', 1800.00, 2, 250,'2017-01-08', 1 ),
      (19,'Horchata', 3500.00, 2, 850,'2017-01-23', 1 ),
      (20,'Tamales', 5100.00, 2, 1030,'2016-12-30', 1 ),
      (21,'Arroz frito', 4200.00, 3, 370,'2017-01-23', 0 ),
      (22,'Pollo agridulce', 4600.00, 3, 310,'2017-01-24', 1 ),
      (23,'Rollitos primavera', 5200.00, 3, 650,'2017-01-17', 1 ),
      (24,'Chow mein', 4200.00, 3, 500,'2017-02-04', 1 ),
      (25,'Wonton soup', 5200.00, 3, 950,'2017-01-19', 1 ),
      (26,'Pato a la pekín', 6100.00, 3, 889,'2017-02-03', 1 ),
      (27,'Dim sum', 6500.00, 3, 480,'2016-12-25', 1 ),
      (28,'Tofu', 3250.00, 3, 580,'2016-12-27', 1 ),
      (29,'Té verde', 5700.00, 3, 730,'2017-01-26', 1 ),
      (30,'Luna llena de arroz', 6300.00, 3, 840,'2017-01-19', 1 ),
      (31,'Sushi', 8000.00, 4, 100,'2017-02-01', 0 ),
      (32,'Sashimi', 7200.00, 4, 650,'2017-01-20', 1 ),
      (33,'Ramen', 7100.00, 4, 860,'2017-01-07', 1 ),
      (34,'Tempura', 9200.00, 4, 500,'2017-01-05', 1 ),
      (35,'Yakitori', 8100.00, 4, 50,'2017-01-28', 0 ),
      (36,'Gyoza', 8300.00, 4, 960,'2017-01-27', 1 ),
      (37,'Udon', 9600.00, 4, 570,'2017-01-19', 1 ),
      (38,'Mochi', 9500.00, 4, 800,'2017-02-04', 1 ),
      (39,'Matcha', 8500.00, 4, 190,'2017-02-04', 1 ),
      (40,'Curry japonés', 9600.00, 4, 690,'2016-12-30', 1 ),
      (41,'Butter chicken', 10300.00, 5, 910,'2017-02-01', 1 ),
      (42,'Tikka masala', 8000.00, 5, 140,'2017-01-13', 1 ),
      (43,'Naan', 13000.00, 5, 240,'2017-01-31', 1 ),
      (44,'Chana masala', 1300.00, 5, 140,'2016-12-25', 1 ),
      (45,'Samosas', 12200.00, 5, 350,'2017-01-07', 0 ),
      (46,'Biryani', 10600.00, 5, 560,'2017-02-03', 1 ),
      (47,'Dal makhani', 13200.00, 5, 600,'2017-01-20', 1 ),
      (48,'Lassi', 11900.00, 5, 310,'2017-02-07', 1 ),
      (49,'Kulfi', 10200.00, 5, 530,'2017-01-31', 1 ),
      (50,'Chai', 20100.00, 5, 360,'2017-01-26', 1 )
      ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;

