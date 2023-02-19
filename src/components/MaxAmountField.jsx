import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useWalletContext from "../hooks/useWalletContext";
import BarredProgress from "./Progress/BarredProgress";
import { useTheme } from "@mui/system";
import icoConfigs from "../configs/icoConfigs";

export const BuyModal = ({
  open,
  setOpen,
  decimals,
  currency,
  balance,
  minBuy,
  salePrice,
  bnbPrice,
  buyFunction,
}) => {
  const [value, setValue] = useState("0");
  const [useMax, setUseMax] = useState(false);
  const [busy, setBusy] = useState(false);
  const [inError, setInError] = useState("");
  const [waitingForNetwork] = useState(false);
  const walletContext = useWalletContext();

  const [amountOut, setAmountOut] = useState();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    updateAmountOut(currency);
  }, [value, useMax]);

  useEffect(() => {
    if (Number(amountOut?.formatted) < Number(minBuy?.formatted)) {
      setInError(
        `Minimum buy is ${minBuy?.formatted} ${icoConfigs.solanter.name}`
      );
    } else {
      if (!useMax && Number(value) > Number(balance?.formatted)) {
        setInError("Exceeded Balance");
      } else {
        setInError("");
      }
    }
  }, [amountOut]);

  const updateAmountOut = async (currency) => {
    if (
      Number(value) === 0 ||
      !value ||
      Number(value) > Number(balance?.formatted)
    ) {
      setAmountOut({
        amount: ethers.BigNumber.from(0),
        formatted: "0.00",
        decimals: 18,
      });
      return;
    }
    if (currency === "BNB") {
      const out = bnbPrice?.value
        .mul(ethers.utils.parseEther(value))
        .div(salePrice?.value);

      setAmountOut({
        amount: out,
        formatted: ethers.utils.formatUnits(out, 18),
        decimals: 18,
      });
    } else {
      const out = ethers.utils
        .parseUnits(value, decimals)
        .mul(10n ** 18n)
        .div(salePrice?.value);
      setAmountOut({
        amount: out,
        formatted: ethers.utils.formatUnits(out, 18),
        decimals: 18,
      });
    }
  };

  const handleBuy = async () => {
    setBusy(true);
    try {
      let amount;
      if (currency === "BNB") {
        amount = useMax
          ? balance.value.sub(ethers.utils.parseUnits("0.02", 18))
          : ethers.utils.parseUnits(value, decimals);
        if (amount < 0) {
          throw new Error(
            "Insufficient BNB in wallet (please account for gas)"
          );
        }
        await buyFunction(walletContext.signer, amount);

        enqueueSnackbar("Transaction was Successful", {
          variant: "success",
        });
      } else {
        amount = useMax
          ? balance.value
          : ethers.utils.parseUnits(value, decimals);
        await buyFunction(walletContext.signer, amount);
      }
      enqueueSnackbar("Transaction was Successful", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(e.reason || e.message, { variant: "error" });
    } finally {
      setBusy(false);
      setValue("0");
      setOpen(false);
    }
  };

  return (
    <AmountDialog
      decimals={decimals}
      title={
        waitingForNetwork
          ? "Reading On Chain Data..."
          : "Buy " + icoConfigs.solanter.name
      }
      value={value}
      inError={inError}
      maxAmount={balance?.value ? balance?.value : balance?.amount}
      setUseMax={setUseMax}
      setValue={setValue}
      busy={busy}
      handleAction={handleBuy}
      open={open}
      setOpen={setOpen}
      amountOut={amountOut}
      currency={currency}
    />
  );
};

BuyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  decimals: PropTypes.number.isRequired,
  currency: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  minBuy: PropTypes.object.isRequired,
  salePrice: PropTypes.object.isRequired,
  bnbPrice: PropTypes.object.isRequired,
  buyFunction: PropTypes.func.isRequired,
};
/**
 *
 * @param title
 * @param decimals
 * @param inError
 * @param value
 * @param setValue
 * @param setUseMax
 * @param maxAmount
 * @param setOpen
 * @param open
 * @param handleAction
 * @param busy
 * @param amountOut
 * @returns {JSX.Element}
 * @constructor
 */
export const AmountDialog = ({
  title,
  decimals,
  inError,
  value,
  setValue,
  setUseMax,
  maxAmount,
  setOpen,
  open,
  handleAction,
  busy,
  amountOut,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={open}
      onClose={() => {
        if (busy) return;
        setValue("0");
        setOpen(false);
      }}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.paper + "aa",
          backdropFilter: "blur(10px)",
          borderRadius: 5,
        },
      }}
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1A63A655",
          fontWeight: 900,
          fontSize: "1.5em",
        }}
      >
        <Typography variant={"h4"} component={"span"}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ padding: 2, pt: 5, pb: 0 }}>
        {false && (
          <Alert
            severity={"info"}
            style={{
              marginTop: 6,
              marginBottom: 24,
            }}
          >{`Current Balance: ${formatLongNumber(
            Number(maxAmount) / 10 ** decimals,
            2
          )}`}</Alert>
        )}

        <FormControl
          error={!!inError}
          fullWidth
          color={
            "secondary"
          } /*className={clsx(classes.margin, classes.textField)}*/
          variant="outlined"
        >
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            disabled={busy}
            label={"Amount"}
            type={"number"}
            fullWidth
            value={value}
            onChange={(event) => {
              setValue(
                Number(event.target.value) || Number(event.target.value) === 0
                  ? event.target.value
                  : value
              );
              setUseMax(false);
            }}
            onFocus={() => {
              if (value == 0) {
                setValue("");
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  disabled={busy}
                  sx={{
                    color: (theme) => theme.palette.success.main,
                  }}
                  onClick={() => {
                    setValue("" + Number(maxAmount) / 10 ** decimals);
                    setUseMax(true);
                  }}
                >
                  Use Max
                </Button>
              </InputAdornment>
            }
          />
          <FormHelperText>{`Current Balance: ${
            maxAmount ? ethers.utils.formatUnits(maxAmount, decimals) : 0
          }`}</FormHelperText>
        </FormControl>
        {!!inError && (
          <Alert severity={"error"} style={{ marginTop: 6, marginBottom: 6 }}>
            {inError}
          </Alert>
        )}
        {!!true && (
          <Alert severity={"info"} style={{ marginTop: 6, marginBottom: 6 }}>
            {"Will receive " +
              "" +
              truncNumber(amountOut?.formatted, 2) +
              " " +
              icoConfigs.solanter.name}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2} style={{ marginTop: 0 }}>
          <Grid item xs={12} sm={6}>
            <Button
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
              variant={"contained"}
              fullWidth
              color={"primary"}
              disabled={busy || !!inError || !value || Number(value) === 0}
              onClick={handleAction}
            >
              {busy && <BarredProgress sx={{ mr: 1 }} width={18} />}
              {title}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              sx={{
                textTransform: "none",
                p: "12px 32px",
                borderRadius: "50px",
                fontWeight: "900",
                letterSpacing: "1px",
              }}
              color={"primary"}
              variant={"contained"}
              fullWidth
              disabled={busy}
              onClick={() => {
                setValue("0");
                setOpen(false);
              }}
              text={"Cancel"}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

AmountDialog.propTypes = {
  title: PropTypes.string.isRequired,
  decimals: PropTypes.number.isRequired,
  inError: PropTypes.string.isRequired || PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  setUseMax: PropTypes.func.isRequired,
  maxAmount: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleAction: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  amountOut: PropTypes.object,
};

export const formatLongNumber = (n, decimals) => {
  if (!n) return 0;
  n = Number(n);
  if (n < 1e3) return +n.toFixed(decimals);
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimals) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimals) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimals) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(decimals) + "T";
};

export const truncNumber = (n, decimals) => {
  if (!n) return "0.00";
  // substring only two decimals after .
  return n.toString().substring(0, n.toString().indexOf(".") + decimals + 1);
};
/**
 *
 * @param num{Number | String}
 * @returns {string}
 */
export function eToNumber(num) {
  let sign = "";
  (num += "").charAt(0) == "-" && ((num = num.substring(1)), (sign = "-"));
  let arr = num.split(/[e]/gi);
  if (arr.length < 2) {
    return sign + num;
  }
  let dot = (0.1).toLocaleString().substr(1, 1),
    n = arr[0],
    exp = +arr[1],
    w = (n = n.replace(/^0+/, "")).replace(dot, ""),
    pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
    L = pos - w.length,
    // eslint-disable-next-line no-undef
    s = "" + BigInt(w);
  w =
    exp >= 0
      ? L >= 0
        ? s + "0".repeat(L)
        : r()
      : pos <= 0
      ? "0" + dot + "0".repeat(Math.abs(pos)) + s
      : r();
  L = w.split(dot);
  if ((L[0] == 0 && L[1] == 0) || (+w == 0 && +s == 0)) {
    w = 0;
  } //** added 9/10/2021
  return sign + w;

  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
  }
}
