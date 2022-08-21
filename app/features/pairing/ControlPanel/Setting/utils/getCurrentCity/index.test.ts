import * as utils from './utils';
import getCurrentCity from '.';

import * as ControlPanelUtils from '~/features/pairing/ControlPanel/utils';
jest.spyOn(ControlPanelUtils, 'setLocationCity');

const city = '臺北市';

const xml = `<townVillageItem>
<ctyCode>A</ctyCode>
<ctyName>${city}</ctyName>
<townCode>A10</townCode>
<townName>中山區</townName>
<officeCode>AC</officeCode>
<officeName>中山</officeName>
<sectCode>0402</sectCode>
<sectName>中山段三小段</sectName>
<villageCode>63000040006</villageCode>
<villageName>中山里</villageName>
</townVillageItem>`;

const geolocation = {
  longitude: 200,
  latitude: 201
};

describe('getCurrentCity', () => {
  jest.spyOn(utils, 'getGeolocation').mockResolvedValue(geolocation);
  jest.spyOn(utils, 'fetchAddressXMLByGeolocation').mockResolvedValue(xml);
  jest.spyOn(utils, 'getCityFromAddressXML');

  beforeEach(async () => {
    await getCurrentCity();
  });

  test('call getGeolocation', async () => {
    expect(utils.getGeolocation).toBeCalled();
  });

  test('call fetchAddressXMLByGeolocation', () => {
    expect(utils.fetchAddressXMLByGeolocation).toBeCalledWith(geolocation);
  });

  test('call getCityFromAddressXML', () => {
    expect(utils.getCityFromAddressXML).toBeCalledWith(xml);
  });

  test('call setLocation', () => {
    expect(ControlPanelUtils.setLocationCity).toBeCalledWith(city);
  });
});
