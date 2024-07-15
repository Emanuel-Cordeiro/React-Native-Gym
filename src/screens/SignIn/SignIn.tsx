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
  const { signIn } = useAuth();
  const toast = useToast();
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
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          resizeMode="contain"
          position={'absolute'}
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
            color={'gray.100'}
            fontSize={'xl'}
            mb={6}
            fontFamily={'heading'}>
            Acesse sua conta
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            isLoading={isLoading}
            title={'Acessar'}
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>

        <Center mt={24}>
          <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          title={'Criar conta'}
          variant={'outline'}
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}
