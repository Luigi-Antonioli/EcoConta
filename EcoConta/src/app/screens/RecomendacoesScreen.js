import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

const BASE_TREINAMENTO = [
    { agua: 6, energia: 80, perfil: 'Econômico' },
    { agua: 7, energia: 90, perfil: 'Econômico' },
    { agua: 8, energia: 100, perfil: 'Econômico' },
    { agua: 9, energia: 110, perfil: 'Econômico' },
    { agua: 11, energia: 130, perfil: 'Moderado' },
    { agua: 12, energia: 140, perfil: 'Moderado' },
    { agua: 13, energia: 150, perfil: 'Moderado' },
    { agua: 14, energia: 160, perfil: 'Moderado' },
    { agua: 18, energia: 200, perfil: 'Alto' },
    { agua: 20, energia: 220, perfil: 'Alto' },
    { agua: 22, energia: 250, perfil: 'Alto' },
    { agua: 25, energia: 280, perfil: 'Alto' },
];

const K = 3;

    function distanciaEuclidiana(a, b) {
        return Math.sqrt(
            Math.pow(a.agua - b.agua, 2) +
            Math.pow(a.energia - b.energia, 2)
        );
    }


    function classificarKNN(agua, energia) {
        const distancias = BASE_TREINAMENTO.map((ponto) => ({
            perfil: ponto.perfil,
            distancia: distanciaEuclidiana({ agua, energia }, ponto),
        }));


        distancias.sort((a, b) => a.distancia - b.distancia);
        const kVizinhos = distancias.slice(0, K);


        const votos = {};
        kVizinhos.forEach((v) => {
            votos[v.perfil] = (votos[v.perfil] || 0) + 1;
        });


        return Object.entries(votos).sort((a, b) => b[1] - a[1])[0][0];
    }


    // RECOMENDAÇÕES POR PERFIL
    const RECOMENDACOES = {
        'Econômico': {
            cor: '#0D9488',
            corLight: '#E6F7F5',
            icone: '🌱',
            mensagem: 'Parabéns! Você tem um ótimo perfil de consumo.',
            dicas: [
                'Continue monitorando seu consumo regularmente.',
                'Compartilhe suas práticas sustentáveis com amigos.',
                'Considere instalar painéis solares para economizar ainda mais.',
                'Use a água da chuva para regar plantas.',
            ],
        },
        'Moderado': {
            cor: '#D97706',
            corLight: '#FEF3E2',
            icone: '⚠️',
            mensagem: 'Seu consumo está na média. Pequenas mudanças fazem grande diferença!',
            dicas: [
                'Reduza o tempo no banho para até 5 minutos.',
                'Desligue aparelhos eletrônicos quando não estiver usando.',
                'Prefira lavar roupas com a máquina cheia.',
                'Troque lâmpadas comuns por LED.',
                'Verifique se há torneiras pingando em casa.',
            ],
        },
        'Alto': {
            cor: '#DC2626',
            corLight: '#FEF2F2',
            icone: '🚨',
            mensagem: 'Atenção! Seu consumo está acima do recomendado.',
            dicas: [
                'Verifique urgentemente se há vazamentos em casa.',
                'Evite deixar torneiras abertas desnecessariamente.',
                'Desligue o chuveiro elétrico ao ensaboar.',
                'Revise os aparelhos com maior consumo de energia.',
                'Considere instalar redutores de vazão nas torneiras.',
                'Monitore sua conta de água e energia mensalmente.',
            ],
        },
    };

    //  DADOS SIMULADOS DO ÚLTIMO MÊS
    const CONSUMO_ATUAL = { agua: 13, energia: 150 };


    export default function RecomendacoesScreen() {
        const [mostrarDetalhes, setMostrarDetalhes] = useState(false);


        const perfil = classificarKNN(CONSUMO_ATUAL.agua, CONSUMO_ATUAL.energia);
        const config = RECOMENDACOES[perfil];


        // Vizinhos para exibir no detalhamento do KNN
        const distancias = BASE_TREINAMENTO.map((ponto) => ({
            ...ponto,
            distancia: distanciaEuclidiana(CONSUMO_ATUAL, ponto).toFixed(2),
        })).sort((a, b) => a.distancia - b.distancia).slice(0, K);


        return (
            <SafeAreaView style={styles.safe}>


                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Recomendações</Text>
                        <Text style={styles.subtitle}>Análise inteligente via KNN</Text>
                    </View>
                    <Text style={styles.headerIcon}>💡</Text>
                </View>


                <ScrollView contentContainerStyle={styles.container}>


                    {/* CONSUMO ANALISADO */}
                    <View style={styles.consumoCard}>
                        <Text style={styles.consumoTitulo}>📊 Consumo Analisado</Text>
                        <View style={styles.consumoRow}>
                            <View style={styles.consumoItem}>
                                <Text style={styles.consumoIcone}>💧</Text>
                                <Text style={styles.consumoValor}>{CONSUMO_ATUAL.agua} m³</Text>
                                <Text style={styles.consumoLabel}>Água</Text>
                            </View>
                            <View style={styles.consumoDivisor} />
                            <View style={styles.consumoItem}>
                                <Text style={styles.consumoIcone}>⚡</Text>
                                <Text style={styles.consumoValor}>{CONSUMO_ATUAL.energia} kWh</Text>
                                <Text style={styles.consumoLabel}>Energia</Text>
                            </View>
                        </View>
                    </View>


                    {/* RESULTADO DO KNN */}
                    <View style={[styles.perfilCard, { backgroundColor: config.corLight, borderColor: config.cor }]}>
                        <Text style={styles.perfilIcone}>{config.icone}</Text>
                        <Text style={[styles.perfilTitulo, { color: config.cor }]}>
                            Perfil: {perfil}
                        </Text>
                        <Text style={styles.perfilMensagem}>{config.mensagem}</Text>
                        <View style={[styles.perfilBadge, { backgroundColor: config.cor }]}>
                            <Text style={styles.perfilBadgeText}>
                                Classificado pelo algoritmo KNN (K={K})
                            </Text>
                        </View>
                    </View>


                    {/* DICAS */}
                    <View style={styles.dicasCard}>
                        <Text style={styles.dicasTitulo}>💡 Dicas para você</Text>
                        {config.dicas.map((dica, index) => (
                            <View key={index} style={styles.dicaItem}>
                                <View style={[styles.dicaNumero, { backgroundColor: config.cor }]}>
                                    <Text style={styles.dicaNumeroText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.dicaTexto}>{dica}</Text>
                            </View>
                        ))}
                    </View>


                    {/* DETALHAMENTO KNN */}
                    <TouchableOpacity
                        style={[styles.detalhesBtn, { borderColor: config.cor }]}
                        onPress={() => setMostrarDetalhes(!mostrarDetalhes)}
                    >
                        <Text style={[styles.detalhesBtnText, { color: config.cor }]}>
                            {mostrarDetalhes ? '▲ Ocultar' : '▼ Ver'} detalhes do algoritmo KNN
                        </Text>
                    </TouchableOpacity>


                    {mostrarDetalhes && (
                        <View style={styles.knnCard}>
                            <Text style={styles.knnTitulo}>🤖 Como o KNN classificou</Text>
                            <Text style={styles.knnDesc}>
                                O algoritmo calculou a distância euclidiana entre seu consumo e os {BASE_TREINAMENTO.length} pontos da base de treinamento, selecionando os {K} vizinhos mais próximos:
                            </Text>


                            {distancias.map((v, i) => (
                                <View key={i} style={styles.knnLinha}>
                                    <Text style={styles.knnPos}>#{i + 1}</Text>
                                    <Text style={styles.knnInfo}>
                                        Água: {v.agua} m³ | Energia: {v.energia} kWh
                                    </Text>
                                    <Text style={styles.knnPerfil}>{v.perfil}</Text>
                                    <Text style={styles.knnDist}>d={v.distancia}</Text>
                                </View>
                            ))}


                            <View style={[styles.knnResultado, { backgroundColor: config.cor }]}>
                                <Text style={styles.knnResultadoText}>
                                    Resultado: perfil "{perfil}" (maioria dos {K} vizinhos)
                                </Text>
                            </View>
                        </View>
                    )}


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
        backText: {
            color: '#FFFFFF',
            fontSize: 20,
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
        headerIcon: {
            fontSize: 32,
        },
        container: {
            flexGrow: 1,
            backgroundColor: '#F0F6FF',
            padding: 20,
            paddingBottom: 40,
        },


        // Consumo
        consumoCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            elevation: 2,
        },
        consumoTitulo: {
            fontSize: 14,
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: 12,
        },
        consumoRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        consumoItem: {
            flex: 1,
            alignItems: 'center',
        },
        consumoIcone: {
            fontSize: 28,
            marginBottom: 4,
        },
        consumoValor: {
            fontSize: 20,
            fontWeight: '700',
            color: '#1E293B',
        },
        consumoLabel: {
            fontSize: 12,
            color: '#64748B',
            marginTop: 2,
        },
        consumoDivisor: {
            width: 1,
            height: 60,
            backgroundColor: '#E2E8F0',
        },


        // Perfil
        perfilCard: {
            borderRadius: 16,
            padding: 20,
            marginBottom: 14,
            alignItems: 'center',
            borderWidth: 2,
            elevation: 2,
        },
        perfilIcone: {
            fontSize: 48,
            marginBottom: 8,
        },
        perfilTitulo: {
            fontSize: 22,
            fontWeight: '800',
            marginBottom: 8,
        },
        perfilMensagem: {
            fontSize: 13,
            color: '#475569',
            textAlign: 'center',
            lineHeight: 20,
            marginBottom: 12,
        },
        perfilBadge: {
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 6,
        },
        perfilBadgeText: {
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: '600',
        },


        // Dicas
        dicasCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
            elevation: 2,
        },
        dicasTitulo: {
            fontSize: 14,
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: 14,
        },
        dicaItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 12,
        },
        dicaNumero: {
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        dicaNumeroText: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '700',
        },
        dicaTexto: {
            flex: 1,
            fontSize: 13,
            color: '#475569',
            lineHeight: 20,
        },


        // Botão detalhes KNN
        detalhesBtn: {
            borderWidth: 1.5,
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: 'center',
            marginBottom: 14,
        },
        detalhesBtnText: {
            fontSize: 13,
            fontWeight: '600',
        },


        // Card KNN
        knnCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
            elevation: 2,
        },
        knnTitulo: {
            fontSize: 14,
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: 8,
        },
        knnDesc: {
            fontSize: 12,
            color: '#64748B',
            lineHeight: 18,
            marginBottom: 12,
        },
        knnLinha: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#F8FAFC',
            borderRadius: 8,
            padding: 10,
            marginBottom: 6,
        },
        knnPos: {
            fontSize: 12,
            fontWeight: '700',
            color: '#1E293B',
            width: 24,
        },
        knnInfo: {
            flex: 1,
            fontSize: 11,
            color: '#475569',
        },
        knnPerfil: {
            fontSize: 11,
            fontWeight: '700',
            color: '#1E293B',
        },
        knnDist: {
            fontSize: 10,
            color: '#94A3B8',
            fontFamily: 'monospace',
        },
        knnResultado: {
            borderRadius: 10,
            padding: 12,
            marginTop: 8,
            alignItems: 'center',
        },
        knnResultadoText: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '700',
            textAlign: 'center',
        },
    });
