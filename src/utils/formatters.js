export const convertTemp = (temp, unit) => {
    if (unit === "F") return (temp * 9) / 5 + 32;
    return temp;
  };