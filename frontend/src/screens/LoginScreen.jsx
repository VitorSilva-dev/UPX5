import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
    console.log("TESTE")


    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        // if (email === '' || password === '') {
        //     Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        // } else {
        //     Alert.alert('Login realizado com sucesso!', `Bem-vindo, ${email}`);
        //     // Navegando para a tela de Home após login
        //     navigation.navigate('TabsScreen');
        // }

        navigation.navigate('TabsScreen');
    };

    const handleRegister = () => {
        // if (email === '' || password === '' || confirmPassword === '') {
        //     Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        // } else if (password !== confirmPassword) {
        //     Alert.alert('Erro', 'As senhas não coincidem.');
        // } else {
        //     Alert.alert('Registrado com sucesso!', `Conta criada para ${email}`);
        //     navigation.navigate('TabsScreen');
        // }

        navigation.navigate('TabsScreen');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.title}>{isRegister ? 'Registrar' : 'Login'}</Text>

            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#6200ee" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#6200ee" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {isRegister && (
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#6200ee" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={isRegister ? handleRegister : handleLogin}
            >
                <Text style={styles.buttonText}>{isRegister ? 'Registrar' : 'Entrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                <Text style={styles.switchText}>
                    {isRegister ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#6200ee',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#6200ee',
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: '100%'
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        width: '100%'
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    switchText: {
        textAlign: 'center',
        color: '#6200ee',
        fontSize: 16,
        marginTop: 10,
    },
});
