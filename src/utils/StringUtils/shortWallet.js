const getShortenedWallet = (wallet) => {
  if (!wallet) return "";
  const start = wallet.substring(0, 6);
  const end = wallet.substring(wallet.length - 4);
  return `${start}...${end}`;
};

export default getShortenedWallet;
