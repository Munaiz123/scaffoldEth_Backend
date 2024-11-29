import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PublicClient, WalletClient, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia, baseSepolia } from 'viem/chains';

@Injectable()
export class BaseBlockchainService {
    publicClient
    walletClient

  constructor(protected configService: ConfigService) {
    const account = privateKeyToAccount(`0x${this.configService.get<string>('MUNZY_TEST_PRIVATE_KEY')}`);
    
    this.publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });

    this.walletClient = createWalletClient({
      transport: http(process.env.RPC_ENDPOINT_URL),
      chain: baseSepolia,
      account
    });
  }
}