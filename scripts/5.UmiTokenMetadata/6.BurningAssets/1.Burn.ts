import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { TokenStandard, burnV1, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_non_fungible_token"));

  await burnV1(umi, {
    mint: mint,
    authority: signer,
    tokenOwner: signer.publicKey,
    tokenStandard: TokenStandard.NonFungible,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
