import { CommonActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { View } from 'react-native';
import { auth } from '../src/config/firebaseConfig';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../src/theme/styles';

interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

interface FormLogin {
  email: string;
  password: string;
}

const IniciarSesionScreen = () => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: ""
  });

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#666"
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  }

  const handleLogingUser = async () => {
    console.log(formLogin);

    if (!formLogin.email || !formLogin.password) {
      setShowMessage({ visible: true, message: "te falta llenar los campos", color: "#e05656" });
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      console.log(response);

      // ✅ Reset en vez de navigate: borra el historial para que
      // el usuario no pueda "regresar" al login con el botón atrás.
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Configuracion' }],
        })
      );

    } catch (ex) {
      console.log("Error de login:", ex); // 👀 para debug
      setShowMessage({ visible: true, message: "usuario o contraseña incorrecta", color: "#e05656" });
    }
  }

  return (
    <View style={styles.root}>
      <Text variant="displayMedium"> INICIA SESIÓN</Text>
      <TextInput
        label="Email"
        value={formLogin.email}
        onChangeText={(value) => handleSetValues("email", value)}
        mode="outlined"
        keyboardType="email-address"
        placeholder="escribe tu correo"
        style={styles.inputs}
      />
      <TextInput
        label="Contraseña"
        value={formLogin.password}
        onChangeText={(value) => handleSetValues("password", value)}
        mode="outlined"
        right={
          <TextInput.Icon
            icon={hiddenPassword ? "eye" : "eye-off"} // ✅ ícono dinámico
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
        placeholder="escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        style={styles.inputs}
      />
      <Button
        style={styles.botong}
        icon="account"
        mode="contained"
        onPress={handleLogingUser}
      >
        Iniciar sesión
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

export default IniciarSesionScreen