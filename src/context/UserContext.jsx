import PropTypes from "prop-types";
import { createContext } from "react";
import useWalletContext from "../hooks/useWalletContext";
import useSingleUser from "../hooks/useSingleUser";

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  getSeed: () => {},
});

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const UserProvider = (props) => {
  const { children } = props;
  const walletContext = useWalletContext();

  const { user, updateUser, getSeed } = useSingleUser({
    address: walletContext?.address,
  });

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateUser,
        getSeed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;
