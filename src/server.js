const app = require("./app");
const env = require("./config/env");

const PORT = env.PORT;

const server = app.listen(
    PORT,
    () => {

        console.log("======================================");
        console.log("       API GATEWAY INICIADO");
        console.log("======================================");

        

        console.log(`Puerto: ${env.port}`);
        console.log(`Entorno: ${env.processEnv}`);

        console.log(
            `Authentication Service: ${env.authServiceUrl}`
        );

        console.log("======================================");
    }
);

function shutdown(signal) {

    console.log(
        `\n${signal} recibido. Cerrando API Gateway...`
    );

    server.close(() => {

        console.log(
            "API Gateway detenido correctamente."
        );

        process.exit(0);
    });
}

process.on(
    "SIGTERM",
    () => shutdown("SIGTERM")
);

process.on(
    "SIGINT",
    () => shutdown("SIGINT")
);