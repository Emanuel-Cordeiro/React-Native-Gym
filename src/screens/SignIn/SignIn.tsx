import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from 'native-base';

import { AuthNavigatorRoutesProps } from '../../routes/Auth/Auth';

import { useAuth } from '../../hooks/useAuth';

import { AppError } from '../../utils/AppError';

import LogoSvg from '../../assets/images/logo.svg';
import BackgroundImage from '../../assets/images/background.png';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

type FormDataSignIn = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.'),
});

export function SignIn() {
  const toast = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignIn>({
    resolver: yupResolver(signInSchema),
  });

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn(data: FormDataSignIn) {
    try {
      setIsLoading(true);

      await signIn(data.email, data.password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar agora. Tente novamente.';

      setIsLoading(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16}>
        <Image
          defaultSource={BackgroundImage}
          resizeMode="contain"
          position={'absolute'}
          source={BackgroundImage}
          alt="Imagem de fundo de pessoas fazendo bicicleta na academia"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color={'gray.100'} fontSize={'sm'}>
            Treine a sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            fontFamily={'heading'}
            fontSize={'xl'}
            color={'gray.100'}
            mb={6}>
            Acesse sua conta
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
                value={value}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                secureTextEntry
                onChangeText={onChange}
                placeholder="Senha"
                errorMessage={errors.password?.message}
                value={value}
              />
            )}
          />

          <Button
            title={'Acessar'}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          variant={'outline'}
          onPress={handleNewAccount}
          title={'Criar conta'}
        />
      </VStack>
    </ScrollView>
  );
}
