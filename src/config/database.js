module.exports = {
    dialect: 'mariadb',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'nodesql',
    
    // dialect: 'postgres',
    // host: 'motty.db.elephantsql.com',
    // username: 'epytbhxz',
    // password: 'EnWzW59MDdWWI6Fembv6z8r_Rzdt_faK',
    // database: 'epytbhxz',
    
    define: {
        timestamps: true,       // createdat e updatedat automaticos
        underscored: true,      // usa formato snake case
    },
};