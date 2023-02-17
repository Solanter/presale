import Page from "../../components/Page";
import Box from "@mui/material/Box";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import {
  Container,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Button from "@mui/material/Button";
import { createRef, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { FillBar } from "../../components/FillBar";
import Tooltip from "@mui/material/Tooltip";
import CountDown from "../../components/CountDown";
import useWalletContext from "../../hooks/useWalletContext";
import { useSnackbar } from "notistack";
import useICO from "../../hooks/ICO/useICO";
import icoConfigs from "../../configs/icoConfigs";
import {
  formatMoneyBigNumber,
  formatMoneyNumber,
} from "../../utils/NumberUtils/formatNumbers";
import { ethers } from "ethers";

const logoUrl = new URL(
  "../../../public/logo.png?as=webp&height=120",
  import.meta.url
).href;

const throwGold = new URL(
  "../../../public/images/trow_coin.png?as=webp&width=800",
  import.meta.url
).href;

const liveIcon = new URL(
  "../../../public/images/live.png?as=webp&width=500",
  import.meta.url
).href;

const bnb = new URL("../../../public/images/tokens/bnb.svg", import.meta.url)
  .href;
const usdt = new URL("../../../public/images/tokens/usdt.svg", import.meta.url)
  .href;

const HomePage = () => {
  const hoToBuyRef = createRef();
  const buyRef = createRef();
  const referalRef = createRef();

  const scrollToBuy = () => {
    buyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToReferral = () => {
    referalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Page title={"Home"}>
      <Container maxWidth={"lg"}>
        <Header scrollToBuy={scrollToBuy} />
        <Description
          onHowToBuyCick={() =>
            hoToBuyRef.current.scrollIntoView({ behavior: "smooth" })
          }
          scrollToBuy={scrollToBuy}
          scrollToReferral={scrollToReferral}
        />
        <Box sx={{ minHeight: 40 }} />
        <div ref={hoToBuyRef} />
        <HowToBuy scrollToBuy={scrollToBuy} />
        <Box sx={{ minHeight: 40 }} />
        <div ref={buyRef} />
        <IcoDashboard scrollToBuy={scrollToBuy} />
        <Box sx={{ minHeight: 40 }} />
        <div ref={referalRef} />
        <ReferralDashboard scrollToBuy={scrollToReferral} />
        <Box sx={{ minHeight: 40 }} />
      </Container>
    </Page>
  );
};

export default HomePage;

const ReferralDashboard = ({ scrollToBuy }) => {
  const { address, openConnectModal, chain, provider } = useWalletContext();
  const ico = useICO({
    address: icoConfigs.ico,
    saleToken: icoConfigs.solanter,
    usdtToken: icoConfigs.usdt,
    wbnbToken: icoConfigs.wbnb,
    router: icoConfigs.router,
    user: address,
    chainID: chain.id,
    provider,
  });
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    console.log(ico);
  }, [ico]);

  return (
    <>
      <Paper
        sx={{
          border: "5px solid #ffffff55",
          backgroundColor: (theme) => theme.palette.background.default + "cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "24px",
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth={"md"}>
          <Typography variant={"h4"}>
            Earn up to{" "}
            {ico.presaleData.isSuccess ? (
              ico.presaleData.data.referralCommissionRate + "%"
            ) : (
              <Skeleton sx={{ display: "inline-block", width: "2em" }} />
            )}{" "}
            in BNB and USDT on every transaction made by your referrals
          </Typography>
          <Box sx={{ minHeight: 40 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              p: 2,
              borderRadius: "24px",
              backgroundColor: "#0005",
              backdropFilter: "blur(3px)",
              position: "relative",
              zIndex: 1,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <FeatherIcon size={24} icon={"user"} />
              <Typography
                variant={"body2"}
                sx={{ fontSize: "1em", fontWeight: 500 }}
              >
                Referral Link
              </Typography>
            </Box>
            {address ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                  },
                }}
              >
                <Typography
                  variant={"body2"}
                  sx={{ fontSize: "0.8em", fontWeight: 500 }}
                >
                  {`${window.location.origin}/?ref=${address}`}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={"Copy"}>
                    <IconButton
                      size={"small"}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/?ref=${address}`
                        );
                        enqueueSnackbar("Copied to clipboard", {
                          variant: "success",
                        });
                      }}
                    >
                      <FeatherIcon size={24} icon={"copy"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Share"}>
                    <IconButton
                      onClick={() => {
                        // share link with share api
                        if (navigator.share) {
                          navigator.share({
                            title: "Solanter - Presale Stage 1",
                            text: "Get paid every 10 seconds with our passive income ecosystem",
                            url: `${window.location.origin}/?ref=${address}`,
                          });
                        } else {
                          // fallback to copy link
                          navigator.clipboard.writeText(
                            `${window.location.origin}/?ref=${address}`
                          );
                        }
                      }}
                    >
                      <FeatherIcon size={24} icon={"share"} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ) : (
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={async () => {
                  await openConnectModal();
                  console.log(performance.now());
                  setTimeout(() => {
                    console.log(performance.now());
                    scrollToBuy();
                  }, 500);
                }}
              >
                Connect Wallet
              </Button>
            )}
          </Box>

          {address && (
            <>
              <Box sx={{ minHeight: 10 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                  p: 2,
                  borderRadius: "24px",
                  backgroundColor: "#0005",
                  backdropFilter: "blur(3px)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <img src={bnb} alt={"bnb"} width={24} height={24} />
                  <Typography
                    variant={"body2"}
                    sx={{ fontSize: "1em", fontWeight: 500 }}
                  >
                    BNB Earned from Referrals
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant={"body2"}
                    sx={{ fontSize: "1em", fontWeight: 500 }}
                  >
                    {ico.userPresaleData.data?.bnbReferralRewards?.formatted}{" "}
                    BNB
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ minHeight: 10 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                  p: 2,
                  borderRadius: "24px",
                  backgroundColor: "#0005",
                  backdropFilter: "blur(3px)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <img src={usdt} alt={"bnb"} width={24} height={24} />
                  <Typography
                    variant={"body2"}
                    sx={{ fontSize: "1em", fontWeight: 500 }}
                  >
                    USDT Earned from Referrals
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant={"body2"}
                    sx={{ fontSize: "1em", fontWeight: 500 }}
                  >
                    {ico.userPresaleData.data?.usdtReferralRewards?.formatted}{" "}
                    USDT
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ minHeight: 30 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled={
                    ico.userPresaleData.data?.bnbReferralRewards?.value?.toNumber() ===
                      0 &&
                    ico.userPresaleData.data?.usdtReferralRewards?.value?.toNumber() ===
                      0
                  }
                  variant={"contained"}
                  sx={{
                    textTransform: "none",
                    p: "12px 32px",
                    borderRadius: "50px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                    minWidth: "40%",
                  }}
                >
                  Claim All Rewards
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Paper>
    </>
  );
};
ReferralDashboard.propTypes = {
  scrollToBuy: PropTypes.func.isRequired,
};
const IcoDashboard = ({ scrollToBuy }) => {
  const walletContext = useWalletContext();
  const { address, chain, provider } = useWalletContext();
  const ico = useICO({
    address: icoConfigs.ico,
    saleToken: icoConfigs.solanter,
    usdtToken: icoConfigs.usdt,
    wbnbToken: icoConfigs.wbnb,
    router: icoConfigs.router,
    user: address,
    chainID: chain.id,
    provider,
  });
  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#2775BA55",
        backgroundImage: `url(${throwGold})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        backgroundSize: "100%",
        borderRadius: "24px",
        border: "5px solid #2775BA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Overlay />
      <Container maxWidth={"md"}>
        <Grid
          container
          sx={{
            zIndex: 1,
          }}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <DarkCard>
              <img src={liveIcon} alt={"live"} width={240} />

              <Box
                sx={{
                  background: "grey",
                  borderRadius: 12,
                  flexBasis: "100%",
                  width: "100%",
                }}
              >
                <FillBar
                  total={ico.presaleData.data?.totalTobeRaised?.formatted}
                  raised={ico.presaleData.data?.totalUSDValueRaised?.formatted}
                  percentage={
                    100 - (ico.presaleData.data?.raisedPercentage || 0)
                  }
                />
              </Box>
            </DarkCard>
            <DarkCard>
              <Typography
                variant={"h4"}
                sx={{ fontWeight: 900, fontSize: "2em" }}
              >
                {ico.presaleData.data?.hasStarted
                  ? `Stage 1 has started`
                  : `Stage 1 will start Soon`}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant={"subtitle1"}
                  sx={{ fontWeight: 600, fontSize: "1em" }}
                >
                  {ico.presaleData.data?.hasStarted
                    ? ico.presaleData.data?.hasEnded
                      ? "Claim Bought tokens in"
                      : "Sale ends in"
                    : "Sale starts in"}
                </Typography>
                <CountDown
                  date={
                    ico.presaleData.data?.hasStarted
                      ? ico.presaleData.data?.hasEnded
                        ? ico.presaleData.data?.listingTime?.seconds
                        : ico.presaleData.data?.endTime?.seconds
                      : ico.presaleData.data?.startTime?.seconds > 0
                      ? ico.presaleData.data?.startTime?.seconds > 0
                      : (Date.now() + 24 * 60 * 60 * 1000 * 10) / 1000
                  }
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant={"subtitle1"}
                  sx={{ fontWeight: 400, fontSize: "1em" }}
                >
                  Enter Presale
                </Typography>
                <Typography
                  variant={"subtitle1"}
                  sx={{ fontWeight: 700, fontSize: "1em" }}
                >
                  1 USDT ={" "}
                  {1 / Number(ico.presaleData.data?.usdtPrice.formatted)} SOLT
                </Typography>

                <Typography
                  variant={"subtitle1"}
                  sx={{ fontWeight: 700, fontSize: "1em" }}
                >
                  1 BNB ={" "}
                  {formatMoneyNumber(
                    Number(ico.bnbPrice.data?.formatted) /
                      Number(ico.presaleData.data?.usdtPrice.formatted)
                  )}{" "}
                  SOLT
                </Typography>
                <br />
                {(!walletContext.isConnected ||
                  !walletContext.isCorrectNetwork) && (
                  <Button
                    variant={"contained"}
                    sx={{
                      backgroundColor: "white",
                      color: (theme) => theme.palette.primary.light,
                      textTransform: "none",
                      p: "12px 32px",
                      borderRadius: "50px",
                      fontWeight: "900",
                      letterSpacing: "1px",
                      minWidth: "40%",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                    onClick={async () => {
                      if (
                        walletContext.isConnected &&
                        !walletContext.isCorrectNetwork
                      ) {
                        await walletContext.requestSwitchNetwork();
                        console.log(performance.now());
                        setTimeout(() => {
                          console.log(performance.now());
                          scrollToBuy();
                        }, 500);
                      } else {
                        await walletContext.openConnectModal();
                        console.log(performance.now());
                        setTimeout(() => {
                          console.log(performance.now());
                          scrollToBuy();
                        }, 500);
                      }
                    }}
                  >
                    {walletContext.isConnected &&
                    !walletContext.isCorrectNetwork
                      ? "Switch Network"
                      : "Connect Wallet"}
                  </Button>
                )}
                {walletContext.isConnected &&
                  walletContext.isCorrectNetwork && (
                    <Box
                      sx={{
                        gap: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        disabled={
                          ico.presaleData.data?.hasEnded ||
                          !ico.presaleData.data?.hasStarted ||
                          ico.bnbBalance.balance?.value?.eq(0)
                        }
                        variant={"contained"}
                        sx={{
                          backgroundColor: "white",
                          color: (theme) => theme.palette.primary.light,
                          textTransform: "none",
                          p: "12px 32px",
                          borderRadius: "50px",
                          fontWeight: "900",
                          letterSpacing: "1px",
                          minWidth: "40%",
                          "&:hover": {
                            color: "white",
                          },
                        }}
                        onClick={async () => {
                          console.log("handle Buy");
                        }}
                      >
                        Buy With BNB
                      </Button>
                      <Button
                        disabled={
                          ico.presaleData.data?.hasEnded ||
                          !ico.presaleData.data?.hasStarted ||
                          !ico.hasUsdtBalance ||
                          !ico.approved
                        }
                        variant={"contained"}
                        sx={{
                          backgroundColor: "white",
                          color: (theme) => theme.palette.primary.light,
                          textTransform: "none",
                          p: "12px 32px",
                          borderRadius: "50px",
                          fontWeight: "900",
                          letterSpacing: "1px",
                          minWidth: "40%",
                          "&:hover": {
                            color: "white",
                          },
                        }}
                        onClick={async () => {
                          if (!ico.approved) {
                            // approve
                          } else {
                            // buy
                          }
                        }}
                      >
                        {ico.approved ? `Buy With USDT` : `Approve USDT`}
                      </Button>
                    </Box>
                  )}
              </Box>
            </DarkCard>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <DarkCard>
              <Typography variant={"h6"} sx={{ m: 0, p: 0 }}>
                Vesting period
              </Typography>
              <Divider
                orientation={"horizontal"}
                sx={{ width: "100%", m: 0, p: 0 }}
              />
              <LineDetails
                title={"Vesting Ratio"}
                value={ico.presaleData.data?.vestingRatio + "%"}
                tooltip={
                  "The percentage of bought tokens that will be subject to vesting"
                }
              />
              <LineDetails
                title={"Start Date"}
                value={ico.presaleData.data?.listingTime?.formatted}
              />
              <LineDetails
                title={"End Date"}
                value={ico.presaleData.data?.endTime?.formatted}
              />
              <LineDetails
                title={"Unlock Interval"}
                value={ico.presaleData.data?.vestingInterval.formatted}
                tooltip={
                  "The tokens are vested over the period and unlocks new tokens every day"
                }
              />
              <Divider
                orientation={"horizontal"}
                sx={{ width: "100%", m: 0, p: 0 }}
              />
              <Typography variant={"h6"} sx={{ m: 0, p: 0 }}>
                Vesting Summary
              </Typography>
              <LineDetails
                title={"Total Bought"}
                value={
                  (ico.userPresaleData.data?.totalBought?.formatted || 0) +
                  " SOLT"
                }
              />
              <LineDetails
                title={"Not vested"}
                value={
                  (ico.userPresaleData.data?.nonVestedAmount.formatted || 0) +
                  " SOLT"
                }
              />
              <LineDetails
                title={"Total Vested"}
                value={
                  formatMoneyBigNumber(
                    ico.userPresaleData.data?.totalBought?.value
                      ? ico.userPresaleData.data.totalBought?.value?.sub(
                          ico.userPresaleData.data?.nonVestedAmount.value
                        )
                      : ethers.BigNumber.from(0)
                  ) + " SOLT"
                }
              />
              <LineDetails
                title={"Unlocked"}
                value={
                  (ico.userPresaleData.data?.unlockedAmount?.formatted || 0) +
                  " SOLT"
                }
              />
              <LineDetails
                title={"Claimed"}
                value={
                  (ico.userPresaleData.data?.claimedAmount?.formatted || 0) +
                  " SOLT"
                }
              />
              <LineDetails
                title={"Claimable"}
                value={
                  (ico.userPresaleData.data?.claimableAmount?.formatted || 0) +
                  " SOLT"
                }
              />
              <Button
                disabled={
                  !walletContext.isConnected ||
                  !walletContext.isCorrectNetwork ||
                  ico.userPresaleData.data?.claimableAmount?.value?.eq(0) ||
                  ico.presaleData.data?.listingTime?.miliseconds > Date.now()
                }
                variant={"contained"}
                sx={{
                  backgroundColor: "white",
                  color: (theme) => theme.palette.primary.light,
                  textTransform: "none",
                  p: "12px 32px",
                  borderRadius: "50px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  minWidth: "40%",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => {
                  // handle claim
                }}
              >
                Claim Tokens
              </Button>
            </DarkCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
IcoDashboard.propTypes = {
  scrollToBuy: PropTypes.func.isRequired,
};

const LineDetails = ({ title, value, tooltip }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        fontWeight: "bold",
      }}
    >
      <Typography variant={"body2"} sx={{ fontSize: "1em", fontWeight: 500 }}>
        {title}
      </Typography>
      <Tooltip title={tooltip}>
        <Typography
          variant={"subtitle2"}
          sx={{
            fontSize: "1em",
            fontWeight: 800,
            color: "#c1c1c1",
            display: "flex",
            gap: 1,
          }}
        >
          {value}
        </Typography>
      </Tooltip>
    </Box>
  );
};

LineDetails.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

const Description = ({ onHowToBuyCick, scrollToBuy, scrollToReferral }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "#2775BA55",
        backgroundImage: `url(${throwGold})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        backgroundSize: "100%",
        borderRadius: "24px",
        border: "5px solid #2775BA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: "32px 64px",
        [theme.breakpoints.down("md")]: {
          p: "32px 32px",
        },
        [theme.breakpoints.down("sm")]: {
          p: "32px 12px",
        },
      }}
    >
      <Container
        maxWidth={"sm"}
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default + "cc",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          textAlign: "center",
          p: 4,
          paddingTop: 6,
          paddingBottom: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {false && <Typography variant={"h2"}>Solanter Presale</Typography>}
        <Typography variant={"h4"}>
          Get paid every 10 seconds with our passive income ecosystem
        </Typography>
        <Box sx={{ minHeight: 24 }} />
        <Typography
          variant={"body1"}
          sx={{
            fontSize: "1.2rem",
          }}
        >
          The Solanter dao fuelled marketplace is going to disrupt and
          revolutionize the luxury and real world collectible market and make it
          possible for anyone to Fractionally buy, sell and invest in rare
          collectible and expensive items from renowned brands.
        </Typography>

        <Box sx={{ minHeight: 24 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Button
            variant={"contained"}
            sx={{
              textTransform: "none",
              p: "12px 32px",
              borderRadius: "50px",
              fontWeight: "900",
              letterSpacing: "1px",
              minWidth: "40%",
            }}
            onClick={scrollToReferral}
          >
            Referal Program
          </Button>

          <Button
            variant={"contained"}
            sx={{
              textTransform: "none",
              p: "12px 32px",
              borderRadius: "50px",
              fontWeight: "900",
              letterSpacing: "1px",
              minWidth: "40%",
            }}
            onClick={onHowToBuyCick}
          >
            How To Buy
          </Button>

          <Button
            variant={"contained"}
            sx={{
              backgroundColor: "white",
              color: (theme) => theme.palette.primary.light,
              textTransform: "none",
              p: "12px 32px",
              borderRadius: "50px",
              fontWeight: "900",
              letterSpacing: "1px",
              minWidth: "80%",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={scrollToBuy}
          >
            Buy Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

Description.propTypes = {
  onHowToBuyCick: PropTypes.func.isRequired,
  scrollToBuy: PropTypes.func.isRequired,
  scrollToReferral: PropTypes.func.isRequired,
};

const HowToBuy = ({ scrollToBuy }) => {
  return (
    <Paper
      sx={{
        minHeight: "80vh",
        border: "5px solid #ffffff55",
        backgroundColor: (theme) => theme.palette.background.default + "cc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "24px",
      }}
    >
      <Container
        maxWidth={"sm"}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: (theme) => theme.palette.primary.light + "99",
          borderRadius: "24px",
          pt: 6,
          pb: 7,
          mt: 4,
          mb: 4,
        }}
      >
        <Typography variant={"h2"}>How To Buy Solanter</Typography>
        <br />

        <Typography variant={"h5"}>Step 1</Typography>
        <Box sx={{ minHeight: 10 }} />
        <Typography variant={"body2"} sx={{ fontSize: "1em" }}>
          To begin, make sure you have a MetaMask wallet installed on your
          browser, or use one of the wallets supported by Wallet Connect (we
          recommend Trust Wallet). Purchasing on a desktop browser will give you
          a smoother purchasing experience. For this we recommend Metamask. If
          you are purchasing on mobile, we recommend using Trust Wallet and
          connecting through the in built browser
        </Typography>

        <br />
        <Typography variant={"h5"}>Step 2</Typography>
        <Box sx={{ minHeight: 10 }} />
        <Typography variant={"body2"} sx={{ fontSize: "1em" }}>
          Once you have your preferred wallet provider ready, click “Connect
          Wallet” and select the appropriate option. For mobile wallet apps you
          will need to select “Wallet Connect”.
        </Typography>

        <br />
        <Typography variant={"h5"}>Step 3</Typography>
        <Box sx={{ minHeight: 10 }} />
        <Typography variant={"body2"} sx={{ fontSize: "1em" }}>
          Once the presale has finished you will be able to claim your Solanter
          tokens, we will release details closer to the time. Join our social
          pages or groups to keep updated . You will need to come back to this
          page and click claim to collect your tokens{" "}
        </Typography>
        <br />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: "white",
              color: (theme) => theme.palette.primary.light,
              textTransform: "none",
              p: "12px 32px",
              borderRadius: "50px",
              fontWeight: "900",
              letterSpacing: "1px",
              minWidth: "40%",
              "&:hover": {
                color: "white",
              },
            }}
            onClick={scrollToBuy}
          >
            Buy Now
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

HowToBuy.propTypes = {
  scrollToBuy: PropTypes.func.isRequired,
};

const Header = ({ scrollToBuy }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
      }}
    >
      <SocialIcons />
      <img src={logoUrl} />
      <Button
        variant={"contained"}
        sx={{
          textTransform: "none",
          p: "12px 32px",
          borderRadius: "50px",
          fontWeight: "900",
          letterSpacing: "1px",
        }}
        onClick={scrollToBuy}
      >
        Buy Now
      </Button>
    </Box>
  );
};

Header.propTypes = {
  scrollToBuy: PropTypes.func.isRequired,
};

const SocialIcons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <CircleIconButton
        href={process.env.TWITTER}
        icon={<FeatherIcon size={24} icon={"twitter"} />}
      />
      <CircleIconButton
        href={process.env.TELEGRAM}
        icon={<FeatherIcon size={24} icon={"send"} />}
      />
      <CircleIconButton
        href={process.env.YOUTUBE}
        icon={<FeatherIcon size={24} icon={"youtube"} />}
      />
    </Box>
  );
};

const CircleIconButton = ({ icon, onClick, href, sx, ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      component={href ? "a" : "span"}
      href={href}
      target={"_blank"}
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.text.primary,
        height: "fit-content",
        width: "fit-content",
        padding: "12px",
        borderRadius: "50%",
        border: (theme) => "1px solid " + theme.palette.divider,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.divider,
        },
        [theme.breakpoints.down("sm")]: {
          padding: "8px",
        },
        ...sx,
      }}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

CircleIconButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  props: PropTypes.object,
  sx: PropTypes.object,
  href: PropTypes.string,
};

const Overlay = () => (
  <Box
    sx={{
      position: "absolute",
      backgroundColor: "#0005",
      zIndex: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "24px",
      backdropFilter: "blur(3px)",
    }}
  />
);

const DarkCard = ({ children, sx, ...props }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: "24px",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#0009",
        gap: 2,
        backdropFilter: "blur(10px)",
        height: "100%",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

DarkCard.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  props: PropTypes.object,
};
