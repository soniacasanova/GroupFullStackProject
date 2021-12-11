const checkEnvVar = (name) => {
  if (name in process.env) {
    return process.env[name];
  }
  throw new Error(`Missing environment variable ${name}`);
};

module.exports = {
  jwt: { 
    secret: checkEnvVar("JWT_SECRET"),
    expiration: checkEnvVar("JWT_EXPIRATION_TIME"),
  },
  port: checkEnvVar("SERVER_PORT"),
  dbConnexion: {
    host: checkEnvVar("DB_HOST"),
    port: checkEnvVar("DB_PORT"),
    user: checkEnvVar("DB_USER"),
    password: checkEnvVar("DB_PASSWORD"),
    db: checkEnvVar("DB_DATABASE"),
  },
  mongoUrl() {
    const { user, password, host, port, db } = this.dbConnexion;
    return `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
  }
};