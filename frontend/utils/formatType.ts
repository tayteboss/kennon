import { WorkType } from "../shared/types/types";

const formatType = (type: WorkType["_type"], useLowerCase = false) => {
  if (type === "publicWork") {
    return useLowerCase ? "public" : "Public";
  } else if (type === "privateWork") {
    return useLowerCase ? "private" : "Private";
  }
};

export default formatType;
