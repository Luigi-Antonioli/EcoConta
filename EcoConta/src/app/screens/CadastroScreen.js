import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from "expo-router";

const REGEX = {
  numero: /^\d+(\.\d{1,2})?$/,
  data: /^\d{2}\/\d{2}\/\d{4}$/,
};

const ESTADOS = {
  IDLE: 'idle',
  PREENCHENDO: 'preenchendo',
  VALIDANDO: 'validando',
  SALVO: 'salvo',
  ERRO: 'erro',
};

function formatarData(texto) {
  const numeros = texto.replace(/\D/g, '');
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
}

export default function CadastroScreen() {
  const router = useRouter();

  const [agua, setAgua] = useState('');
  const [energia, setEnergia] = useState('');
  const [data, setData] = useState('');
  const [estado, setEstado] = useState(ESTADOS.IDLE);
  const [erros, setErros] = useState({});

  function validar() {
    setEstado(ESTADOS.VALIDANDO);
    const novosErros = {};

    if (!agua.trim()) {
      novosErros.agua = 'Informe o consumo de água.';
    } else if (!REGEX.numero.test(agua.trim())) {
      novosErros.agua = 'Use apenas números. Ex: 12 ou 12.50';
    } else if (parseFloat(agua) <= 0) {
      novosErros.agua = 'O valor deve ser maior que zero.';
    }

    if (!energia.trim()) {
      novosErros.energia = 'Informe o consumo de energia.';
    } else if (!REGEX.numero.test(energia.trim())) {
      novosErros.energia = 'Use apenas números. Ex: 150 ou 150.75';
    } else if (parseFloat(energia) <= 0) {
      novosErros.energia = 'O valor deve ser maior que zero.';
    }

    if (!data.trim()) {
      novosErros.data = 'Informe a data do registro.';
    } else if (!REGEX.data.test(data.trim())) {
      novosErros.data = 'Use o formato DD/MM/AAAA.';
    } else {
      const [dia, mes, ano] = data.split('/').map(Number);
      const dataObj = new Date(ano, mes - 1, dia);
      if (
        dataObj.getFullYear() !== ano ||
        dataObj.getMonth() !== mes - 1 ||
        dataObj.getDate() !== dia
      ) {
        novosErros.data = 'Data inválida.';
      }
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setEstado(ESTADOS.ERRO);
      return false;
    }
    setErros({});
    return true;
  }

  function handleSalvar() {
    if (!validar()) return;
    setEstado(ESTADOS.SALVO);
    Alert.alert(
      '✅ Registro salvo!',
      `Água: ${agua} m³\nEnergia: ${energia} kWh\nData: ${data}`,
      [
        {
          text: 'Voltar ao início',
          onPress: () => {
            limparFormulario();
            router.back();
          },
        },
        { text: 'Novo Registro', onPress: limparFormulario },
      ]
    );
  }

  function limparFormulario() {
    setAgua('');
    setEnergia('');
    setData('');
    setErros({});
    setEstado(ESTADOS.IDLE);
  }

  function handleChange(campo, valor) {
    setEstado(ESTADOS.PREENCHENDO);
    if (erros[campo]) setErros((prev) => ({ ...prev, [campo]: null }));
    if (campo === 'agua') setAgua(valor);
    if (campo === 'energia') setEnergia(valor);
    if (campo === 'data') setData(formatarData(valor));
  }

  const estadoBadge = {
    [ESTADOS.IDLE]: { label: 'Aguardando dados', cor: '#94A3B8' },
    [ESTADOS.PREENCHENDO]: { label: 'Preenchendo...', cor: '#1A73E8' },
    [ESTADOS.VALIDANDO]: { label: 'Validando...', cor: '#D97706' },
    [ESTADOS.SALVO]: { label: 'Salvo com sucesso', cor: '#0D9488' },
    [ESTADOS.ERRO]: { label: 'Corrija os erros', cor: '#DC2626' },
  }[estado];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A4FA6" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Cadastrar Consumo</Text>
          <Text style={styles.headerSubtitle}>Registre água e energia</Text>
        </View>
        <Text style={styles.headerIcon}>✏️</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              styles.estadoBadge,
              {
                backgroundColor: estadoBadge.cor + '20',
                borderColor: estadoBadge.cor,
              },
            ]}>
            <View
              style={[styles.estadoDot, { backgroundColor: estadoBadge.cor }]}
            />
            <Text style={[styles.estadoLabel, { color: estadoBadge.cor }]}>
              {estadoBadge.label}
            </Text>
          </View>

          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <View style={[styles.secaoIconWrap, { backgroundColor: '#E8F1FD' }]}>
                <Text style={styles.secaoIcon}>💧</Text>
              </View>
              <Text style={styles.secaoTitulo}>Consumo de Água</Text>
            </View>
            <Text style={styles.label}>Quantidade consumida (m³)</Text>
            <View style={[styles.inputWrap, erros.agua && styles.inputErro]}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 12.50"
                placeholderTextColor="#94A3B8"
                keyboardType="decimal-pad"
                value={agua}
                onChangeText={(v) => handleChange('agua', v)}
                maxLength={10}
              />
              <Text style={styles.inputUnidade}>m³</Text>
            </View>
            {erros.agua ? (
              <Text style={styles.erroMsg}>⚠ {erros.agua}</Text>
            ) : (
              <Text style={styles.hint}>Regex: ^\d+(\.\d{1.2})?$</Text>
            )}
          </View>

          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <View style={[styles.secaoIconWrap, { backgroundColor: '#FEF3E2' }]}>
                <Text style={styles.secaoIcon}>⚡</Text>
              </View>
              <Text style={styles.secaoTitulo}>Consumo de Energia</Text>
            </View>
            <Text style={styles.label}>Quantidade consumida (kWh)</Text>
            <View style={[styles.inputWrap, erros.energia && styles.inputErro]}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 150.75"
                placeholderTextColor="#94A3B8"
                keyboardType="decimal-pad"
                value={energia}
                onChangeText={(v) => handleChange('energia', v)}
                maxLength={10}
              />
              <Text style={styles.inputUnidade}>kWh</Text>
            </View>
            {erros.energia ? (
              <Text style={styles.erroMsg}>⚠ {erros.energia}</Text>
            ) : (
              <Text style={styles.hint}>Regex: ^\d+(\.\d{1.2})?$</Text>
            )}
          </View>

          <View style={styles.secao}>
            <View style={styles.secaoHeader}>
              <View style={[styles.secaoIconWrap, { backgroundColor: '#E6F7F5' }]}>
                <Text style={styles.secaoIcon}>📅</Text>
              </View>
              <Text style={styles.secaoTitulo}>Data do Registro</Text>
            </View>
            <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
            <View style={[styles.inputWrap, erros.data && styles.inputErro]}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 10/06/2026"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={data}
                onChangeText={(v) => handleChange('data', v)}
                maxLength={10}
              />
              <Text style={styles.inputUnidade}>📅</Text>
            </View>
            {erros.data ? (
              <Text style={styles.erroMsg}>⚠ {erros.data}</Text>
            ) : (
              <Text style={styles.hint}>Regex: ^\d{2}/\d{2}/\d{4}$</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={handleSalvar}
            activeOpacity={0.85}>
            <Text style={styles.btnSalvarText}>💾 Salvar Registro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnLimpar}
            onPress={limparFormulario}
            activeOpacity={0.75}>
            <Text style={styles.btnLimparText}>🗑 Limpar Formulário</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitulo}>🔍 Validações aplicadas</Text>
            <Text style={styles.infoItem}>• Números: aceita inteiro ou decimal (até 2 casas)</Text>
            <Text style={styles.infoItem}>• Data: formato DD/MM/AAAA com validação lógica</Text>
            <Text style={styles.infoItem}>• Campos obrigatórios: todos devem ser preenchidos</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A4FA6' },
  header: {
    backgroundColor: '#0A4FA6',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  headerSubtitle: { color: '#C8DEF8', fontSize: 12, marginTop: 1 },
  headerIcon: { fontSize: 32 },
  scroll: {
    flex: 1,
    backgroundColor: '#F0F6FF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 20,
  },
  estadoDot: { width: 8, height: 8, borderRadius: 4 },
  estadoLabel: { fontSize: 13, fontWeight: '600' },
  secao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  secaoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secaoIcon: { fontSize: 20 },
  secaoTitulo: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
  },
  inputErro: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  input: { flex: 1, fontSize: 16, color: '#1E293B', paddingVertical: 12 },
  inputUnidade: { fontSize: 13, color: '#94A3B8', fontWeight: '600', marginLeft: 8 },
  erroMsg: { color: '#DC2626', fontSize: 12, marginTop: 5, fontWeight: '500' },
  hint: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  btnSalvar: {
    backgroundColor: '#1A73E8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1A73E8',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  btnSalvarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnLimpar: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnLimparText: { color: '#64748B', fontSize: 15, fontWeight: '600' },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#1A73E8',
  },
  infoTitulo: { fontSize: 13, fontWeight: '700', color: '#1A73E8', marginBottom: 8 },
  infoItem: { fontSize: 12, color: '#475569', marginBottom: 4, lineHeight: 18 },
});