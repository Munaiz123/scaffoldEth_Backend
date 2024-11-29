import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { HelloWorldController } from './controllers/app.HelloWorldController';
import { HelloWorldService } from './services/app.HelloWorldService';
import { VotesController } from './controllers/app.VotesController';
import { VotesService } from './services/app.VotesService'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, HelloWorldController, VotesController ],
  providers: [AppService, HelloWorldService, VotesService],
})
export class AppModule {}