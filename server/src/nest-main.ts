import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import { Express } from 'express'

async function bootstrap(server?: Express) {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  )
  app.setGlobalPrefix('api')
  app.enableCors()

  // await app.init();
  return app
}
export default bootstrap
