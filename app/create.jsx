import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNotes } from '../src/context/NotesContext';
import BottomTabs from '../src/components/BottomTabs';

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Baja' },
];

export default function CreateScreen() {
  const router = useRouter();
  const { addNote } = useNotes();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [imageUri, setImageUri] = useState(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  const titleIsValid = title.trim().length >= 3;
  const canSave = titleIsValid && description.trim().length > 0 && !!imageUri;

  async function handleOpenCamera() {
    try {
      if (!permission || !permission.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          Alert.alert(
            'Permiso requerido',
            'Necesitas dar permiso a la cámara para tomar una foto.'
          );
          return;
        }
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTakePicture() {
    try {
      if (!cameraRef.current) return;
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setImageUri(photo.uri);
      }
      setIsCameraOpen(false);
    } catch (error) {
      console.error('Error tomando foto', error);
    }
  }

  async function handleSave() {
    if (!canSave) return;

    try {
      await addNote({
        title,
        description,
        imageUri,
        priority,
      });
      router.replace('/');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la nota.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Nueva nota de estudio</Text>

          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={[
              styles.input,
              !titleIsValid && title.length > 0 && styles.inputError,
            ]}
            placeholder="Ej: Repaso de Arquitecturas de Software"
            placeholderTextColor="#6b7280"
            value={title}
            onChangeText={setTitle}
          />
          {!titleIsValid && title.length > 0 && (
            <Text style={styles.errorText}>
              El título debe tener al menos 3 caracteres.
            </Text>
          )}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe un resumen de qué trata esta nota..."
            placeholderTextColor="#6b7280"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.priorityRow}>
            {PRIORITY_OPTIONS.map((option) => {
              const selected = option.value === priority;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.priorityChip,
                    selected && styles.priorityChipActive,
                  ]}
                  onPress={() => setPriority(option.value)}
                >
                  <Text
                    style={[
                      styles.priorityChipText,
                      selected && styles.priorityChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Foto</Text>
          {imageUri ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
          ) : (
            <Text style={styles.helperText}>
              Toma una foto del apunte, pizarra o material de estudio.
            </Text>
          )}

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleOpenCamera}
          >
            <Text style={styles.cameraButtonText}>
              {imageUri ? 'Volver a tomar foto' : 'Tomar foto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
            disabled={!canSave}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Guardar nota</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomTabs />

      {isCameraOpen && (
        <View style={styles.cameraOverlay}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            mode="picture"
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cameraClose}
                onPress={() => setIsCameraOpen(false)}
              >
                <Text style={styles.cameraCloseText}>Cerrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shutterButton}
                onPress={handleTakePicture}
              >
                <View style={styles.shutterInner} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
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
  scroll: {
    flex: 1,
  },
  title: {
    color: '#e5edff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  label: {
    color: '#c8d5f2',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#111a30',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#e5edff',
    borderWidth: 1,
    borderColor: '#1f2d48',
  },
  inputError: {
    borderColor: '#f97316',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#9fb2d6',
    fontSize: 12,
    marginBottom: 4,
  },
  priorityRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  priorityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2b3c62',
    marginRight: 6,
  },
  priorityChipActive: {
    backgroundColor: '#38bdf81f',
    borderColor: '#38bdf8',
  },
  priorityChipText: {
    color: '#9fb2d6',
    fontSize: 12,
  },
  priorityChipTextActive: {
    color: '#e0f2fe',
    fontWeight: '600',
  },
  imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f2d48',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 220,
  },
  cameraButton: {
    marginTop: 4,
    marginBottom: 16,
    backgroundColor: '#0f1933',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  cameraButtonText: {
    color: '#e0f2fe',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#f97316',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#f9731644',
  },
  saveButtonText: {
    color: '#1a0b0b',
    fontWeight: '700',
    fontSize: 15,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 56,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cameraClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#00000088',
  },
  cameraCloseText: {
    color: '#f9fafb',
    fontSize: 13,
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#f9fafb',
  },
});
