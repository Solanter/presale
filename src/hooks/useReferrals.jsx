import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const useReferrals = () => {
  let query = useQuery();
  let address = query.get("ref");
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    if (address && ethers.utils.isAddress(address)) {
      window.localStorage.setItem("referral", address);
      setReferral(address);
    } else {
      const referral = window.localStorage.getItem("referral");
      if (referral) {
        setReferral(referral);
      }
    }
  }, [address]);

  return referral;
};

export default useReferrals;
