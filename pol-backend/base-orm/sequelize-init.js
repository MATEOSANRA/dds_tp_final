// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/viajes.db");

// definicion del modelo de datos
const provincias = sequelize.define(
  "provincias",
  {
    IdProvincia: {
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
      beforeValidate: function (provincia, options) {
        if (typeof provincia.Nombre === "string") {
          provincia.Nombre = provincia.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const destinos = sequelize.define(
  "destinos",
  {
    Nombre: {
      type: DataTypes.STRING(60),
      primaryKey: true,
      validate: {
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        }
      }
    },
    Altura: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Altura es requerido",
        }
      }
    },
    IdProvincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdProvincia es requerido",
        }
      }
    },
    FechaMV: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Mas Visitada es requerido",
        }
      }
    },
    Abierto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Abierto es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (destino, options) {
        if (typeof destino.Nombre === "string") {
          destino.Nombre = destino.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
  sequelize,
  provincias,
  destinos,
};
