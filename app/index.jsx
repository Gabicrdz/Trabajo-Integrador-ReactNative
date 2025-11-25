import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes } from '../src/context/NotesContext';
import BottomTabs from '../src/components/BottomTabs';
import NoteItem from '../src/components/NoteItem';

export default function IndexScreen() {
  const router = useRouter();
  const { notes, isLoading } = useNotes();

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // desc = más nuevas primero

  const filteredNotes = useMemo(() => {
    let list = notes;

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(term));
    }

    const sorted = [...list].sort((a, b) => {
      const da = new Date(a.updatedAt || a.createdAt).getTime();
      const db = new Date(b.updatedAt || b.createdAt).getTime();
      return sortOrder === 'desc' ? db - da : da - db;
    });

    return sorted;
  }, [notes, search, sortOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tus notas de estudio</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título..."
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Ordenar por fecha:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'desc' && styles.sortButtonActive,
              ]}
              onPress={() => setSortOrder('desc')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOrder === 'desc' && styles.sortButtonTextActive,
                ]}
              >
                Más nuevas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'asc' && styles.sortButtonActive,
              ]}
              onPress={() => setSortOrder('asc')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOrder === 'asc' && styles.sortButtonTextActive,
                ]}
              >
                Más viejas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listContainer}>
          {isLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#f97316" />
              <Text style={styles.loadingText}>Cargando notas...</Text>
            </View>
          ) : filteredNotes.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.emptyTitle}>Todavía no hay notas</Text>
              <Text style={styles.emptyText}>
                Toca el botón + para crear tu primera nota de estudio.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredNotes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NoteItem
                  note={item}
                  onPress={() => router.push(`/note/${item.id}`)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/create')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
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
    color: '#f9fafb',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  searchInput: {
    backgroundColor: '#111a30',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#e5edff',
    borderWidth: 1,
    borderColor: '#1f2d48',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sortLabel: {
    color: '#b6c4e3',
    fontSize: 13,
  },
  sortButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#263658',
    marginLeft: 4,
  },
  sortButtonActive: {
    backgroundColor: '#f9731626',
    borderColor: '#f97316',
  },
  sortButtonText: {
    color: '#9fb2d6',
    fontSize: 12,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#ffd7a3',
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 8,
    color: '#9fb2d6',
  },
  emptyTitle: {
    color: '#e5edff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyText: {
    color: '#9fb2d6',
    fontSize: 13,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  fabText: {
    color: '#1a0b0b',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '800',
  },
});
