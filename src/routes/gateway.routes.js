const express = require("express");
const {
    createProxyMiddleware
} = require("http-proxy-middleware");

const env = require("../config/env");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| AUTHENTICATION SERVICE
|--------------------------------------------------------------------------
|
| Todo lo que llegue a:
|
| /api/auth/*
|
| será enviado a:
|
| authentication-service:3001
|
*/

router.use(
    "/api/auth",
    createProxyMiddleware({
        target: env.authServiceUrl,
        changeOrigin: true,

        pathRewrite: {
            "^/api/auth": "/api/auth"
        },

        onProxyReq: (proxyReq, req) => {
            console.log(
                `[GATEWAY] ${req.method} ${req.originalUrl} -> ${env.authServiceUrl}`
            );
        },

        onError: (err, req, res) => {
            console.error(
                "[GATEWAY] Error comunicando con Authentication Service:",
                err.message
            );

            if (!res.headersSent) {
                res.status(503).json({
                    success: false,
                    message: "Authentication Service no disponible"
                });
            }
        }
    })
);

module.exports = router;