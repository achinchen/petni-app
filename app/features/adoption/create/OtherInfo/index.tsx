import type { Payload as DistrictPayload } from '~/components/common/DistrictSelect';
import Input from '~/components/common/Input';
import Textarea from '~/components/common/Textarea';
import Card from '~/features/adoption/create/Card';
import RequiredLabel from '~/features/adoption/create/RequiredLabel';
import DistrictSelect from '~/components/common/DistrictSelect';
import { useCreateAdoptionContext } from '~/features/adoption/create/context';
import { CONTACT_OPTION, NOTE_OPTION } from './constants';

export default function OtherInfo({ children }: { children: JSX.Element }) {
  const { otherInfo, dispatchOtherInfo } = useCreateAdoptionContext();

  const { contact, note } = otherInfo;

  const onDistrictSelect = ({ country, district }: DistrictPayload) => {
    dispatchOtherInfo({ type: 'location', value: `${country}${district}` });
  };

  const onContactChange = (value: string) => {
    dispatchOtherInfo({ type: 'contact', value });
  };

  const onNoteChange = (value: string) => {
    dispatchOtherInfo({ type: 'note', value });
  };

  return (
    <div flex="~ col" w="lg:78" gap="4">
      <Card>
        <fieldset flex="1">
          <legend>
            {CONTACT_OPTION.LABEL}
            <RequiredLabel />
            <Input
              value={contact}
              placeholder={CONTACT_OPTION.TEL_PLACEHOLDER}
              onValueChange={onContactChange}
            />
          </legend>
          <DistrictSelect onFinish={onDistrictSelect} />
        </fieldset>
      </Card>
      <Card>
        <fieldset flex="1">
          <legend>
            {NOTE_OPTION.LABEL}
            <Textarea
              rows="4"
              value={note}
              placeholder={NOTE_OPTION.PLACEHOLDER}
              onValueChange={onNoteChange}
            />
          </legend>
        </fieldset>
      </Card>
      {children}
    </div>
  );
}
