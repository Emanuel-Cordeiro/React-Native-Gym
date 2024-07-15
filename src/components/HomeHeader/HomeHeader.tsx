import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';

import { UserPhoto } from '../UserPhoto/UserPhoto';
import { useAuth } from '../../hooks/useAuth';

import defaultUserPhotoImg from '../../assets/images/userPhotoDefault.png';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        size={16}
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        alt="Foto de perfil do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>
        <Heading color={'gray.100'} fontSize={'md'} fontFamily={'heading'}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut} style={{ backgroundColor: 'gray' }}>
        <Text>...</Text>
      </TouchableOpacity>
    </HStack>
  );
}
