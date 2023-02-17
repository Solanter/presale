import { ConfigsConsumer, ConfigsProvider } from "./context/ConfigsContext";
import RTL from "./components/RTL";
import createCustomTheme from "./themes";
import ThemeProvider from "@mui/system/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { appRoutes } from "./routes";
import renderRoutes from "./renderRoutes";
import WalletContextProvider from "./context/WalletContext";
import { getChain } from "./web3Utils/ChainUtils/chainList";
import OnBoardProvider from "./context/OnBoardProvider";
import { SnackbarProvider } from "notistack";

export function App() {
  return (
    <>
      <ConfigsProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <ConfigsConsumer>
            {({ configs }) => {
              return (
                <ThemeProvider
                  theme={createCustomTheme({
                    direction: configs.direction,
                    responsiveFontSizes: configs.responsiveFontSizes,
                    themeMode: configs.themeMode,
                  })}
                >
                  <CssBaseline />
                  <RTL direction={configs.direction}>
                    <OnBoardProvider
                      chain={getChain(process.env.REACT_APP_CHAIN_ID)}
                    >
                      <WalletContextProvider
                        chain={getChain(process.env.REACT_APP_CHAIN_ID)}
                      >
                        <BrowserRouter>
                          {renderRoutes({ routes: appRoutes })}
                        </BrowserRouter>
                      </WalletContextProvider>
                    </OnBoardProvider>
                  </RTL>
                </ThemeProvider>
              );
            }}
          </ConfigsConsumer>
        </SnackbarProvider>
      </ConfigsProvider>
    </>
  );
}
