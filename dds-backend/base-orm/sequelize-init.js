// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/clubes.db");

// definicion del modelo de datos
const carnetsfamilias = sequelize.define(
  "carnetsfamilias",
  {
    IdCarnetFamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (carnetfamilia, options) {
        if (typeof carnetfamilia.Nombre === "string") {
          carnetfamilia.Nombre = carnetfamilia.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const carnets = sequelize.define(
  "carnets",
  {
    IdCarnet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "Este nombre ya existe en la tabla!",
      },
    },
    ValorCuota: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El valor de la cuota es requerido",
        }
      }
    },
    CodigoDeBarra: {
        type: DataTypes.STRING(7), // Cambiamos el tipo de dato a STRING(7)
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Codigo De Barra es requerido",
          },
          is: {
            args: ["^[A-Z]{2}[0-9]{3}[A-Z]{2}$", "i"], // Expresión regular para el formato AA000AA
            msg: "Codigo de Barra debe tener el formato AA000AA (2 letras, 3 números y 2 letras)",
          },
        },
      },
    IdCarnetFamilia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdCarnetFamilia es requerido",
        }
      }
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (carnet, options) {
        if (typeof carnet.Nombre === "string") {
          carnet.Nombre = carnet.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
  sequelize,
  carnetsfamilias,
  carnets,
};

