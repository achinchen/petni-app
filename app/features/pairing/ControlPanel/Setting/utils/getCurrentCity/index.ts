import { setLocationCity } from '~/features/pairing/ControlPanel/utils';
import {
  getGeolocation,
  fetchAddressXMLByGeolocation,
  getCityFromAddressXML
} from './utils';

export default async function getCurrentCity() {
  const geolocation = await getGeolocation();
  const addressXML = await fetchAddressXMLByGeolocation(geolocation);
  const city = getCityFromAddressXML(addressXML);
  setLocationCity(city);
}
