import { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BackButton } from '../components/BackButton';
import { CheckBox } from '../components/CheckBox';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function New() {
  const [title, setTitle] = useState('');
  const [weekdays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekdays.length === 0) {
        return Alert.alert('Novo hábito', 'Informe o nome do hábito e escolha a periodicidade')
      }

      await api.post('habits', { title, weekdays });
      setTitle('');
      setWeekDays([]);

      Alert.alert('Novo hábito', 'Hábito criado com sucesso')
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível criar o novo hábito')
    }
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekdays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>
        {/* Gerando Checkbox para cada dia da semana */}
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            onPress={() => handleToggleWeekDay(index)}
            checked={weekdays.includes(index)}
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
