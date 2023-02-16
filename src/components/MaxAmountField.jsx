import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const MaxAmountField = ({
  value,
  setValue,
  setUseMax,
  error,
  maxAmount,
  label,
  minBuy,
  maxBuy,
  symbol,
  disabled,
  ...props
}) => {
  const maxAmountFormatted = Number(maxAmount);

  const max = maxAmountFormatted > Number(maxBuy) ? maxBuy : maxAmountFormatted;

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      helperText={
        error || `Min: ${minBuy}  ${symbol} |  Max: ${maxBuy} ${symbol}`
      }
      fullWidth
      value={value}
      onChange={(e) => {
        setUseMax(false);
        setValue(e.target.value);
      }}
      label={label}
      InputProps={{
        endAdornment: (
          <Button
            disabled={disabled}
            variant={"text"}
            onClick={() => {
              setValue(max);
              if (setUseMax);
              setUseMax(true);
            }}
          >
            Max
          </Button>
        ),
      }}
      {...props}
    />
  );
};

MaxAmountField.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  useMax: PropTypes.bool,
  setUseMax: PropTypes.func,
  error: PropTypes.string,
  maxAmount: PropTypes.object,
  label: PropTypes.string,
  minBuy: PropTypes.string,
  maxBuy: PropTypes.string,
  symbol: PropTypes.string,
  props: PropTypes.object,
  disabled: PropTypes.bool,
};

export default MaxAmountField;
