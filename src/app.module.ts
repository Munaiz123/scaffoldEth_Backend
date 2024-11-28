import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { HelloWorldController } from './controllers/app.HelloWorldController';
import { HelloWorldService } from './services/app.HelloWorldService';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, HelloWorldController ],
  providers: [AppService, HelloWorldService],
})
export class AppModule {}