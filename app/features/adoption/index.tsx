import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import type { MouseEvent } from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from '@remix-run/react';
import AnimalCards from '~/components/common/AnimalCards';
import Icon, { OutlineCircleAdd } from '~/components/common/Icon';
import { HeaderPortal } from '~/components/common/Layout/Header';
import { TITLE, UPLOAD_IMAGE_PLACEHOLDER, IMAGE_EXTENSION } from './constants';
import useUploadImage from './hooks/useUploadImage';
import useDeleteAnimal from './hooks/useDeleteAnimal';
import LoginPanel from '~/components/common/LoginPanel';

type Props = {
  user: User | null;
  animals: Animal[] | null;
};

export default function Adoption({ user, animals }: Props) {
  const navigator = useNavigate();
  const [isOpenAuth, setOpenAuth] = useState(false);

  const onFinish = useCallback(
    () => navigator('/adoption/create'),
    [navigator]
  );

  const { onUpload, isLoading: isUploadLoading } = useUploadImage({
    onFinish
  });

  const { onDelete } = useDeleteAnimal();

  const onCloseAuth = () => setOpenAuth(false);

  const onClick = (event: MouseEvent<HTMLLabelElement>) => {
    if (user) return;
    event.preventDefault();
    setOpenAuth(true);
  };

  return (
    <main className="content-width" m="4 lg:auto" pt="10">
      <LoginPanel isOpen={isOpenAuth} onClose={onCloseAuth} />
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      {animals && (
        <AnimalCards animals={animals} onDelete={onDelete}>
          <label
            flex="~ col 1"
            justify="center"
            items="center"
            color="status-active"
            bg="transparent"
            htmlFor="image"
            cursor="pointer"
            onClick={onClick}
            {...(isUploadLoading && { style: { cursor: 'disabled' } })}
          >
            <input
              type="file"
              data-testid="input"
              id="image"
              accept={IMAGE_EXTENSION}
              display="none"
              onChange={onUpload}
              disabled={isUploadLoading}
            />
            <Icon
              mb="2"
              size="lg"
              color="status-active"
              icon={OutlineCircleAdd}
            />
            {UPLOAD_IMAGE_PLACEHOLDER}
          </label>
        </AnimalCards>
      )}
    </main>
  );
}
