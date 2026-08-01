import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './src/config/firebaseConfig';
import app from './src/config/firebaseConfig';
import { PaperProvider } from 'react-native-paper';
import Navegador from './navigation/Mynavigation';

export default function App() {
   console.log('Firebase inicializado:', app.name, app.options.projectId);
  return (
    <PaperProvider>
      <Navegador/>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
