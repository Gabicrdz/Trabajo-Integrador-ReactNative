import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PRIORITY_COLORS = {
  high: '#f43f5e',
  medium: '#fbbf24',
  low: '#34d399',
};

function getPriorityLabel(priority) {
  if (priority === 'high') return 'Alta';
  if (priority === 'medium') return 'Media';
  return 'Baja';
}

export default function NoteItem({ note, onPress }) {
  const date = new Date(note.updatedAt || note.createdAt);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {note.imageUri ? (
        <Image source={{ uri: note.imageUri }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]}>
          <Text style={styles.placeholderText}>IMG</Text>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {note.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: PRIORITY_COLORS[note.priority] || '#3f3f46' },
            ]}
          >
            <Text style={styles.priorityText}>{getPriorityLabel(note.priority)}</Text>
          </View>
        </View>

        <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#111a2e',
    borderWidth: 1,
    borderColor: '#1f2d48',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#0f1933',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#7c90b2',
    fontSize: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    color: '#e5edff',
    fontSize: 16,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginLeft: 8,
  },
  priorityText: {
    color: '#0b1021',
    fontSize: 11,
    fontWeight: '700',
  },
  dateText: {
    color: '#9fb2d6',
    fontSize: 12,
  },
});
