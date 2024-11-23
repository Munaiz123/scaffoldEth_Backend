import { Injectable } from '@nestjs/common';
import * as tokenJson from "./assets/MyToken.json"
import { createPublicClient, http, Address, formatEther} from 'viem';
import {sepolia} from 'viem/chains'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  private publicClient; 

  constructor(private configService: ConfigService) {

    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });

  }


  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): Address {
    return this.configService.get<Address>('TOKEN_ADDRESS');
  }

  async getTokenName(): Promise<string> {
   
    const name = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name as string;
  }

  async getTotalSupply(): Promise<string>{
    
    const symbol = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "symbol"
    });

    const supply = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "totalSupply"
    });

    return `${formatEther(supply as bigint)} ${symbol}`
  }

  async getTokenBalance(address: string): Promise<string>{
    return null;
  }

  async getTransactionReceipt(hash: string): Promise<string>{
    return null;
  }

}
