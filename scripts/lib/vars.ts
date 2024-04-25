import dotenv from "dotenv";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { explorerURL, loadOrGenerateKeypair, loadPublicKeysFromFile } from "./helpers";

// load the env variables from file
dotenv.config();

export const FgGreen = "\x1b[32m";
export const FgRed = "\x1b[31m";
export const FgYellow = "\x1b[33m";
/**
 * Load the `payer` keypair from the local file system, or load/generate a new
 * one and storing it within the local directory
 */
export const payer = loadOrGenerateKeypair("Payer");

// generate a new Keypair for testing, named `wallet`
export const testWallet = loadOrGenerateKeypair("testWallet");

// load the env variables and store the cluster RPC url
export const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl("devnet");

// create a new rpc connection
export const connection = new Connection(CLUSTER_URL, "single");

// define an address to also transfer lamports too
export const STATIC_PUBLICKEY = new PublicKey("nickb1dAk4hKpHVPZenpzqVtw2F8RHnCq27QcfiReXD");

export function TokenMint() {
  // load the stored PublicKeys for ease of use
  let localKeys = loadPublicKeysFromFile();

  const tokenMint: PublicKey = localKeys.token;

  console.log(FgGreen + "==== Local PublicKeys loaded ====");
  console.log(`${FgGreen}Token's mint address: ${FgYellow + tokenMint}`);
  console.log(FgYellow + explorerURL({ address: localKeys.token }));
  return tokenMint;
}
