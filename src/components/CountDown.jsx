import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function getFormattedTimePeriod(timeInMillis) {
  const timeInSeconds = timeInMillis / 1000;

  const years = Math.floor(timeInSeconds / 3600 / 24 / 30 / 12);

  const months = Math.floor(
    (timeInSeconds - years * 12 * 30 * 24 * 3600) / 3600 / 24 / 30
  );

  const days = Math.floor(
    (timeInSeconds - months * 30 * 24 * 3600) / 3600 / 24
  );
  const hours = Math.floor(
    (timeInSeconds - days * 24 * 3600 - months * 30 * 24 * 3600) / 3600
  );
  const minutes = Math.floor(
    (timeInSeconds -
      hours * 3600 -
      days * 24 * 3600 -
      months * 30 * 24 * 3600) /
      60
  );
  const seconds = Math.floor(
    timeInSeconds -
      months * 3600 * 30 * 24 -
      days * 3600 * 24 -
      hours * 3600 -
      minutes * 60
  );

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

export const getFormattedTimeAsString = (timeInMillis) => {
  const { years, months, days, hours, minutes, seconds } =
    getFormattedTimePeriod(timeInMillis);

  let timeString = "";
  if (years > 0) {
    timeString += `${years} years `;
  }
  if (months > 0) {
    timeString += `${months} months `;
  }
  if (days > 0) {
    timeString += `${days} days `;
  }
  if (hours > 0) {
    timeString += `${hours} hours `;
  }
  if (minutes > 0) {
    timeString += `${minutes} minutes `;
  }
  if (seconds > 0) {
    timeString += `${seconds} seconds `;
  }
  return timeString;
};

/**
 *
 * @param date{Number} - unix datetime in seconds
 * @param callback
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CountdownTimer = ({ date, callback, ...props }) => {
  const [{ days, hours, minutes, seconds, months }, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [reached, setReached] = useState(false);
  useEffect(() => {
    // print every second with cleanup
    const interval = setInterval(() => {
      if (date * 1000 - Date.now() < 0) {
        callback?.();
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setReached(true);
        return;
      }
      setTime(
        date
          ? getFormattedTimePeriod(date * 1000 - Date.now())
          : getFormattedTimePeriod(0)
      );
    }, 1000);
    if (reached) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [date, reached]);
  return (
    <CountDownComponent
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      days={days}
      months={months}
      {...props}
    />
  );
};

CountdownTimer.propTypes = {
  date: PropTypes.number.isRequired,
  callback: PropTypes.func,
};

export default CountdownTimer;

const CountDownComponent = ({ hours, minutes, seconds, days, months }) => {
  months = months || 0;
  days = days ? days : 0;
  hours = hours ? hours : 0;
  minutes = minutes ? minutes : 0;
  seconds = seconds ? seconds : 0;
  return (
    <Box
      sx={{
        p: 1,
        mt: 0,
        mb: 1,
        display: "flex",
        justifyContent: "center",
        gap: 1,
        alignItems: "start",
        alignItem: "start",
        height: "fit-content",
        width: "100%",
      }}
    >
      <TimeBox text={days + months * 30} unit={"Days"} />
      <TimeBox text={hours} unit={"Hours"} />
      <TimeBox text={minutes} unit={"Minutes"} />
      <TimeBox text={seconds} unit={"Seconds"} />
    </Box>
  );
};

CountDownComponent.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired,
  months: PropTypes.number,
};

const TimeBox = ({ text, unit }) => {
  //console.log(String(text).padStart(2, "0"))
  return (
    <Box sx={{ flexGrow: 1, flexBasis: "25%" }}>
      <Typography
        variant={"h2"}
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: "1.05em!important",
          p: 1,
          lineHeight: 1,

          borderRadius: "8px",
          fontFamily: "monospace",
          backgroundColor: (theme) => theme.palette.background.default + "ff",
        }}
      >
        <b>{String(text).padStart(2, "0")}</b> <br />{" "}
        <span style={{ fontSize: "0.8em", fontWeight: 500 }}>
          {unit ? unit : "Days"}
        </span>
      </Typography>
    </Box>
  );
};

TimeBox.propTypes = {
  text: PropTypes.number.isRequired,
  unit: PropTypes.string,
};
