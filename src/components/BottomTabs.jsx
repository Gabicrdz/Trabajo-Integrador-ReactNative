import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

export default function BottomTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const isNotes =
    pathname === '/' ||
    pathname.startsWith('/note') ||
    pathname.startsWith('/create') ||
    pathname.startsWith('/edit');
  const isAbout = pathname === '/about';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, isNotes && styles.activeTab]}
        onPress={() => router.push('/')}
      >
        <Text style={[styles.label, isNotes && styles.activeLabel]}>Notas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, isAbout && styles.activeTab]}
        onPress={() => router.push('/about')}
      >
        <Text style={[styles.label, isAbout && styles.activeLabel]}>
          Acerca de
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1f2d48',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0b1224',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: '#111a30',
  },
  label: {
    color: '#9fb2d6',
    fontSize: 14,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#fbbf24',
  },
});
