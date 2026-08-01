import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { View } from 'react-native';
import { auth, db } from '../src/config/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../src/theme/styles';
import { Button, RadioButton, Snackbar, Text, TextInput } from 'react-native-paper';


interface FormUsuario {
  nombre: string;
  edad: string;
  gustoMusical: string;
}

interface ShowMessageType {
  visible: boolean;
  message: string;
  color: string;
}

const ConfiguracionScreen = () => {

    const [formUsuario, setFormUsuario] = useState<FormUsuario>({
    nombre: '',
    edad: '',
    gustoMusical: 'rock', // valor por defecto
  });

  const [showMessage, setShowMessage] = useState<ShowMessageType>({
    visible: false,
    message: '',
    color: '#666',
  });

  const [loading, setLoading] = useState(false);

  const handleSetValues = (key: string, value: string) => {
    setFormUsuario({ ...formUsuario, [key]: value });
  };

  const handleGuardarUsuario = async () => {
    if (!formUsuario.nombre || !formUsuario.edad) {
      setShowMessage({ visible: true, message: 'Llena nombre y edad', color: '#e05656' });
      return;
    }

    setLoading(true);
    try {
      // ✅ "usuarios" es el nombre de la colección en Firestore (se crea sola, no hay que crearla antes)
      await addDoc(collection(db, 'usuarios'), {
        nombre: formUsuario.nombre,
        edad: Number(formUsuario.edad), // convertimos a número
        gustoMusical: formUsuario.gustoMusical,
        uid: auth.currentUser?.uid ?? null, // ✅ opcional: relaciona el doc con el usuario logueado
        creadoEn: new Date().toISOString(),
      });

      setShowMessage({ visible: true, message: 'Datos guardados con éxito', color: '#3d81ce' });
      setFormUsuario({ nombre: '', edad: '', gustoMusical: 'rock' }); // limpia el form
    } catch (error: any) {
      console.log('Error al guardar:', error.message);
      setShowMessage({ visible: true, message: 'Error al guardar los datos', color: '#e3331b' });
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text variant="displayMedium">CUESTIONARIO</Text>

      <TextInput
        label="Nombre"
        value={formUsuario.nombre}
        onChangeText={(value) => handleSetValues('nombre', value)}
        mode="outlined"
        placeholder="Escribe tu nombre"
        style={styles.inputs}
      />

      <TextInput
        label="Edad"
        value={formUsuario.edad}
        onChangeText={(value) => handleSetValues('edad', value)}
        mode="outlined"
        keyboardType="numeric" // ✅ solo números
        placeholder="Escribe tu edad"
        style={styles.inputs}
      />

      <Text variant="titleMedium" style={{ marginTop: 16 }}>
        Gusto musical
      </Text>
      <RadioButton.Group
        onValueChange={(value) => handleSetValues('gustoMusical', value)}
        value={formUsuario.gustoMusical}
      >
        <RadioButton.Item label="Rock" value="rock" />
        <RadioButton.Item label="Pop" value="pop" />
        <RadioButton.Item label="Reggaetón" value="reggaeton" />
        <RadioButton.Item label="Electrónica" value="electronica" />
      </RadioButton.Group>

      <Button
        style={styles.botong}
        icon="content-save"
        mode="contained"
        onPress={handleGuardarUsuario}
        loading={loading}
        disabled={loading}
      >
        Guardar
      </Button>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        <Text>{showMessage.message}</Text>
      </Snackbar>
    </ScrollView>
  )
}

export default ConfiguracionScreen
