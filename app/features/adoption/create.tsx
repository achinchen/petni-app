import { HeaderPortal } from '~/components/common/Layout/Header';
import placeholder from '~/assets/images/placeholder.jpg';
import Button from '~/components/common/Button';

const TITLE = '送養';
const BUTTON = {
  UPDATE_IMAGE: '替換照片'
};

export default function CreateAdoption() {
  return (
    <main className="content-width" m="4 lg:auto" py="4">
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      <div>
        <div flex="~ col" w="60" h="90" p="4" bg="white" border="rounded-3xl">
          <div
            w="100%"
            h="100%"
            border="rounded-2xl"
            bg="center cover"
            style={{ backgroundImage: `url(${placeholder})` }}
          />
          <Button
            mt="3"
            h="12.5"
            bg="status-active"
            color="white"
            border="rounded-2xl"
            onClick={() => {}}
          >
            {BUTTON.UPDATE_IMAGE}
          </Button>
        </div>
      </div>
    </main>
  );
}
