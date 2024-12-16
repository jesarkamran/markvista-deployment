import { useContext } from "react";
import { CryptoContext } from "./CryptoContext";

export default function useCryptoContext() {
  return useContext(CryptoContext);
}
