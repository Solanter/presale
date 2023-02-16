import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import useWalletContext from "../hooks/useWalletContext";
import BarredProgress from "./Progress/BarredProgress";
import getShortenedWallet from "../utils/StringUtils/shortWallet";
import { useHistory } from "react-router-dom";
import { ROUTES_PATHS } from "../routes";

const ConnectButton = ({ color, sx, ...rest }) => {
  sx = sx ? sx : {};
  const history = useHistory();
  const {
    address,
    isConnected,
    isLoading,
    isCorrectNetwork,
    openConnectModal,
    requestSwitchNetwork,
    chain,
  } = useWalletContext();

  return (
    <>
      <Button
        variant="contained"
        color={
          !isCorrectNetwork && isConnected
            ? "error"
            : color
            ? color
            : "secondary"
        }
        sx={{ minWidth: 140, ...sx }}
        disabled={isLoading}
        onClick={async () => {
          if (isLoading) return;
          if (isConnected && isCorrectNetwork) {
            history.push(ROUTES_PATHS.DAPP_USER.replace(":address", address));
          } else if (isConnected && !isCorrectNetwork) {
            await requestSwitchNetwork();
          } else if (!address && !isConnected) {
            openConnectModal();
          }
        }}
        {...rest}
      >
        <Tooltip
          title={
            isConnected && isCorrectNetwork
              ? "Disconnect Wallet"
              : isConnected && !isCorrectNetwork
              ? "Switch to ".replace("%s", chain?.name)
              : "Connect your wallet to interact with the app"
          }
        >
          <>
            {isLoading ? (
              <BarredProgress />
            ) : !isLoading && isConnected && isCorrectNetwork && address ? (
              getShortenedWallet(address)
            ) : !isConnected ? (
              "Connect Wallet"
            ) : (
              "Switch Network"
            )}
          </>
        </Tooltip>
      </Button>
    </>
  );
};

ConnectButton.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default ConnectButton;
