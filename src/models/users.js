// Users
export default (sequelize, DataTypes) => {
  return sequelize.define('users', {
    email: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING }
  });
};