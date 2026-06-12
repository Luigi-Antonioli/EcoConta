import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
} from 'react-native';

const CARDS = [
    {
        id: 'cadastro',
        icon: '✏️',
        title: 'Cadastrar Consumo',
        subtitle: 'Registre água e energia',
        color: '#1A73E8',
        light: '#E8F1FD',
    },
    {
        id: 'historico',
        icon: '📋',
        title: 'Histórico',
        subtitle: 'Veja seus registros anteriores',
        color: '#0D9488',
        light: '#E6F7F5',
    },
    {
        id: 'relatorios',
        icon: '📊',
        title: 'Relatórios',
        subtitle: 'Gráficos e estatísticas',
        color: '#7C3AED',
        light: '#F0EBFD',
    },
    {
        id: 'recomendacoes',
        icon: '💡',
        title: 'Recomendações',
        subtitle: 'Dicas personalizadas por IA',
        color: '#D97706',
        light: '#FEF3E2',
    },
];

export default function HomeScreen() {
    const router = useRouter();

    const handleCard = (id) => {
        switch (id) {
            case 'cadastro':
                router.push('/screens/CadastroScreen');
                break;
            case 'historico':
                router.push('/screens/HistoricoScreen');
                break;
            case 'relatorios':
                router.push('/screens/RelatorioScreen');
                break;
            case 'recomendacoes':
                router.push('/screens/RecomendacoesScreen');
                break;
            default:
                alert('Funcionalidade não encontrada.');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#0A4FA6" />

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerGreeting}>Olá, bem-vindo(a) 👋</Text>
                    <Text style={styles.headerTitle}>EcoConta</Text>
                    <Text style={styles.headerSubtitle}>
                        Monitore água e energia com consciência
                    </Text>
                </View>
                <Text style={styles.headerIcon}>🌊</Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.summaryRow}>
                    <View style={[styles.summaryCard, { borderLeftColor: '#1A73E8' }]}>
                        <Text style={styles.summaryIcon}>💧</Text>
                        <Text style={styles.summaryValue}>-- m³</Text>
                        <Text style={styles.summaryLabel}>Água este mês</Text>
                    </View>
                    <View style={[styles.summaryCard, { borderLeftColor: '#D97706' }]}>
                        <Text style={styles.summaryIcon}>⚡</Text>
                        <Text style={styles.summaryValue}>-- kWh</Text>
                        <Text style={styles.summaryLabel}>Energia este mês</Text>
                    </View>
                </View>

                <View style={styles.profileBanner}>
                    <Text style={styles.profileIcon}>🤖</Text>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.profileTitle}>Perfil de Consumo</Text>
                        <Text style={styles.profileDesc}>
                            Cadastre dados para a IA classificar seu perfil via KNN
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>O que deseja fazer?</Text>

                <View style={styles.cardsGrid}>
                    {CARDS.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            style={[styles.card, { backgroundColor: card.light }]}
                            onPress={() => handleCard(card.id)}
                            activeOpacity={0.75}>
                            <View style={[styles.cardIconWrap, { backgroundColor: card.color }]}>
                                <Text style={styles.cardIconText}>{card.icon}</Text>
                            </View>
                            <Text style={[styles.cardTitle, { color: card.color }]}>
                                {card.title}
                            </Text>
                            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.footer}>
                    EcoConta • Tecnologia a favor do planeta 🌱
                </Text>
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
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerGreeting: {
        color: '#AECEF5',
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 2,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        color: '#C8DEF8',
        fontSize: 13,
        marginTop: 2,
    },
    headerIcon: {
        fontSize: 48,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#F0F6FF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        borderLeftWidth: 4,
        elevation: 3,
    },
    summaryIcon: {
        fontSize: 22,
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1E293B',
    },
    summaryLabel: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
    },
    profileBanner: {
        backgroundColor: '#1A73E8',
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
        elevation: 4,
    },
    profileIcon: {
        fontSize: 32,
    },
    profileTitle: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    profileDesc: {
        color: '#C8DEF8',
        fontSize: 12,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 14,
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    card: {
        width: '47%',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },
    cardIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    cardIconText: {
        fontSize: 22,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 11,
        color: '#64748B',
        lineHeight: 15,
    },
    footer: {
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: 12,
        marginTop: 32,
    },
});