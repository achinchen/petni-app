import DistrictSelect from '~/components/common/DistrictSelect';
import Input from '~/components/common/Input';
import Textarea from '~/components/common/Textarea';
import Card from '~/features/adoption/create/Card';
import RequiredLabel from '~/features/adoption/create/RequiredLabel';
import { CONTACT_OPTION, NOTE_OPTION } from './constants';

export default function OtherInfo({ children }: { children: JSX.Element }) {
  const onDistrictSelect = (payload: any) => {};

  return (
    <div flex="~ col" w="lg:78" gap="4">
      <Card>
        <fieldset flex="1">
          <legend>
            {CONTACT_OPTION.LABEL}
            <RequiredLabel />
            <Input placeholder={CONTACT_OPTION.TEL_PLACEHOLDER} />
          </legend>
          <DistrictSelect onFinish={onDistrictSelect} />
        </fieldset>
      </Card>
      <Card>
        <fieldset flex="1">
          <legend>
            {NOTE_OPTION.LABEL}
            <Textarea placeholder={NOTE_OPTION.PLACEHOLDER} rows="4" />
          </legend>
        </fieldset>
      </Card>
      {children}
    </div>
  );
}
