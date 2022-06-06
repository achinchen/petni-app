import type { AttributifyOptions } from '@unocss/preset-attributify';
import { Link } from '@remix-run/react';
import Icon from '~/components/common/Icon';

type Props = {
  search: string;
  label: string;
} & AttributifyOptions;

export default function SearchBar({
  search,
  label,
  ...attributifyOptions
}: Props) {
  return (
    <Link
      flex="inline"
      items="center"
      justify="between"
      w="48"
      px="3"
      py="1"
      border="rounded-2xl"
      bg="white"
      shadow="default"
      to={`/?search=${search}`}
      {...attributifyOptions}
    >
      <span ml="4">搜尋{label}</span>
      <span
        display="flex"
        content="center"
        justify="center"
        w="9"
        h="9"
        border="rounded-2xl"
        bg="black"
      >
        <Icon icon="Search" />
      </span>
    </Link>
  );
}
