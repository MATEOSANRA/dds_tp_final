// Configuramos ORM Sequelize
const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite:" + process.env.base);
const sequelize = new Sequelize("sqlite:" + "./.data/clubes.db");

// ######################### TO DO: Agregar HOOKS a los modelos para validar los datos
// Definimos los modelos

/****************/
/* TABLAS MATEO */
/****************/
const Ligas = sequelize.define(
  "ligas",
  {
    IdLiga: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del autor es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas los nombres de las ligas
    hooks: {
      beforeValidate: function (liga, options) {
        if (typeof liga.Nombre === "string") {
          liga.Nombre = liga.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);


//
const Clubes = sequelize.define(
  "clubes",
  {
    IdClub: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del Club es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaFundacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha es requerido",
        }
      }
    },
    IdLiga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Abono: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Abono es requerido",
        },
      },
    },
    Abierto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Abierto es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
//

/****************/
/* TABLAS PABLO */
/****************/
const Provincias = sequelize.define(
  "provincias",
  {
    IdProvincia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la provincia es requerido",
        },
        len: {
          args: [5, 50],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 50 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas los nombres de las provincias
    hooks: {
      beforeValidate: function (liga, options) {
        if (typeof liga.Nombre === "string") {
          liga.Nombre = liga.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);


//
const Estadios = sequelize.define(
  "estadios",
  {
    IdEstadio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Nombre del estadio es requerido",
        },
        len: {
          args: [5, 50],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 50 de longitud",
        },
      },
    },
    Capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La Capacidad del estadio es requerido",
        },
        isInt: {
          args: true,
          msg: "La Capacidad debe ser un número entero",
        },
      },
    },
    FechaInauguracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de inauguracion es requerido",
        }
      }
    },
    Coste: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Coste es requerido",
        },
      },
    },
    IdProvincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El estado del estadio es requerido es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);



module.exports = {
  sequelize,
  Clubes,
  Ligas,
  Estadios,
  Provincias
};
