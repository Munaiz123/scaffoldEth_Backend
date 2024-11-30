import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { VotesService } from "src/services/app.VotesService";

@Controller('votes')
export class VotesController {

  constructor(private readonly votesService: VotesService) {}

  @Get('checkVotingRights')
  async checkVotingRights(@Query('walletAddress') walletAddress: string): Promise<{ hasRights: boolean, balance: string }> {
    return await this.votesService.checkVotingRights(walletAddress);
  }


  @Post()
  async giveVotingRights(@Body() payload: { walletAddress: string, amount: bigint }): Promise<{result: string}> {
    return {
      result: await this.votesService.giveVotingRights(
        payload.walletAddress, 
        payload.amount
      )
    }
  }

}