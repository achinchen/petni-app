import type { AttributifyOptions } from '@unocss/preset-attributify';
import { NavLink } from '@remix-run/react';
import { Fragment, useState } from 'react';
import Icon from '~/components/common/Icon';
import Label from './Label';
import { ACTIONS } from './constants';

type Props = {
  withLabel?: boolean;
} & AttributifyOptions;

type Index = number;

export default function Links({
  withLabel = false,
  ...attributifyOptions
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<Index>(-1);

  const onMouseEnter = (index: Index) => () => setHoveredIndex(index);
  const onMouseLeave = () => setHoveredIndex(-1);

  const getHovered = (index: Index) => index === hoveredIndex;

  return (
    <div flex="~" ml="auto" bg="white" {...attributifyOptions}>
      {ACTIONS.map(({ icon, label, to }, index) => (
        <NavLink
          key={to}
          to={to}
          display="flex"
          justify="center"
          items="center"
          w="24"
          {...(!withLabel && { w: '100%' })}
          text="no-underline"
          onMouseEnter={onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
        >
          {({ isActive }) => (
            <Fragment>
              <Icon
                size="md"
                icon={icon}
                label={withLabel ? '' : label}
                color={isActive ? 'status-active' : 'status-general'}
              />
              {withLabel && (
                <Label isActive={isActive} hovered={getHovered(index)}>
                  {label}
                </Label>
              )}
            </Fragment>
          )}
        </NavLink>
      ))}
    </div>
  );
}
