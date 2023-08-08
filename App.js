import AppNavigator from "./src/navigation/app.navigator";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


export default function App() {
  return (
    <Provider store={store}>
          <AppNavigator />
    </Provider>
  );
}

// // Enregistrez votre composant racine avec AppRegistry
// AppRegistry.registerComponent('collect7_front', () => App);

// // Démarrez l'application en appelant AppRegistry.runApplication
// AppRegistry.runApplication('collect7_front', {
//   rootTag: document.getElementById('root'), // Remplacez "root" par l'ID de votre élément racine dans le fichier HTML
// });
