import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { getLamports } from "./4.MinimumBalanceForRentExemption";
// 创建账号IX
export async function CreateAccountIx(
  payer: Keypair,
  Pubkey: PublicKey,
  connection: Connection,
  programId: PublicKey,
  space: number = 0,
  amount: number = 0,
) {
  // 请求在链上分配“空间”字节数的成本（以lamports为单位）
  const lamports = await getLamports(connection, space);
  // 使用 web3.js 辅助函数创建这个简单的指令
  const createAccountIx = SystemProgram.createAccount({
    // `fromPubkey` - 该帐户需要签署交易
    fromPubkey: payer.publicKey,
    // `newAccountPubkey` - 在链上创建的账户地址
    newAccountPubkey: Pubkey,
    // 要存储在此帐户中的lamports
    lamports: lamports + amount,
    // 分配的总空间
    space: space,
    // 该帐户的owner程序id
    programId: programId,
  });
  return createAccountIx;
}
