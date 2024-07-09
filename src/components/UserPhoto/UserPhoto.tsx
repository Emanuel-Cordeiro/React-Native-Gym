import React from 'react';
import { IImageProps, Image } from 'native-base';

type Props = IImageProps & {
  size: number;
};
export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image
      borderColor={'gray.400'}
      rounded={'full'}
      borderWidth={2}
      w={size}
      h={size}
      {...rest}
    />
  );
}
