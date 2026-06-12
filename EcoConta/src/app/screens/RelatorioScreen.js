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

const DADOS = [
    { mes: 'Jan', agua: 10, energia: 120 },
    { mes: 'Fev', agua: 12, energia: 135 },
    { mes: 'Mar', agua: 9, energia: 110 },
    { mes: 'Abr', agua: 15, energia: 160 },
    { mes: 'Mai', agua: 13, energia: 145 },
    { mes: 'Jun', agua: 11, energia: 130 },
];

const MAX_AGUA = Math.max(...DADOS.map((d) => d.agua));
const MAX_ENERGIA = Math.max(...DADOS.map((d) => d.energia));

const media = (campo) =>
    (
        DADOS.reduce((s, d) => s + d[campo], 0) / DADOS.length
    ).toFixed(1);

export default function RelatoriosScreen() {
    const [aba, setAba] = useState('agua');


    const dadosAba = aba === 'agua' ? DADOS.map((d) => ({ ...d, valor: d.agua }))
        : DADOS.map((d) => ({ ...d, valor: d.energia }));
    const maxValor = aba === 'agua' ? MAX_AGUA : MAX_ENERGIA;
    const unidade = aba === 'agua' ? 'm³' : 'kWh';
    const cor = aba === 'agua' ? '#1A73E8' : '#D97706';
    const corLight = aba === 'agua' ? '#E8F1FD' : '#FEF3E2';
    const icone = aba === 'agua' ? '💧' : '⚡';


    return (
        <SafeAreaView style={styles.safe}>


            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Relatórios</Text>
                    <Text style={styles.subtitle}>Gráficos e estatísticas</Text>
                </View>
                <Text style={styles.headerIcon}>📊</Text>
            </View>


            <ScrollView contentContainerStyle={styles.container}>


                {/* ABAS */}
                <View style={styles.abas}>
                    <TouchableOpacity
                        style={[styles.aba, aba === 'agua' && styles.abaAtiva]}
                        onPress={() => setAba('agua')}
                    >
                        <Text style={[styles.abaText, aba === 'agua' && styles.abaTextAtiva]}>
                            💧 Água
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.aba, aba === 'energia' && styles.abaAtiva]}
                        onPress={() => setAba('energia')}
                    >
                        <Text style={[styles.abaText, aba === 'energia' && styles.abaTextAtiva]}>
                            ⚡ Energia
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* CARDS DE ESTATÍSTICA */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { borderLeftColor: cor }]}>
                        <Text style={styles.statLabel}>Média mensal</Text>
                        <Text style={[styles.statValue, { color: cor }]}>
                            {media(aba)} {unidade}
                        </Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: cor }]}>
                        <Text style={styles.statLabel}>Maior consumo</Text>
                        <Text style={[styles.statValue, { color: cor }]}>
                            {maxValor} {unidade}
                        </Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: cor }]}>
                        <Text style={styles.statLabel}>Menor consumo</Text>
                        <Text style={[styles.statValue, { color: cor }]}>
                            {Math.min(...DADOS.map((d) => aba === 'agua' ? d.agua : d.energia))} {unidade}
                        </Text>
                    </View>
                </View>


                {/* GRÁFICO DE BARRAS */}
                <View style={styles.graficoCard}>
                    <Text style={styles.graficoTitulo}>
                        {icone} Consumo de {aba === 'agua' ? 'Água' : 'Energia'} — Últimos 6 meses
                    </Text>


                    <View style={styles.grafico}>
                        {dadosAba.map((item) => {
                            const altura = Math.max((item.valor / maxValor) * 140, 8);
                            return (
                                <View key={item.mes} style={styles.barraWrap}>
                                    <Text style={[styles.barrValor, { color: cor }]}>
                                        {item.valor}
                                    </Text>
                                    <View style={styles.barraFundo}>
                                        <View
                                            style={[
                                                styles.barra,
                                                { height: altura, backgroundColor: cor },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.barraMes}>{item.mes}</Text>
                                </View>
                            );
                        })}
                    </View>


                    <Text style={styles.graficoLegenda}>Valores em {unidade}</Text>
                </View>


                {/* TABELA */}
                <View style={styles.tabelaCard}>
                    <Text style={styles.tabelaTitulo}>📋 Tabela de Consumo</Text>


                    <View style={[styles.tabelaHeader, { backgroundColor: cor }]}>
                        <Text style={styles.tabelaHeaderText}>Mês</Text>
                        <Text style={styles.tabelaHeaderText}>💧 Água (m³)</Text>
                        <Text style={styles.tabelaHeaderText}>⚡ Energia (kWh)</Text>
                    </View>


                    {DADOS.map((item, index) => (
                        <View
                            key={item.mes}
                            style={[
                                styles.tabelaLinha,
                                index % 2 === 0 && { backgroundColor: corLight },
                            ]}
                        >
                            <Text style={styles.tabelaCell}>{item.mes}</Text>
                            <Text style={styles.tabelaCell}>{item.agua}</Text>
                            <Text style={styles.tabelaCell}>{item.energia}</Text>
                        </View>
                    ))}
                </View>


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
        flex: 1,
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


    // Abas
    abas: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
        elevation: 2,
    },
    aba: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    abaAtiva: {
        backgroundColor: '#0A4FA6',
    },
    abaText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    abaTextAtiva: {
        color: '#FFFFFF',
    },


    // Stats
    statsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        borderLeftWidth: 3,
        elevation: 2,
    },
    statLabel: {
        fontSize: 10,
        color: '#64748B',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '700',
    },


    // Gráfico
    graficoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    graficoTitulo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    grafico: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 180,
        paddingBottom: 8,
    },
    barraWrap: {
        alignItems: 'center',
        flex: 1,
    },
    barrValor: {
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 4,
    },
    barraFundo: {
        width: 28,
        height: 140,
        justifyContent: 'flex-end',
        backgroundColor: '#F1F5F9',
        borderRadius: 6,
        overflow: 'hidden',
    },
    barra: {
        width: '100%',
        borderRadius: 6,
    },
    barraMes: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 6,
        fontWeight: '600',
    },
    graficoLegenda: {
        fontSize: 11,
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 8,
    },


    // Tabela
    tabelaCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    tabelaTitulo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        padding: 16,
        paddingBottom: 12,
    },
    tabelaHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    tabelaHeaderText: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 12,
        textAlign: 'center',
    },
    tabelaLinha: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    tabelaCell: {
        flex: 1,
        fontSize: 13,
        color: '#475569',
        textAlign: 'center',
    },
});

