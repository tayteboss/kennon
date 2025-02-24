import { WorkType } from "../shared/types/types";

const formatType = (type: WorkType["_type"], useLowerCase = false) => {
  if (type === "publicWork") {
    return useLowerCase ? "public" : "Public";
  } else if (type === "privateWork") {
    return useLowerCase ? "private" : "Private";
  } else if (type === "multiResWork") {
    return useLowerCase ? "multi" : "Multi Residence";
  } else {
    return "";
  }
};

export default formatType;
