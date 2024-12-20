import { WorkType } from "../shared/types/types";

const formatType = (type: WorkType["_type"]) => {
  if (type === "publicWork") {
    return "Public";
  } else if (type === "privateWork") {
    return "Private";
  }
};

export default formatType;
