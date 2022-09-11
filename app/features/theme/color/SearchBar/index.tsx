import type { AttributifyOptions } from '@unocss/preset-attributify';
import { Link } from '@remix-run/react';
import Icon, { Search } from '~/components/common/Icon';

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
      <Icon
        role="presentation"
        display="flex"
        content="center"
        justify="center"
        w="10"
        h="10"
        p="1"
        border="rounded-2xl"
        bg="black"
        color="white"
        icon={Search}
      />
    </Link>
  );
}
