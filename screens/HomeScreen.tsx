import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title="Prueba final movil 2 "
          subtitle="Esteban Rodriguez "
        />
        <Card.Content>
          <Text variant="titleLarge">Pantalla home</Text>
          <Text variant="bodyMedium">Uso de la libreria Paper </Text>
        </Card.Content>
        <Card.Cover
          source={{
            uri: 'https://i.pinimg.com/736x/78/b8/55/78b855b6a8288b12914b146831eb36d8.jpg',
          }}
        />
        <Card.Actions>
        
          <Button onPress={() => navigation.navigate('Iniciar')}>
            Iniciar Sesion
          </Button>
         
          <Button onPress={() => navigation.navigate('Registrarte')}>
            Registrarte
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;