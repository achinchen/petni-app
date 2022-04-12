import { NavLink } from 'remix';
import { Fragment, useState } from 'react';
import { AttributifyOptions } from '@unocss/preset-attributify';
import type { IsActive } from './types';
import type { IconType } from '~/components/common/Icon';
import Icon from '~/components/common/Icon';
import Label from './label';
import { Actions } from './constants';

type Props = {
  withLabel?: boolean;
} & AttributifyOptions;

type Index = number;

export default function NavigationLinks({
  withLabel = false,
  ...attributifyOptions
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<Index>(-1);

  const onMouseEnter = (index: Index) => () => setHoveredIndex(index);
  const onMouseLeave = () => setHoveredIndex(-1);

  const getHovered = (index: Index) => index === hoveredIndex;

  const getIcon = (icon: string, isActive: IsActive) => {
    return (isActive ? `${icon}Active` : icon) as IconType;
  };

  return (
    <div flex="~" ml="auto" bg="white" {...attributifyOptions}>
      {Actions.map(({ icon, label, to }, index) => (
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
              <Icon w="9" icon={getIcon(icon, isActive)} />
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
