import React from 'react';
import { Heading, HStack, Text, VStack } from 'native-base';

export function HistoryCard() {
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
          color={'white'}
          fontSize={'md'}
          fontFamily={'heading'}
          numberOfLines={1}>
          Costas
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        08:56
      </Text>
    </HStack>
  );
}
