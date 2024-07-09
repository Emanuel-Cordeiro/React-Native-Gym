import React, { useState } from 'react';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '../../routes';

import { Group } from '../../components/Group/Group';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { ExerciseCard } from '../../components/ExerciseCard/ExerciseCard';

export function Home() {
  const [group, setGroups] = useState([
    'costas',
    'peito',
    'ombro',
    'perna',
    'braços',
  ]);
  const [exercises, setExercises] = useState([
    'Puxada Frontal',
    'Remada Baixa',
    'Trapézio',
    'Remada unilateral',
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercises');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={group}
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

      <VStack flex={1} px={8}>
        <HStack justifyContent={'space-between'} mb={5}>
          <Heading color={'gray.200'} fontSize={'md'}>
            Exercícios
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={exercise => exercise}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
              name={item}
              instructions={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          // eslint-disable-next-line react-native/no-inline-styles
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
