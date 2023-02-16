import { renderIcon } from "@download/blockies";
import { useEffect, useState } from "react";

const useBlockies = (address, canvasRef) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (address && canvasRef?.current) {
      renderIcon(
        {
          seed: address,
          size: 8,
          scale: 25,
        },
        canvasRef.current
      );

      setImageData(canvasRef.current.toDataURL());
    }
  }, [address, canvasRef?.current]);

  return imageData;
};

export default useBlockies;
