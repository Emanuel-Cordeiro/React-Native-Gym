import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Bodysvg from '../../assets/images/body.svg';
import SeriesSvg from '../../assets/images/series.svg';
import RepetitionsSvg from '../../assets/images/repetitions.svg';

import { AppNavigatorRoutesProps } from '../../routes';

import { Button } from '../../components/Button/Button';

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercises() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.navigate('home');
  }
  return (
    <VStack flex={1}>
      <VStack px={8} bg={'gray.600'} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text color={'green.500'}>.....</Text>
        </TouchableOpacity>

        <HStack
          justifyContent={'space-between'}
          mt={4}
          mb={8}
          alignItems={'center'}>
          <Heading
            color={'gray.100'}
            fontSize={'lg'}
            flexShrink={1}
            fontFamily={'heading'}>
            Puxada Frontal
          </Heading>

          <HStack alignItems={'center'}>
            <Bodysvg />
            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w={'full'}
            h={80}
            source={{
              uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
            }}
            rounded={'lg'}
            resizeMode="cover"
            mb={3}
            alt="Imagem do exercício"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
