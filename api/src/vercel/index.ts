/**
 * Vercel Serverless Function entry point for the NestJS API.
 * This file adapts the NestJS app to run as a serverless function.
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let app;

async function bootstrap() {
  if (!app) {
    const adapter = new ExpressAdapter(server);
    app = await NestFactory.create(AppModule, adapter);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  }
  return server;
}

export default async (req, res) => {
  const instance = await bootstrap();
  return instance(req, res);
};
