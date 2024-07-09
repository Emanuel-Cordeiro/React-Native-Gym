import React from 'react';
import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      placeholderTextColor={'gray.300'}
      fontFamily={'body'}
      bg={'gray.700'}
      fontSize={'md'}
      color={'white'}
      borderWidth={0}
      h={14}
      px={4}
      mb={4}
      _focus={{
        bgColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  );
}
