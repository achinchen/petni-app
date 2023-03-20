import type { AnimalInfo as Animal } from 'server/adapters/animal/index.presenter';
import { DEFAULT_META } from '~/constants/meta';
import { APP_NAME } from '~/constants';

type Parameters = {
  animal?: Animal;
  prefix?: {
    title?: string;
    description?: string;
  };
};

export default function getMetaByAnimals({ animal, prefix = {} }: Parameters): {
  title: string;
  description: string;
} {
  if (!animal) return DEFAULT_META;
  const { id, location } = animal;
  const { title = '', description = '' } = prefix;
  return {
    title: `${title}No.${id} ｜ ${APP_NAME} - 陪你找家`,
    description: `${description}No.${id} - 正在 ${location} 等家`
  };
}
