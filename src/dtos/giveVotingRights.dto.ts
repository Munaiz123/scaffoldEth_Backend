import { ApiProperty } from "@nestjs/swagger";

export class GiveVotingRightsDto {
 @ApiProperty({ type: String, required: true, description: "Wallet address to receive voting rights", default: "0x..." })
 walletAddress: string;

 @ApiProperty({ type: String, required: true, description: "Amount of voting rights to give", default: "100" })
 amount: string;
}