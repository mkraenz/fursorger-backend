import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express = require('express');
import { Server } from 'http';
import { AppModule } from './app.module';
import { configuredLoggerMiddleware } from './common/middlewares/logger.middleware';
import { configuredValidationPipe } from './common/pipes/validation.pipe';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );
        nestApp.use(eventContext());
        nestApp.useGlobalPipes(configuredValidationPipe);
        nestApp.use(configuredLoggerMiddleware);
        nestApp.setGlobalPrefix('prod');
        await nestApp.init();
        cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}

// Export the handler : the entry point of the Lambda function
export const handler: Handler = async (event: any, context: Context) => {
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
