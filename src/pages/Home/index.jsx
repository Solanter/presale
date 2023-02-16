import Page from "../../components/Page";
import Box from "@mui/material/Box";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { Container, IconButton, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import Button from "@mui/material/Button";
import { createRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { FillBar } from "../../components/FillBar";
import Tooltip from "@mui/material/Tooltip";
import CountDown from "../../components/CountDown";

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

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const HomePage = () => {
  const hoToBuyRef = createRef();
  const buyRef = createRef();
  const referalRef = createRef();
  let query = useQuery();
  console.log(query.get("ref"));

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
        <IcoDashboard />
        <Box sx={{ minHeight: 40 }} />
        <div ref={referalRef} />
        <ReferralDashboard />
        <Box sx={{ minHeight: 40 }} />
      </Container>
    </Page>
  );
};

export default HomePage;

const ReferralDashboard = () => {
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
            Earn up to 2% in BNB and USDT on every transaction made by your
            referrals
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
                https://presale.solanter.io/#/?ref=0x123456789
              </Typography>
              <IconButton>
                <FeatherIcon size={24} icon={"copy"} />
              </IconButton>
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
                0.234 BNB
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
                23.12 USDT
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
        </Container>
      </Paper>
    </>
  );
};

const IcoDashboard = () => {
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
        p: "32px 64px",
      }}
    >
      <Overlay />
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
              <FillBar percentage={10} />
            </Box>
          </DarkCard>
          <DarkCard>
            <Typography
              variant={"h4"}
              sx={{ fontWeight: 900, fontSize: "2em" }}
            >
              Stage 1 has started
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
                Sale ends in
              </Typography>
              <CountDown date={(Date.now() + 24 * 60 * 60 * 1000 * 5) / 1000} />
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
                1 $USDT = 1000 $SOLT
              </Typography>

              <Typography
                variant={"subtitle1"}
                sx={{ fontWeight: 700, fontSize: "1em" }}
              >
                1 $BNB = 296000 $SOLT
              </Typography>
              <br />
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
              >
                Connect Wallet
              </Button>
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
              value={"100%"}
              tooltip={
                "The percentage of bought tokens that will be subject to vesting"
              }
            />
            <LineDetails title={"Start Date"} value={"2021-10-10"} />
            <LineDetails title={"End Date"} value={"2021-10-10"} />
            <LineDetails
              title={"Unlock Interval"}
              value={"1 day"}
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
            <LineDetails title={"Total Bought"} value={"1000.00 $SOLT"} />
            <LineDetails title={"Not vested"} value={"0.00 $SOLT"} />
            <LineDetails title={"Total Vested"} value={"1000.00 $SOLT"} />
            <LineDetails title={"Unlocked"} value={"10.00 $SOLT"} />
            <LineDetails title={"Claimed"} value={"5.00 $SOLT"} />
            <LineDetails title={"Claimable"} value={"5.00 $SOLT"} />
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
            >
              Claim Tokens
            </Button>
          </DarkCard>
        </Grid>
      </Grid>
    </Box>
  );
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

const SocialIcon = ({ iconName, href, ...rest }) => {
  return (
    <Box
      component={href ? "a" : "div"}
      target={"_blank"}
      href={href}
      sx={{
        p: 1,
        borderRadius: "12px",
        transition: "all 0.3s ease",
        border: "2px solid white",
        height: "fit-content",
        "&:hover": {
          backgroundColor: "#fff8",
          border: "2px solid white",
        },
      }}
      {...rest}
    >
      <FeatherIcon
        size={24}
        icon={iconName}
        style={{
          color: "white",
        }}
      />
    </Box>
  );
};

SocialIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
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
