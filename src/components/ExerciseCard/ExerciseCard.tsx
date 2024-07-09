import React from 'react';
import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  name: string;
  instructions: string;
};

export function ExerciseCard({ name, instructions, ...rest }: Props) {
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
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
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
            {name}
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'} mt={1} numberOfLines={2}>
            {instructions}
          </Text>
        </VStack>

        {/* <Icon as={Entypo} name="chevron-thin-right" /> */}
      </HStack>
    </TouchableOpacity>
  );
}
