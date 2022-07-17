import type { SimpleAnimal } from '~/models/animal/type';
import type { User } from '@prisma/client';
import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useFetcher, useNavigate } from '@remix-run/react';
import AnimalCards from '~/components/common/AnimalCards';
import Loading from '~/components/common/LoadingAnimation';
import Icon from '~/components/common/Icon';
import { HeaderPortal } from '~/components/common/Layout/Header';
import { TITLE, UPLOAD_IMAGE_PLACEHOLDER, IMAGE_EXTENSION } from './constants';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import useUploadImage from './hooks/useUploadImage';
import LoginPanel from '~/components/common/LoginPanel';

type Props = {
  user: User | null;
};

export default function Adoption({ user }: Props) {
  const [animals, setAnimals] = useState<SimpleAnimal[]>([]);
  const navigator = useNavigate();
  const [isOpenAuth, setOpenAuth] = useState(false);

  const onUploadImageFinish = () => navigator('/adoption/create');

  const { onUpload, isLoading: isUploadLoading } = useUploadImage({
    onFinish: onUploadImageFinish
  });

  const onCloseAuth = () => setOpenAuth(false);

  const onInputClick = (event: MouseEvent<HTMLInputElement>) => {
    if (user) return;
    event.preventDefault();
    setOpenAuth(true);
  };

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const onDeleteAnimal = (targetId: number) => {
    // onDelete(targetId);
    // removeDeletedAnimals(targetId);
  };

  return (
    <main className="content-width" m="4 lg:auto" pt="10">
      <LoginPanel isOpen={isOpenAuth} onClose={onCloseAuth} />
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      {isLoading ? (
        <Loading />
      ) : (
        animals && (
          <AnimalCards animals={[]} onDelete={onDeleteAnimal}>
            <label
              flex="~ col 1"
              justify="center"
              items="center"
              color="status-active"
              bg="transparent"
              htmlFor="image"
              cursor="pointer"
              {...(isUploadLoading && { style: { cursor: 'disabled' } })}
            >
              <input
                type="file"
                id="image"
                accept={IMAGE_EXTENSION}
                display="none"
                onClick={onInputClick}
                onChange={onUpload}
                disabled={isUploadLoading}
              />
              <Icon w="11" mb="2" icon="AddCircleOutline" />
              {UPLOAD_IMAGE_PLACEHOLDER}
            </label>
          </AnimalCards>
        )
      )}
    </main>
  );
}
