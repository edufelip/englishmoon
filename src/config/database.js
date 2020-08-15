require('dotenv').config()

module.exports = {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,       // createdat e updatedat automaticos
        underscored: true,      // usa formato snake case
    },
};