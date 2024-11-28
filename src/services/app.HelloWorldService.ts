import { Injectable } from '@nestjs/common';
import * as helloWorldJson from "../assets/HelloWorld.json"
import { BaseBlockchainService } from './blockchain.service';


@Injectable()
export class HelloWorldService extends BaseBlockchainService{

  async getText(): Promise<string>{

    let text = await this.publicClient.readContract({
      address: helloWorldJson.address,
      abi: helloWorldJson.abi,
      functionName: "helloWorld"
    })

    console.log('TEXT from block chain --- ', text)

    return text
  }


  async setNewText(newText: string): Promise<string>{
    let newTextTxn = await this.walletClient.writeContract({
      address: helloWorldJson.address,
      abi: helloWorldJson.abi,
      functionName: "setText",
      args: [newText],
      account: this.walletClient.account

    })

    let {status} = await this.publicClient.waitForTransactionReceipt({ hash:newTextTxn })

    if (status === "success") return await this.getText()
    return null;
      
    

  }



}