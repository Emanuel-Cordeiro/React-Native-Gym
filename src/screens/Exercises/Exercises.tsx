import React from 'react';
import { Box, Heading, HStack, Image, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes';
import Bodysvg from '../../assets/images/body.svg';
import Seriessvg from '../../assets/images/series.svg';
import Repetitionssvg from '../../assets/images/repetitions.svg';

export function Exercises() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

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
          <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1}>
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
      {/* teste */}
      <VStack p={8}>
        <Image
          w={'full'}
          h={80}
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          rounded={'lg'}
          alt="Imagem do exercício"
        />

        <Box>
          <HStack>
            <Seriessvg />
            <Text color={'gray.200'} ml={2}>
              3 séries
            </Text>
          </HStack>

          <HStack>
            <Seriessvg />
            <Text color={'gray.200'} ml={2}>
              3 séries
            </Text>
          </HStack>
        </Box>
      </VStack>
    </VStack>
  );
}
