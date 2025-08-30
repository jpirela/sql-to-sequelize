// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { format } from 'sql-formatter';

dotenv.config();

const connections = new Map();
const NODE_ENV = process.env.NODE_ENV || 'development';

const createDatabaseConnection = (dbName) => {
  const { 
    DB_USER, 
    DB_PORT, 
    DB_PASSWORD, 
    IP_PRODUCTION, 
    IP_DEVELOPMENT, 
    MODE_ENV, 
    DB_NAME 
  } = process.env;
  
  const host = MODE_ENV === 'production' ? IP_PRODUCTION : IP_DEVELOPMENT;
  const database = dbName || DB_NAME;

  if (!database) {
    throw new Error('Database name is required');
  }

  // PostgreSQL connection URL
  const databaseUrl = `postgresql://${DB_USER}:${DB_PASSWORD}@${host}:${DB_PORT}/${database}`;

  const logSql = (msg) => {
    try {
      // Only format actual SQL queries
      if (!msg.startsWith('Executing')) {
        return console.log(`\n[Sequelize]: ${msg}`);
      }

      const cleanMsg = msg.replace(/^Executing \(.*?\): /, '');
      const formatted = format(cleanMsg, { language: 'postgresql', tabWidth: 2 });
      console.log(`[Sequelize PostgreSQL]:\n${formatted}`);
    } catch (err) {
      // Fallback to raw message if formatting fails
      console.log(`[Sequelize Raw]: ${msg}`);
    }
  };

  const sequelizeOptions = {
    dialect: 'postgres',
    logging: NODE_ENV === 'development' ? logSql : false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    dialectOptions: {
      ssl: MODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false,
      connectTimeout: 60000,
      requestTimeout: 60000
    },
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true
    },
    benchmark: NODE_ENV === 'development',
    retry: {
      match: [
        /ECONNRESET/,
        /ENOTFOUND/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /CONNECTION_REFUSED/,
        /CONNECTION_LOST/,
        /PROTOCOL_CONNECTION_LOST/
      ],
      max: 3
    },
    timezone: '+00:00' // UTC timezone for PostgreSQL
  };

  return new Sequelize(databaseUrl, sequelizeOptions);
};

const getDatabaseConnection = (dbName) => {
  const database = dbName || process.env.DB_NAME;

  if (!database) {
    throw new Error('Database name must be provided');
  }

  if (!connections.has(database)) {
    const connection = createDatabaseConnection(database);
    connections.set(database, connection);
    
    // Add connection event listeners
    connection.authenticate()
      .then(() => {
        console.log(`✅ Database connection for '${database}' established`);
      })
      .catch((error) => {
        console.error(`❌ Database connection for '${database}' failed:`, error.message);
      });
  }

  return connections.get(database);
};

// Gracefully close all connections
export const closeAllConnections = async () => {
  const promises = Array.from(connections.values()).map(async (connection) => {
    try {
      await connection.close();
      console.log('🔌 Database connection closed');
    } catch (error) {
      console.error('❌ Error closing database connection:', error.message);
    }
  });
  
  await Promise.all(promises);
  connections.clear();
};

export default getDatabaseConnection;
