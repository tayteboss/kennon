export const setWorkType = (workType: "private" | "public") => {
  sessionStorage.setItem("kennon-work-type", workType);
};
