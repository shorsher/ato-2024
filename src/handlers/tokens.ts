import { mintToken } from "../clients/firefly";

export const handleMintATOToken = async (amount: string, to: string) => {
  return mintToken(amount, to);
}