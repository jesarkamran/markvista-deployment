import { useContext } from "react";
import { CommunityContext } from "./CommunityContext";

const useCommunity = () => {
  return useContext(CommunityContext);
};

export default useCommunity;
