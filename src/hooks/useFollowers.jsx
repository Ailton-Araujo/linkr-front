import { useContext } from "react";
import FollowersContext from "../contexts/FollowersContext";

export default function useFollowers() {
  return useContext(FollowersContext);
}
