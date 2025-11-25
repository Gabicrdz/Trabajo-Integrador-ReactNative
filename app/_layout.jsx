import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NotesProvider } from '../src/context/NotesContext';

export default function RootLayout() {
  return (
    <NotesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0b1021' },
          headerTintColor: '#e2f3ff',
          headerTitleStyle: { fontWeight: '700', letterSpacing: 0.3 },
          contentStyle: { backgroundColor: '#0b1224' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'EstuGrow' }} />
        <Stack.Screen name="create" options={{ title: 'Nueva nota' }} />
        <Stack.Screen name="note/[id]" options={{ title: 'Detalle' }} />
        <Stack.Screen name="edit/[id]" options={{ title: 'Editar nota' }} />
        <Stack.Screen name="about" options={{ title: 'Acerca de EstuGrow' }} />
      </Stack>
    </NotesProvider>
  );
}
