import { Form } from '@remix-run/react';
import Panel from '~/components/common/Panel';
import { TITLE, CANCEL, OAUTH_PROVIDER } from './constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginPanel({ onClose, isOpen = false }: Props) {
  return (
    <Panel title={TITLE} isOpen={isOpen} w="100">
      <menu max-w="76" flex="~ col" justify="between" mt="6" p="0">
        <Form action="/api/auth/google" method="post">
          <button
            flex="~"
            py="2"
            px="4"
            w="100%"
            h="100%"
            justify="center"
            items="center"
            bg="black"
            color="white"
            rounded="md"
            text="base center"
          >
            <img src={OAUTH_PROVIDER.GOOGLE.ICON} alt="Google Logo" mr="4" />
            {OAUTH_PROVIDER.GOOGLE.CONTENT}
          </button>
        </Form>
        <button
          onClick={onClose}
          py="2"
          px="4"
          mt="4"
          text="base"
          rounded="md"
          bg="status-general"
          color="black"
        >
          {CANCEL}
        </button>
      </menu>
    </Panel>
  );
}
