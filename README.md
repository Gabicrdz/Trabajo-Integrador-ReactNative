# Bloc de notas fotografico

Aplicacion movil para tomar y organizar notas de estudio con imagenes. Ideal para capturar pizarrones, libros o diapositivas y anadir contexto en texto.

## Que hace diferente a EstuGrow

- Captura fotos sin salir de la app y agregales descripcion.
- Guarda todo localmente para que no dependas de conexion.
- Organiza las notas con pantallas claras y navegacion por pestanas.
- Modo oscuro por defecto para estudiar de noche.
- Edicion rapida: vuelve a cualquier nota y actualiza texto o foto.

## Requisitos

- Node.js LTS (18+)
- npm o yarn
- Expo Go en tu dispositivo movil
- Dispositivo con camara (recomendado; tambien funciona en emulador)

## Instalacion rapida

1) Clona el repo  
```bash
git clone https://github.com/Gabicrdz/Trabajo-Integrador-ReactNative.git
cd Trabajo-Integrador-ReactNative
```

2) Instala dependencias  
```bash
npm install
```

3) Alinea versiones de Expo (opcional pero recomendado)  
```bash
npx expo install --fix
```
Si aparece un conflicto de pares, prueba:
```bash
npm install --legacy-peer-deps
```

## Como correr el proyecto

- Desarrollo general  
```bash
npm start
# o
npx expo start
```

- iOS con tunel (suele evitar problemas de red)  
```bash
npx expo start --tunnel
```

- Android en LAN  
```bash
npx expo start --lan
```

- Limpiar cache si algo falla  
```bash
npx expo start --clear
```

## Probar en tu telefono

**iOS**  
1. Instala Expo Go desde App Store.  
2. Ejecuta `npx expo start --tunnel`.  
3. Escanea el QR con la camara del iPhone.  
4. La app abre sola en Expo Go.

**Android**  
1. Instala Expo Go desde Play Store.  
2. Ejecuta `npx expo start`.  
3. Escanea el QR desde Expo Go.  
4. Listo, EstuGrow queda lista para usar.

## Plataformas verificadas

- iOS con Expo Go (SDK 54)
- Android con Expo Go (SDK 54)
- Web en navegadores con soporte de camara

## Tecnologias principales

- React Native 0.81.5
- Expo SDK 54.0.0
- Expo Router 6.0.15 (navegacion basada en archivos)
- Expo Camera 17.0.9 (captura de imagenes)
- AsyncStorage 2.2.0 (persistencia local)
- React Navigation 7.1.21

## Estructura breve

```
estugrow/
|-- app/                # Pantallas (Expo Router)
|   |-- _layout.jsx     # Layout principal
|   |-- index.jsx       # Listado de notas
|   |-- create.jsx      # Crear nota
|   |-- about.jsx       # Info de la app
|   |-- edit/[id].jsx   # Editar nota
|   `-- note/[id].jsx   # Ver nota
|-- src/
|   |-- components/     # UI reutilizable
|   |   |-- BottomTabs.jsx
|   |   `-- NoteItem.jsx
|   `-- context/
|       `-- NotesContext.jsx
|-- assets/             # Recursos graficos
`-- package.json
```

## Problemas frecuentes

- Dependencias en conflicto  
  ```bash
  npm install --legacy-peer-deps
  ```

- iOS no conecta al servidor  
  ```bash
  npx expo start --tunnel
  ```

- La camara no responde  
  - Revisa permisos de camara en el dispositivo.  
  - Usa un dispositivo fisico si el emulador limita el acceso.

## Autoria y licencia

Trabajo integrador final de **Rodrigo Amarilla**. Uso academico; consulta tu institucion si requieres otro tipo de licencia.
