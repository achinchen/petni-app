import { APP_NAME } from '~/constants';
import logo from '~/images/logo.gif';

export default function Logo(styleAttributes: StyleAttributes) {
  return <img src={logo} alt={`${APP_NAME} Logo`} {...styleAttributes} />;
}
