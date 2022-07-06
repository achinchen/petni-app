import Button from '~/components/common/Button';
import { useCreateAdoptionContext } from '~/features/adoption/create/context';

const UPDATE_IMAGE = '替換照片';

export default function Photo() {
  const { imageUrl } = useCreateAdoptionContext();

  return (
    <div flex="~ col" w="60" h="90" p="4" bg="md:white" border="rounded-3xl">
      <div
        w="100%"
        h="100%"
        border="rounded-2xl"
        bg="center cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Button
        mt="3"
        h="12.5"
        bg="status-active"
        color="white"
        border="rounded-2xl"
        onClick={() => {}}
      >
        {UPDATE_IMAGE}
      </Button>
    </div>
  );
}
