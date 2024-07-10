import React from 'react';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '../../assets/images/logo.svg';
import BackgroundImage from '../../assets/images/background.png';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '../../routes/Auth/Auth';
import { Controller, useForm } from 'react-hook-form';

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit } = useForm();

  function handleReturnSignIn() {
    navigation.navigate('signIn');
  }

  function handleSignUp(data: any) {
    console.log(data);
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
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
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
          mt={24}
          onPress={handleReturnSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
