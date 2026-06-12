import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

const VALID_USER = 'ecoconta';
const VALID_PASS = '1234';

export default function LoginScreen() {
    const router = useRouter();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [erro, setErro] = useState('');

    const handleLogin = () => {
        setErro('');

        if (!usuario.trim() || !senha.trim()) {
            setErro('Preencha usuário e senha.');
            return;
        }

        if (usuario.trim() === VALID_USER && senha === VALID_PASS) {
            router.replace('/screens/HomeScreen');
        } else {
            setErro('Usuário ou senha inválidos.');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor="#0A4FA6" />

            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                {/* ── Cabeçalho ── */}
                <View style={styles.header}>
                    <Text style={styles.headerIcon}>🌊</Text>
                    <Text style={styles.headerTitle}>EcoConta</Text>
                    <Text style={styles.headerSubtitle}>
                        Monitore água e energia com consciência
                    </Text>
                </View>

                {/* ── Card de login ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Entrar na conta</Text>
                    <Text style={styles.cardDesc}>
                        Use as credenciais fornecidas para acessar o sistema.
                    </Text>

                    {/* Usuário */}
                    <Text style={styles.label}>Usuário</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>👤</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu usuário"
                            placeholderTextColor="#94A3B8"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={usuario}
                            onChangeText={(t) => { setUsuario(t); setErro(''); }}
                        />
                    </View>

                    {/* Senha */}
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>🔒</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!senhaVisivel}
                            autoCapitalize="none"
                            value={senha}
                            onChangeText={(t) => { setSenha(t); setErro(''); }}
                        />
                        <TouchableOpacity
                            onPress={() => setSenhaVisivel(!senhaVisivel)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Text style={styles.eyeIcon}>{senhaVisivel ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mensagem de erro */}
                    {erro !== '' && (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>⚠️  {erro}</Text>
                        </View>
                    )}

                    {/* Botão entrar */}
                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={handleLogin}
                        activeOpacity={0.8}>
                        <Text style={styles.btnLoginText}>Entrar</Text>
                    </TouchableOpacity>

                    {/* Dica de credenciais (remova antes de publicar) */}
                    <View style={styles.hintBox}>
                        <Text style={styles.hintText}>
                            💡 Demo — usuário: <Text style={styles.hintBold}>ecoconta</Text>
                            {'  '}senha: <Text style={styles.hintBold}>1234</Text>
                        </Text>
                    </View>
                </View>

                <Text style={styles.footer}>
                    EcoConta • Tecnologia a favor do planeta 🌱
                </Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0A4FA6',
    },
    keyboardAvoid: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    // ── Cabeçalho ──────────────────────────────────────────────────────────
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    headerIcon: {
        fontSize: 56,
        marginBottom: 8,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        color: '#C8DEF8',
        fontSize: 13,
        marginTop: 4,
        textAlign: 'center',
    },

    // ── Card ───────────────────────────────────────────────────────────────
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 20,
    },

    // ── Inputs ─────────────────────────────────────────────────────────────
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F6FF',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#C8DEF8',
    },
    inputIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 15,
        color: '#1E293B',
    },
    eyeIcon: {
        fontSize: 18,
        paddingLeft: 4,
    },

    // ── Erro ───────────────────────────────────────────────────────────────
    errorBox: {
        backgroundColor: '#FEF2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 14,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 13,
        fontWeight: '600',
    },

    // ── Botão ──────────────────────────────────────────────────────────────
    btnLogin: {
        backgroundColor: '#1A73E8',
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginTop: 4,
    },
    btnLoginText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    // ── Dica de demo ───────────────────────────────────────────────────────
    hintBox: {
        marginTop: 16,
        backgroundColor: '#F0F6FF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 12,
        color: '#64748B',
    },
    hintBold: {
        fontWeight: '700',
        color: '#1A73E8',
    },

    // ── Rodapé ─────────────────────────────────────────────────────────────
    footer: {
        textAlign: 'center',
        color: '#C8DEF8',
        fontSize: 12,
        marginTop: 24,
    },
});