export const setWorkType = (workType: "private" | "public" | "multi") => {
  sessionStorage.setItem("kennon-work-type", workType);
};
