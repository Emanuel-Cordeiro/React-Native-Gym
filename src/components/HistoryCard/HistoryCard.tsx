import React from 'react';
import { Heading, HStack, Text, VStack } from 'native-base';

import { HistoryDTO } from '../../dto/HistoryDTO';

type Props = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: Props) {
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      rounded={'md'}
      bg={'gray.600'}
      w={'full'}
      px={5}
      py={4}
      mb={3}>
      <VStack mr={5} flex={1}>
        <Heading
          textTransform={'capitalize'}
          numberOfLines={1}
          fontFamily={'heading'}
          fontSize={'md'}
          color={'white'}>
          {data.group}
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        {data.hour}
      </Text>
    </HStack>
  );
}
