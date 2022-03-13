import { AttributifyOptions } from '@unocss/preset-attributify';
import { APP_NAME } from '~/constants';
import logo from '~/images/logo.gif';

export default function Logo(attributifyOptions: AttributifyOptions) {
  return <img src={logo} alt={`${APP_NAME} Logo`} {...attributifyOptions} />;
}
