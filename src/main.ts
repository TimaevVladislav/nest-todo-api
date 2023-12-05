import * as process from "process"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.enableCors()

  const config = new DocumentBuilder()
        .setTitle("Nest Todo API")
        .setDescription("Documentation REST API")
        .setVersion("1.0.0")
        .addTag("Nest")
        .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document)

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
