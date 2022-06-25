import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { debounce } from 'debounce';
import Input from '~/components/common/Input';
import Select from '~/components/common/Select';

const DEBOUNCE_BLUR_TIMER = 300;

type Option = string;

type Props = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  onSelect: (option: Option) => void;
};

export default function DistrictSelection({
  placeholder = '',
  disabled = false,
  onSelect,
  options
}: Props) {
  const [input, setInput] = useState('');
  const [isSelectOpen, setSelectOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!input) return options;
    return options.filter((option) => option.includes(input));
  }, [input, options]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  const onInputFocus = () => setSelectOpen(true);
  const onInputBlur = debounce(() => setSelectOpen(false), DEBOUNCE_BLUR_TIMER);

  useEffect(() => onSelect(input), [input, onSelect]);

  return (
    <label position="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        disabled={disabled}
      />
      <Select
        show={isSelectOpen}
        options={filteredOptions}
        placeholder={placeholder}
        onChange={setInput}
      />
    </label>
  );
}