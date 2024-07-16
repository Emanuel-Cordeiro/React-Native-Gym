import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from 'native-base';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { AppError } from '../../utils/AppError';
import { AuthNavigatorRoutesProps } from '../../routes/Auth/Auth';

import LogoSvg from '../../assets/images/logo.svg';
import BackgroundImage from '../../assets/images/background.png';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ser de ao menos 6 dígitos'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
});

export function SignUp() {
  const toast = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleReturnSignIn() {
    navigation.navigate('signIn');
  }

  async function handleSignUp(data: FormDataProps) {
    const body = JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    try {
      setIsLoading(true);

      await api.post('/users', body);

      await signIn(data.email, data.password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível continuar. Tente novamente.';
      toast.show({
        title,
        bgColor: 'red.500',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
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
          alt="Imagem de fundo de pessoas se exercitando"
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
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                placeholder="Nome"
                value={value}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                autoCapitalize="none"
                onChangeText={onChange}
                keyboardType="email-address"
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
                errorMessage={errors.password?.message}
                placeholder="Senha"
                value={value}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                errorMessage={errors.password_confirm?.message}
                onChangeText={onChange}
                placeholder="Confirmar senha"
                returnKeyType="send"
                value={value}
              />
            )}
          />

          <Button
            title={'Criar e acessar'}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title={'Voltar para o login'}
          variant={'outline'}
          onPress={handleReturnSignIn}
          mt={12}
        />
      </VStack>
    </ScrollView>
  );
}
