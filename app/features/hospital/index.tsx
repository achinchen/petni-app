import Icon from '~/components/icon';
import { HeaderPortal } from '~/components/layout/header';
import HospitalCards from './cards';
import HospitalAreaPanel from './area-panel';
import HospitalAreaHashId from './area-hash-id';
import { useIntersectionObserver } from './hooks';
import type { City } from './constants';
import { CITY_LABEL, HOSPITALS, REMINDER } from './constants';
import { HospitalContextProvider } from './context';

function Hospital() {
  useIntersectionObserver();
  return (
    <main max-w="lg:262" m="auto" pb="4 lg:none">
      <HeaderPortal>
        <HospitalAreaPanel />
      </HeaderPortal>
      <HospitalAreaPanel
        isDesktop
        display="lt-md:none md:flex"
        justify="center"
        mt="10"
      />
      <div mt="3" mx="3 lg:none" text="right md:center sm">
        {REMINDER}
      </div>
      {Object.entries(HOSPITALS).map(([city, hospitals]) => (
        <section key={city} mx="4 lg:none" mt="8 lg:14">
          <HospitalAreaHashId city={city as City} />
          <h2 flex="~" text="lg" font="bold" mt="0" mb="2">
            <Icon icon="Location" />
            {CITY_LABEL[city as City]}
          </h2>
          <HospitalCards city={city as City} hospitals={hospitals} />
        </section>
      ))}
    </main>
  );
}

export default function HospitalWithContext() {
  return (
    <HospitalContextProvider>
      <Hospital />
    </HospitalContextProvider>
  );
}
