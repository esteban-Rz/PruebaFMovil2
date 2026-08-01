import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../src/theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { CommonActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

interface FormRegister {
  email: string;
  password: string;
}

interface ShowMessageType {
  visible: boolean;
  message: string;
  color: string;
}

const RegistrarseScreen = () => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    password: ""
  });

  const handleSetValues = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  }

  
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

 
  const [showMessage, setShowMessage] = useState<ShowMessageType>({
    visible: false,
    message: "",
    color: "#666"
  });

  const handleRegistroUser = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({ visible: true, message: "te falta llenar los campos", color: "#e05656" });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      console.log('Usuario creado:', userCredential.user.uid);
      setShowMessage({ visible: true, message: "bien Michu", color: "#3d81ce" });

      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Configuracion' }],
        })
      );

    } catch (error: any) {
      console.log('Error al registrar:', error.code, error.message);
      //  el mensaje traducido va directo al Snackbar, ya no hay estado duplicado
      setShowMessage({
        visible: true,
        message: traducirErrorFirebase(error.code),
        color: "#e3331b"
      });
    }
  }

  const traducirErrorFirebase = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ese correo ya está registrado';
      case 'auth/invalid-email':
        return 'El correo no es válido';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      default:
        return 'Ocurrió un error al registrar';
    }
  }

  return (
    <View style={styles.root}>
      <Text variant="displayMedium"> REGISTRATE</Text>
      <TextInput
        label="Email"
        value={formRegister.email}
        onChangeText={(value) => handleSetValues('email', value)}
        mode="outlined"
        keyboardType="email-address"
        placeholder="escribe tu correo"
        style={styles.inputs}
      />
      <TextInput
        label="Contraseña"
        value={formRegister.password}
        onChangeText={(value) => handleSetValues('password', value)}
        mode="outlined"
        placeholder="escribe tu contraseña"
        secureTextEntry
        style={styles.inputs}
      />
      <Button
        style={styles.botong}
        icon="account"
        mode="contained"
        onPress={handleRegistroUser}
      >
        Registrar
      </Button>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        <Text>{showMessage.message}</Text>
      </Snackbar>
      
    </View>
  )
}

export default RegistrarseScreen