import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { MintTokenDto } from '../dtos/mintTokens.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contractAddress')
  getContractAddress(){
    return {result: this.appService.getContractAddress()};
  }

  @Get('tokenName')
  async getTokenName() {
    return {result: await this.appService.getTokenName()};
  }

  @Get('total-supply')
  async getTotalSupply() {
    return {result: await this.appService.getTotalSupply()};
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return {result: await this.appService.getTokenBalance(address)};
  }

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string
  // @Query('lol') lol: number
  )
  {
    return {result: await this.appService.getTransactionReceipt(hash)};
  }


  @Get('server-wallet-address')
  async getServerWalletAddress() {
    return {result: await this.appService.getServerWalletAddress()};
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return {result: await this.appService.checkMinterRole(address)};
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return {result: await this.appService.mintTokens(body.address)};
  }
}
