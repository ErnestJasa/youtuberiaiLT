export const formatNumber = (number) => {
  let formattedNum = number;
  if (number < 1000) {
    return formattedNum;
  } else if (number >= 1000 && number < 1_000_000) {
    return roundToPrecision((number / 1000).toFixed(2), 100) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return roundToPrecision((number / 1_000_000).toFixed(2), 100) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return roundToPrecision((number / 1_000_000_000).toFixed(2), 100) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return roundToPrecision((number / 1_000_000_000_000).toFixed(2), 100) + "T";
  }
};

export const formatRatio = (ratio) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};

function roundToPrecision(num, delimiter) {
  return Math.round(num * delimiter) / delimiter;
}
