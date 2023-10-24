export default function getStarsRating(rating) {
  let result;
  if (rating) {
    result = Math.round((parseInt(rating, 10) / 20) * 10) / 10;
  } else {
    result = "NA";
  }
  return result;
}
