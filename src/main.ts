import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger';

async function bootstrap() {
  const appCors = { cors: true }
  const app = await NestFactory.create(AppModule, appCors);

  swagger(app)
  await app.listen(3000);
}

bootstrap(); 
