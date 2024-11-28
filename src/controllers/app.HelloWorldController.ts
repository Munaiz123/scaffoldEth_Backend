import { Controller, Get, Post, Query } from "@nestjs/common";
import { HelloWorldService } from "src/services/app.HelloWorldService";

@Controller('helloworld')
export class HelloWorldController {

  constructor(private readonly helloWorldService: HelloWorldService) {}

    @Get()
    getHello(): {result: string} {
      return {result: this.helloWorldService.getHello()};
    } 

    @Post()
    setNewText(@Query('newText') newText: string): {result: string} {
      console.log(newText)
      return {result:this.helloWorldService.setNewText(newText)}
    }

}