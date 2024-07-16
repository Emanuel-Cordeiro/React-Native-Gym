/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  Toast,
  useToast,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import * as ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/useAuth';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { UserPhoto } from '../../components/UserPhoto/UserPhoto';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { AppError } from '../../utils/AppError';
import { api } from '../../services/api';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  confirm_password?: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform(value => (value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform(value => (value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required('Informe a confirmação de senha')
        .transform(value => (value ? value : null)),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/Emanuel-Cordeiro.png',
  );
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setIsPhotoLoading(true);

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

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;

      userUpdated.name = data.name;

      await api.put('/users', data);

      updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente.';

      setIsUpdating(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center px={10} mt={6}>
          {isPhotoLoading ? (
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

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg={'gray.600'}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                isDisabled
                bg={'gray.600'}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
            fontFamily={'heading'}
            alignSelf={'flex-start'}
            mt={12}>
            Alterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                bg={'gray.600'}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha nova"
                secureTextEntry
                bg={'gray.600'}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a senha nova"
                secureTextEntry
                bg={'gray.600'}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
