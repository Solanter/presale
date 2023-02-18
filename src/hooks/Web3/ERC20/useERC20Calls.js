import erc20Transfer from "../../../web3Utils/ERC20Utils/erc20Transfer";
import useQueryClient from "../../Query/useQueryClient";
import erc20TransferFrom from "../../../web3Utils/ERC20Utils/erc20TransferFrom";
import erc20Approve from "../../../web3Utils/ERC20Utils/erc20Approve";
import { useCallback } from "react";

/**
 *
 * @returns {{transfer: (function(String, import("@wagmi/core").Signer, String, (String|Number|import('ethers').BigNumber)): Promise<*>), transferFrom: (function(String, import("@wagmi/core").Signer, String, String, (String|Number|import('ethers').BigNumber)): Promise<*>), approve: (function(String, import("ethers").Signer, String, (String|Number|import('ethers').BigNumber)): Promise<*>)}}
 */
const useERC20Calls = () => {
  const queryClient = useQueryClient();

  /**
   * @param tokenAddress{String} - ERC20 token address
   * @param signer{import("@wagmi/core").Signer} - ethers.js signer
   * @param to{String} - The address of the recipient
   * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
   * @returns {Promise<import('@ethersproject/abstract-provider').TransactionReceipt>}
   */
  const transfer = useCallback(async (tokenAddress, signer, to, amount) => {
    const signerAddress = await signer.getAddress();
    const tx = await erc20Transfer(tokenAddress, signer, to, amount);

    const tr = await tx.wait();

    await queryClient.invalidateQueries([
      "erc20",
      "balance",
      tokenAddress,
      signerAddress,
    ]);
    return tr;
  }, []);

  /**
   *
   * @param tokenAddress{String} - ERC20 token address
   * @param signer{import("@wagmi/core").Signer} - ethers.js signer
   * @param from{String} - The address of the sender
   * @param to{String} - The address of the recipient
   * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
   * @returns {Promise<import('@ethersproject/abstract-provider').TransactionReceipt>}
   */
  const transferFrom = useCallback(
    async (tokenAddress, signer, from, to, amount) => {
      const chainId = await signer.getChainId();
      const signerAddress = await signer.getAddress();
      const tx = await erc20TransferFrom(
        tokenAddress,
        signer,
        from,
        to,
        amount
      );

      const tr = await tx.wait();
      await queryClient.invalidateQueries(["erc20", "balance", from, chainId]);
      await queryClient.invalidateQueries(["erc20", "balance", to, chainId]);
      await queryClient.invalidateQueries([
        "erc20",
        "allowance",
        tokenAddress,
        signerAddress,
        from,
      ]);
      return tr;
    },
    []
  );

  /**
   * @param tokenAddress{String} - ERC20 token address
   * @param signer{import("ethers").Signer} - ethers.js signer
   * @param spender{String} - The address of the spender
   * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
   * @returns {Promise<*>}{Promise<import('@ethersproject/abstract-provider').TransactionReceipt>}
   */
  const approve = useCallback(async (tokenAddress, signer, spender, amount) => {
    //const chainId = await signer.getChainId();
    const signerAddress = await signer.getAddress();
    const tx = await erc20Approve(tokenAddress, signer, spender, amount);

    const tr = await tx.wait();

    /**
     * TODO: this invalidates all allowances for the signer, not just the one for the spender
     *
     */
    await queryClient.invalidateQueries([
      "erc20",
      "allowance",
      tokenAddress,
      signerAddress,
    ]);
    return tr;
  }, []);
  return { transfer, transferFrom, approve };
};
export default useERC20Calls;
