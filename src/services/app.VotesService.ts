import { Injectable } from '@nestjs/common';
import * as myErc20 from "../assets/MyERC20.json"
import * as tokenizedBallot from "../assets/TokenizedBallot.json"
import { BaseBlockchainService } from './blockchain.service';


@Injectable()
export class VotesService extends BaseBlockchainService{


  async giveVotingRights(to: string, amount: string) {

    let mintTxn = await this.walletClient.writeContract({
      address: myErc20.address,
      abi: myErc20.abi,
      functionName: "mint",
      args: [to, amount],
      account: this.walletClient.account
    })

    let {status} = await this.publicClient.waitForTransactionReceipt({ hash:mintTxn })
    console.log('Minting Status === ', status)
    return status;
  }


  async checkVotingRights(walletAddress: string): Promise<{ hasRights: boolean, balance: string }> {

    try {
      // Read balance from the contract
      const balance = await this.publicClient.readContract({
        address: myErc20.address, // Your ERC20 token contract address
        abi: myErc20.abi,
        functionName: 'balanceOf',
        args: [walletAddress]
      });
  
      // Convert balance to string to avoid BigInt serialization issues
      const balanceString = balance.toString();
      
      // Consider any positive balance as having voting rights
      const hasRights = BigInt(balance) > BigInt(0);
  
      return {
        hasRights,
        balance: balanceString
      };

    } catch (error) {
      console.error('Error checking voting rights:', error);
      throw new Error('Failed to check voting rights');
    }

  }

  async castVote( proposal: number,  amount: string, walletAddress: string): Promise<string> {
    try {
      // Call the vote function on the smart contract
      const hash = await this.walletClient.writeContract({
        address: tokenizedBallot.address, // Your ballot contract address
        abi: tokenizedBallot.abi,
        functionName: 'vote',
        args: [BigInt(proposal), BigInt(amount)],
        account: this.walletClient.account
      });
  
      // Wait for transaction confirmation
      const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
  
      return `Vote cast successfully. Transaction hash: ${receipt.transactionHash}`;
  
    } catch (error) {
      console.error('Error casting vote:', error);
      throw new Error(`Failed to cast vote: ${error.message}`);
    }
  }

}