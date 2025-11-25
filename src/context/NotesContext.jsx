import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@estugrow:notes';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadNotes() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        } else {
          setNotes([]);
        }
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error('Error cargando notas', error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveNotes(newNotes) {
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error guardando notas', error);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote({ title, description, imageUri, priority }) {
    const now = new Date().toISOString();

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      imageUri,
      priority,
      createdAt: now,
      updatedAt: now,
    };

    const newNotes = [newNote, ...notes];
    await saveNotes(newNotes);
    return newNote.id;
  }

  async function updateNote(id, changes) {
    const now = new Date().toISOString();

    const newNotes = notes.map((note) => {
      if (note.id !== id) return note;

      const next = {
        ...note,
        ...changes,
        updatedAt: now,
      };

      if (changes.title !== undefined) {
        next.title = changes.title.trim();
      }
      if (changes.description !== undefined) {
        next.description = changes.description.trim();
      }

      return next;
    });

    await saveNotes(newNotes);
  }

  async function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveNotes(newNotes);
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotes debe usarse dentro de NotesProvider');
  }
  return ctx;
}
