import { ApiProperty } from "@nestjs/swagger";

export class CastVoteDto {
 @ApiProperty({ type: Number, required: true, description: "Index of the proposal to vote for" })
 proposal: number;

 @ApiProperty({ type: String, required: true, description: "Amount of voting power to use" })
 amount: string;

 @ApiProperty({ type: String, required: true, description: "Wallet address of the voter" })
 walletAddress: string;
}