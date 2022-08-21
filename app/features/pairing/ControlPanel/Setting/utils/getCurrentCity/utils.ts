const MATCH_REGEX = /<ctyName>(\w?.*)<\/ctyName>/;
export const ENDPOINT = 'https://api.nlsc.gov.tw/other/TownVillagePointQuery';

type Geolocation = {
  longitude: number;
  latitude: number;
} | null;

export function getGeolocation(): Promise<Geolocation> {
  return new Promise((resolve) => {
    try {
      if (!navigator.geolocation) throw Error('Not support geolocation');
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          return resolve({
            latitude,
            longitude
          });
        },
        undefined,
        {
          timeout: 10_000
        }
      );
    } catch (error) {
      console.error(error);
      return resolve(null);
    }
  });
}

export const getCityFromAddressXML = (payload: string): string => {
  const result = payload.match(MATCH_REGEX);
  if (!result) return '';
  return result[1];
};

export async function fetchAddressXMLByGeolocation(
  geolocation: Geolocation
): Promise<string> {
  if (!geolocation) return '';

  try {
    const { longitude, latitude } = geolocation;
    const response = await fetch(`${ENDPOINT}/${longitude}/${latitude}`);
    return response.text();
  } catch {
    return '';
  }
}
