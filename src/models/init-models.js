import { DataTypes } from "sequelize";
import _posts from './posts.js'
import _users from './users.js'


export function initModels(sequelize) {
  var posts = _posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  posts.belongsTo(users, { as: "users", foreignKey: "userid"});
  users.hasMany(posts, { as: "posts", foreignKey: "userid"});

  return {
    posts,
    users,
  };
}

