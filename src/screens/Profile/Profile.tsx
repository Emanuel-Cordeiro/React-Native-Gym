import React, { useState } from 'react';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { UserPhoto } from '../../components/UserPhoto/UserPhoto';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';

const PHOTO_SIZE = 33;

export function Profile() {
  const [loading, setLoading] = useState(true);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center px={10} mt={6}>
          {loading ? (
            <Skeleton
              h={PHOTO_SIZE}
              w={PHOTO_SIZE}
              rounded={'full'}
              startColor={'gray.500'}
              endColor={'gray.400'}
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/Emanuel-Cordeiro.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              color={'green.500'}
              fontWeight={'bold'}
              fontSize={'md'}
              mt={2}
              mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={'gray.600'} />
          <Input placeholder="E-mail" isDisabled bg={'gray.600'} />
          <Input placeholder="Nome" bg={'gray.600'} />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
            alignSelf={'flex-start'}
            mt={12}>
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry bg={'gray.600'} />
          <Input placeholder="Senha nova" secureTextEntry bg={'gray.600'} />
          <Input
            placeholder="Confirme a senha nova"
            secureTextEntry
            bg={'gray.600'}
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
