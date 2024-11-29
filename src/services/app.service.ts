import { Injectable } from '@nestjs/common';
import * as tokenJson from "../assets/MyToken.json"

import { createPublicClient, http, Address, formatEther, createWalletClient} from 'viem';

import {baseSepolia, sepolia} from 'viem/chains'
import { ConfigService } from '@nestjs/config';
import { privateKeyToAccount } from 'viem/accounts';


@Injectable()
export class AppService {
 
  publicClient; 
  walletClient; 

  constructor(private configService: ConfigService) {
    const account = privateKeyToAccount(`0x${this.configService.get<string>('MUNZY_TEST_PRIVATE_KEY')}`);
    
    this.publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(this.configService.get<string>('BASE_SEPOLIA_RPC_ENDPOINT_URL')),
    });


    this.walletClient = createWalletClient({
      transport: http(this.configService.get<string>('BASE_SEPOLIA_RPC_ENDPOINT_URL')),
      chain: baseSepolia,
      account
    });

  }


  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): Address {
    return this.configService.get<Address>('TOKEN_ADDRESS');
  }

  async getServerWalletAddress() { return this.walletClient.account.address; }

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

    const symbol = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "symbol"
    });

    const balanceOf = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "balanceOf",
      args:[address]
    });

    return `${formatEther(balanceOf as bigint)} ${symbol}`
  }

  async getTransactionReceipt(hash: string): Promise<string>{
    let txn =  await this.publicClient.getTransactionReceipt({hash})
    return `Transaction status: ${txn.status} || Block No: ${txn.blockNumber}`
  }

  

  async checkMinterRole(address: string): Promise<string> {
    const MINTER_ROLE = await this.publicClient.readContract({

      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "MINTER_ROLE"
    });

    const hasRole = await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "hasRole",
      args:[MINTER_ROLE, address]
    });

    return `The address ${address} ${hasRole ? "has" : "does not have"} MINTER_ROLE for the smart contract.`

  }


  async mintTokens(address: string) {
    // TODO:
    //1. use the server wallet to create a contract instance attached to the smart contract address
    //2. use the signed contract instance to send the mint txn
    //3. wait for txn hash
    //4. return txn hash

    return {address}
  }
}
