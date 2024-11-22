import { Injectable } from '@nestjs/common';
import * as tokenJson from "./assets/MyToken.json"
import { createPublicClient, http, Address} from 'viem';
import {sepolia} from 'viem/chains'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): Address {
    return this.configService.get<Address>('TOKEN_ADDRESS');
  }

  async getTokenName(): Promise<string> {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });
    const name = await publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name as string;
  }

  async getTotalSupply(): Promise<string>{
    return null;
  }

  async getTokenBalance(address: string): Promise<string>{
    return null;
  }

  async getTransactionReceipt(hash: string): Promise<string>{
    return null;
  }

}
