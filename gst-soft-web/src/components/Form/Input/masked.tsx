import React, { useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask';

type MaskArray = (string | RegExp)[];
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

interface Props {
  mask: MaskArray | [MaskArray, MaskArray];
  startValue?: string;
  inputRef: (ref: HTMLInputElement | null) => void;
  onChange?(e: ChangeEvent): void;
  onKeyPress?(e: KeyboardEvent): void;
}

const Masked: React.FC<Props> = ({
  mask,
  startValue = null,
  inputRef,
  onChange = null,
  onKeyPress = null,
  ...other
}) => {
  const [isTwoMasks, setTwoMasks] = useState<boolean>(false);
  const [currentMask, setCurrentMask] = useState<MaskArray | boolean>(false);

  useEffect(() => {
    const twoMasks =
      !!mask &&
      mask.length > 0 &&
      !(mask[0] instanceof String || mask[0] instanceof RegExp);
    setTwoMasks(twoMasks);

    let startMask: MaskArray;
    if (twoMasks) {
      const m0 = mask[0] as MaskArray;
      if (startValue && startValue.length > m0.length) {
        startMask = mask[1] as MaskArray;
      } else {
        startMask = m0;
      }
    } else {
      startMask = mask as MaskArray;
    }
    setCurrentMask(startMask);
  }, [mask, startValue]);

  const handleChange = (e: ChangeEvent): void => {
    if (onChange) onChange(e);
    if (isTwoMasks) {
      const length = e.target.value?.trim().length;
      if (length) {
        const m = mask[0] as MaskArray;
        if (m?.length === length && m !== currentMask) {
          setCurrentMask(m);
        }
      }
    }
  };

  const handleKeyPress = (e: any): void => {
    if (onKeyPress) onKeyPress(e);
    if (isTwoMasks) {
      const length = e.target.value?.trim().length;
      if (length && !(currentMask instanceof Boolean)) {
        const m = mask[1] as MaskArray;
        const current = currentMask as MaskArray;
        if (length === current.length && m?.length > length && m !== current) {
          setCurrentMask(m);
        }
      }
    }
  };

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref?.inputElement || null);
      }}
      mask={currentMask}
      placeholderChar={'\u2000'}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      defaultValue={startValue}
    />
  );
};

export default Masked;
