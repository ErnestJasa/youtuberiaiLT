export function removeFromArray(array, element) {
  array = array.filter((el) => el !== element);
  return array;
}
