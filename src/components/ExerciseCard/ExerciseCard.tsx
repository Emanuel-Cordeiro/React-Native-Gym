/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

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

        <VStack flex={1}>
          <Heading
            numberOfLines={1}
            w={64}
            color={'white'}
            fontSize={'lg'}
            fontFamily={'heading'}>
            {data.name}
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'} mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
          <FontAwesomeIcon icon={faChevronRight} color="#C4C4CC" />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  );
}
