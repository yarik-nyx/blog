import { Sequelize } from "sequelize";
export default function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    viewcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'posts',
    schema: 'public',
    timestamps: true
  });
};
