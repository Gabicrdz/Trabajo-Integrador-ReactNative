import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomTabs from '../src/components/BottomTabs';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <Text style={styles.title}>Acerca de EstuGrow</Text>

          <Text style={styles.text}>
            EstuGrow es una aplicación de notas fotográficas pensada para el
            estudio. Permite capturar fotos de apuntes, pizarras o materiales de
            clase, y guardarlas junto con un título, descripción y prioridad.
          </Text>

          <Text style={styles.subtitle}>Características principales</Text>
          <Text style={styles.text}>
            • CRUD completo de notas basadas en fotografías. {'\n'}
            • Almacenamiento local usando AsyncStorage, sin backend. {'\n'}
            • Búsqueda por título y orden por fecha. {'\n'}
            • Tema oscuro y diseño enfocado en el uso real de un estudiante.
          </Text>

          <Text style={styles.subtitle}>Uso típico</Text>
          <Text style={styles.text}>
            Un estudiante puede usar EstuGrow para guardar las partes más
            importantes de una clase (por ejemplo, una demostración en la
            pizarra), asignar una prioridad a cada nota y luego revisarlas
            desde la lista principal filtrando por título o por fecha.
          </Text>
        </ScrollView>
      </View>
      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1224',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    color: '#e5edff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#c8d5f2',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    color: '#c0cbe6',
    fontSize: 14,
    lineHeight: 20,
  },
});
