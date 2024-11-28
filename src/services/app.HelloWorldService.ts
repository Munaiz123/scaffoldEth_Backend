import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloWorldService {

  private text: string = 'Hello World';

  getHello(): string {
    return "Hello World"
  }

  setNewText(newText: string): string {
    this.text = newText;
    // return this.text;
    console.log('TEXT === ', newText)
    return newText;
  }

}