import QueryClient from "../hooks/Query/QueryClient";
import QueryClientProvider from "../hooks/Query/QueryClientProvider";
import PropTypes from "prop-types";

const queryClient = new QueryClient();

const UseQueryWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

UseQueryWrapper.propTypes = {
  children: PropTypes.node,
};

export default UseQueryWrapper;
