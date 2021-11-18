const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: 3306,
  database: process.env.DB_NAME,
  username: process.env.USER_ID,
  password: process.env.USER_KEY,
  dialect: 'mysql',
  define: {
    timestamps: true
  }
});

sequelize.define(
	'events',
	{
    session_id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
    },
    ip: DataTypes.STRING(15),
		name: DataTypes.STRING,
		variant: DataTypes.INTEGER,
		value: DataTypes.INTEGER,
	},
	{
		tableName: 'events' 
	}
)
sequelize.models.events.sync();

exports.sequelize = sequelize;
