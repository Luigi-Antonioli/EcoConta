import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const historico = [
  { id: 1, data: '10/06/2026', agua: '12', energia: '150' },
  { id: 2, data: '08/06/2026', agua: '10', energia: '130' },
  { id: 3, data: '05/06/2026', agua: '15', energia: '170' },
];

export default function HistoricoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Histórico</Text>
          <Text style={styles.subtitle}>Registros cadastrados</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {historico.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.data}>📅 {item.data}</Text>
            <Text style={styles.info}>💧 Água: {item.agua} m³</Text>
            <Text style={styles.info}>⚡ Energia: {item.energia} kWh</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A4FA6',
  },
  header: {
    backgroundColor: '#0A4FA6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backBtn: {
    marginRight: 15,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#C8DEF8',
    fontSize: 12,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F6FF',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },
  data: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
});