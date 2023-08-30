export default function getStarsRating(rating) {
  const result = Math.round((parseInt(rating) / 20) * 10) / 10;
  return result;
}
