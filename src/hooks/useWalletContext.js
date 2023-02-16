import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const useWalletContext = () => useContext(WalletContext);

export default useWalletContext;
