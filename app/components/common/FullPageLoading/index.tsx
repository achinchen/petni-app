import Logo from '~/components/common/Logo';
import { CREDITS } from './constants';

export default function FullPageLoading() {
  return (
    <div min-h="screen">
      <Logo
        position="relative"
        display="block"
        m="auto"
        w="35.5 md:46.5"
        top="41 md:67"
      />
      <h6
        position="absolute"
        m="0"
        bottom="4 md:5"
        w="100%"
        text="center"
        font="normal"
      >
        {CREDITS}
      </h6>
    </div>
  );
}
