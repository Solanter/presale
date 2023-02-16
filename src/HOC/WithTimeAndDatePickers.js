import { Component } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

const WithTimeAndDatePickers = (ComponentToWrap) => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.props = props;
    }
    render() {
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ComponentToWrap {...this.props} />
        </LocalizationProvider>
      );
    }
  }

  return HOC;
};

export default WithTimeAndDatePickers;
