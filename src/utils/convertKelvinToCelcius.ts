export function convertKelvinToCelcius(temptInKelvin: number) {
  const temptInCelcius = temptInKelvin - 273.15;
  return Math.floor(temptInCelcius);
}
