import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';

import { UserPhoto } from '../UserPhoto/UserPhoto';

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        size={16}
        source={{ uri: 'https://github.com/Emanuel-Cordeiro.png' }}
        alt="Foto de perfil do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>
        <Heading color={'gray.100'} fontSize={'md'} fontFamily={'heading'}>
          Emanuel
        </Heading>
      </VStack>

      <TouchableOpacity style={{ backgroundColor: 'gray' }}>
        <Text>...</Text>
      </TouchableOpacity>
    </HStack>
  );
}
