import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { VotesService } from "src/services/app.VotesService";
import { CastVoteDto } from '../dtos/votes.dto';
import { GiveVotingRightsDto } from "src/dtos/giveVotingRights.dto";

@Controller('votes')
export class VotesController {

  constructor(private readonly votesService: VotesService) {}

  @Get('checkVotingRights')
  async checkVotingRights(@Query('walletAddress') walletAddress: string): Promise<{ hasRights: boolean, balance: string }> {
    return await this.votesService.checkVotingRights(walletAddress);
  }


  @Post()
  async giveVotingRights(@Body() payload:GiveVotingRightsDto): Promise<{result: string}> {
    return {
      result: await this.votesService.giveVotingRights(
        payload.walletAddress, 
        payload.amount
      )
    }
  }

  @Post('cast')
  async castVote(@Body() payload: CastVoteDto): Promise<{ result: string }> {

  return {
      result: await this.votesService.castVote(
      payload.proposal,
      payload.amount,
      payload.walletAddress
      )
  }

}

}