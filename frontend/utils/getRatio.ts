const getRatio = (ratio: "full" | "1:1" | "3:4" | "4:3") => {
  switch (ratio) {
    case "full":
      return "full";
    case "1:1":
      return "square";
    case "3:4":
      return "portrait";
    case "4:3":
      return "landscape";
    default:
      return "full";
  }
};

export default getRatio;
