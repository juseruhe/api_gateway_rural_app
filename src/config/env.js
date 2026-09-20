require("dotenv").config();

const env = {
    port: process.env.PORT || 3000,
    authServiceUrl: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    processEnv: process.env.NODE_ENV || "development",
}

module.exports = env;