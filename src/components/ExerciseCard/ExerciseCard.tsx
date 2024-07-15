import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base';

import { api } from '../../services/api';

import { ExerciseDTO } from '../../dto/ExerciseDTO';

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        alignItems={'center'}
        bg={'gray.500'}
        rounded={'md'}
        p={2}
        pr={4}
        mb={3}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Remada unilateral"
          resizeMode="cover"
          rounded={'md'}
          w={16}
          h={16}
          mr={4}
        />

        <VStack>
          <Heading color={'white'} fontSize={'lg'}>
            {data.name}
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'} mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        {/* <Icon as={Entypo} name="chevron-thin-right" /> */}
      </HStack>
    </TouchableOpacity>
  );
}
