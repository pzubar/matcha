"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const { Pool, Client } = require('pg');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const pool = new Pool();
    const res = await pool.query('SELECT NOW()');
    console.log("RES:::", res);
    await pool.end();
}
bootstrap();
//# sourceMappingURL=main.js.map