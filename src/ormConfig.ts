import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { join } from "path";

const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "wireless",
    database: "mediumclone",
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,

}

export default config;