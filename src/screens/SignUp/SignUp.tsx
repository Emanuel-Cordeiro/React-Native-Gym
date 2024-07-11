import React from 'react';
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
import { AppError } from '../../utils/AppError';

import LogoSvg from '../../assets/images/logo.svg';
import BackgroundImage from '../../assets/images/background.png';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import { AuthNavigatorRoutesProps } from '../../routes/Auth/Auth';

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
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

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

    let response;

    try {
      response = await api.post('/users', body);
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
    }

    console.log(response);
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
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Senha"
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Confirmar senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title={'Criar e acessar'}
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title={'Voltar para o login'}
          variant={'outline'}
          mt={12}
          onPress={handleReturnSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
