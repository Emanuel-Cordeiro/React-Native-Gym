import React, { useState } from 'react';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  Toast,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { UserPhoto } from '../../components/UserPhoto/UserPhoto';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';

const PHOTO_SIZE = 33;

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/Emanuel-Cordeiro.png',
  );

  async function handleUserPhotoSelect() {
    setLoading(true);

    try {
      await ImagePicker.launchImageLibrary({ mediaType: 'mixed' }, response => {
        let uri = '';

        if (response?.assets) {
          uri = response?.assets[0].uri ?? '';
        }

        return setUserPhoto(uri);
      });
    } catch (error) {
      Toast.show({ title: 'Erro ao carregar imagem \n' + error });
    } finally {
      setLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
            fontFamily={'heading'}
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
