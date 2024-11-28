import { Controller, Get, Post, Query } from "@nestjs/common";
import { HelloWorldService } from "src/services/app.HelloWorldService";

@Controller('helloworld')
export class HelloWorldController {

  constructor(private readonly helloWorldService: HelloWorldService) {}

    @Get()
    async getHello(): Promise<{result: string}> {
      return {result: await this.helloWorldService.getText()};
    } 

    @Post()
    async setNewText(@Query('newText') newText: string): Promise<{result: string}> {
      console.log(newText)
      return {result: await this.helloWorldService.setNewText(newText)}
    }


}