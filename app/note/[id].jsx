import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '../../src/context/NotesContext';
import BottomTabs from '../../src/components/BottomTabs';

function getPriorityLabel(priority) {
  if (priority === 'high') return 'Alta';
  if (priority === 'medium') return 'Media';
  return 'Baja';
}

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { notes, deleteNote } = useNotes();

  const note = notes.find((n) => n.id === String(id));

  if (!note) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Nota no encontrada.</Text>
        </View>
        <BottomTabs />
      </SafeAreaView>
    );
  }

  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt || note.createdAt);

  function confirmDelete() {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que querés eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteNote(note.id);
            router.replace('/');
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {note.imageUri && (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: note.imageUri }} style={styles.image} />
            </View>
          )}

          <View style={styles.headerRow}>
            <Text style={styles.title}>{note.title}</Text>
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>
                Prioridad: {getPriorityLabel(note.priority)}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Descripción</Text>
          <Text style={styles.description}>{note.description}</Text>

          <Text style={styles.sectionLabel}>Fechas</Text>
          <Text style={styles.dateText}>
            Creada: {created.toLocaleString()}
          </Text>
          <Text style={styles.dateText}>
            Última modificación: {updated.toLocaleString()}
          </Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => router.push(`/edit/${note.id}`)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={confirmDelete}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
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
  errorText: {
    color: '#fecaca',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f2d48',
    marginBottom: 16,
    backgroundColor: '#0f1933',
  },
  image: {
    width: '100%',
    height: 260,
  },
  headerRow: {
    marginBottom: 12,
  },
  title: {
    color: '#e5edff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#f9731626',
  },
  priorityText: {
    color: '#ffd7a3',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionLabel: {
    color: '#c8d5f2',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    color: '#c0cbe6',
    fontSize: 14,
  },
  dateText: {
    color: '#9fb2d6',
    fontSize: 13,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#38bdf8',
  },
  deleteButton: {
    backgroundColor: '#b91c1c',
    marginRight: 0,
  },
  buttonText: {
    color: '#0b1021',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#fee2e2',
    fontWeight: '600',
  },
});
