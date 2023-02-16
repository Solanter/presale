import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import React from "react";
import LoadingPage from "../components/LoadingScreen";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

/**
 *
 * @param children{React.ReactNode}
 * @param chain{{name: string, explorer: string, currency: {symbol: string, decimals: number, name: string}, id: number, rpcUrl: string}} - The chain id of the network you want to connect to
 * @returns {JSX.Element}
 * @constructor
 */
const OnBoardProvider = ({ children, chain }) => {
  const [onBoard, setOnBoard] = React.useState(null);

  React.useEffect(() => {
    const chains = [
      {
        id: "0x" + chain.id.toString(16),
        token: chain?.currency?.name,
        label: chain?.name,
        rpcUrl: chain?.rpcUrl,
      },
    ];
    const walletConnect = walletConnectModule({
      // bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },
      connectFirstChainId: true,
    });
    const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

    const wallets = [injectedModule(), walletConnect, coinbaseWalletSdk];

    setOnBoard(
      init({
        wallets,
        chains,
        connect: {
          showSidebar: false,
        },
        accountCenter: {
          desktop: {
            enabled: false,
            //position?: AccountCenterPosition
            //expanded?: boolean
            //minimal: true,
          },
          mobile: {
            enabled: false,
          },
        },
      })
    );
  }, [chain]);

  if (!onBoard)
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <LoadingPage title={"Initializing web3"} />
      </Box>
    );

  return (
    <Web3OnboardProvider web3Onboard={onBoard}>{children}</Web3OnboardProvider>
  );
};

OnBoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
  chain: PropTypes.shape({
    name: PropTypes.string.isRequired,
    explorer: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      decimals: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    rpcUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default OnBoardProvider;
