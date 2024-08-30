import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swagger(app: INestApplication): any {
    const logger: Logger = new Logger('Swagger');
    const swaggerEndpoint = '/swagger';

    const options = new DocumentBuilder()
        .setTitle('Api Docs')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();


    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerEndpoint, app, document);
}