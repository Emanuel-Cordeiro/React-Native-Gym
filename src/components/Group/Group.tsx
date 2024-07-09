import React from 'react';
import { IPressableProps, Pressable, Text } from 'native-base';

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
      bg={'gray.600'}
      rounded={'md'}
      mr={3}
      h={10}
      w={24}
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
      {...rest}>
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform={'uppercase'}
        fontWeight={'bold'}
        fontSize={'xs'}>
        {name}
      </Text>
    </Pressable>
  );
}
