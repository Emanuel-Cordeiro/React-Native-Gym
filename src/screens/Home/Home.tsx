/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '../../routes';

import { api } from '../../services/api';

import { AppError } from '../../utils/AppError';

import { Group } from '../../components/Group/Group';
import { Loading } from '../../components/Loading/Loading';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { ExerciseCard } from '../../components/ExerciseCard/ExerciseCard';

export function Home() {
  const toast = useToast();
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercises', { exerciseId });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const response = await api.get('/groups');

      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos. Tente novamente mais tarde.';

      toast.show({ title, placement: 'top', bgColor: 'red.500' });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchExercisesByGroup() {
    try {
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios. Tente novamente mais tarde.';

      toast.show({ title, placement: 'top', bgColor: 'red.500' });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected]),
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        horizontal
        // eslint-disable-next-line react-native/no-inline-styles
        _contentContainerStyle={{ px: 8 }}
        my={10}
        minH={10}
        maxH={10}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={'space-between'} mb={5}>
            <Heading color={'gray.200'} fontSize={'md'} fontFamily={'heading'}>
              Exercícios
            </Heading>

            <Text color={'gray.200'} fontSize={'sm'}>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={exercise => exercise.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            // eslint-disable-next-line react-native/no-inline-styles
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
