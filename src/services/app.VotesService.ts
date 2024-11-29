import { Injectable } from '@nestjs/common';
import * as myErc20 from "../assets/MyERC20.json"
import { BaseBlockchainService } from './blockchain.service';


@Injectable()
export class VotesService extends BaseBlockchainService{


  async giveVotingRights(to: string, amount: bigint) {
    console.log('RACHING EHRE')

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

}