const { DataTypes } = require("sequelize");

const IntegerType = {
  type: DataTypes.INTEGER,
  allowNull: false,
};

const DecimalType = {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
};

const OptionalDecimalType = {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
  defaultValue: 0,
};

const DateType = {
  type: DataTypes.DATE,
  allowNull: false,
};

const BooleanType = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
};

const ReferenceType = (model) => ({
  ...IntegerType,
  references: {
    model,
    key: "id",
  },
});

const OptionalReferenceType = (model) => ({
  ...IntegerType,
  references: {
    model,
    key: "id",
  },
  allowNull: true,
});

const CriadoAsType = {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: DataTypes.NOW,
};

const OptionalString = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "",
};

module.exports = {
  IntegerType,
  DecimalType,
  OptionalDecimalType,
  ReferenceType,
  DateType,
  BooleanType,
  OptionalReferenceType,
  CriadoAsType,
  OptionalString,

};
