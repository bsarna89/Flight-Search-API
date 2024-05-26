export default function getImageFromCopy(city, copy) {
  const name = city.split(" ").join("");
  return copy[name];
}
