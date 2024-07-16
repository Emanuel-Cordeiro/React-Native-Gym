import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Bodysvg from '../../assets/images/body.svg';
import SeriesSvg from '../../assets/images/series.svg';
import RepetitionsSvg from '../../assets/images/repetitions.svg';

import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';
import { ExerciseDTO } from '../../dto/ExerciseDTO';
import { AppNavigatorRoutesProps } from '../../routes';

import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/Loading/Loading';

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercises() {
  const route = useRoute();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitingRegister, setIsSubmitingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.navigate('home');
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);

      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios. Tente novamente mais tarde.';

      toast.show({ title, placement: 'top', bgColor: 'red.500' });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setIsSubmitingRegister(true);

      await api.post('/history', { exercise_id: exerciseId });

      toast.show({
        title: 'Exercício registrado com sucesso.',
        bgColor: 'green.500',
        placement: 'top',
      });

      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível registrar os exercícios. Tente novamente mais tarde.';

      toast.show({ title, placement: 'top', bgColor: 'red.500' });
    } finally {
      setIsSubmitingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId]);

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
            {exercise.name}
          </Heading>

          <HStack alignItems={'center'}>
            <Bodysvg />
            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded={'lg'} mb={3} overflow="hidden">
              <Image
                w={'full'}
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                resizeMode="cover"
                alt="Imagem do exercício"
              />
            </Box>
            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml="2">
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml="2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={isSubmitingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
