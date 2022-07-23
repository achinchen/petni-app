const MATCH_REGEX = /<ctyName>(\w?.*)<\/ctyName>/;
const ENDPOINT = 'https://api.nlsc.gov.tw/other/TownVillagePointQuery/';

type Geolocation = {
  longitude: number;
  latitude: number;
} | null;

export function getGeolocation(): Geolocation {
  try {
    if (!navigator.geolocation) throw Error('Not support geolocation');
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        return {
          latitude,
          longitude
        };
      }
    );
    throw Error('Not provide geolocation');
  } catch {
    return null;
  }
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

export async function getCurrentCity() {
  const geolocation = getGeolocation();
  const addressXML = await fetchAddressXMLByGeolocation(geolocation);
  const city = getCityFromAddressXML(addressXML);
  return city;
}
