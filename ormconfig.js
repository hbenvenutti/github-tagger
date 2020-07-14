if (process.env.ENVIRONMENT === 'develop'){
  entities = ["./src/modules/**/infra/typeorm/entities/*.ts"];
  migrations = ["./src/shared/infra/typeorm/migrations/*.ts"]
}
else {
  entities = ["./dist/modules/**/infra/typeorm/entities/*.js"]
  migrations = ["./dist/shared/infra/typeorm/migrations/*.js"]
}
  module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": entities,
  "migrations": migrations,
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
