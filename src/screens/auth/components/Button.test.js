// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button'; // Assurez-vous d'importer correctement votre composant Button

test('Le composant Button rend correctement et déclenche onPress', () => {
  const onPressMock = jest.fn(); // Créez une fonction factice pour onPress
  
  // Rendu du composant Button avec les props appropriées
  const { getByText } = render(
    <Button
      text="Mon bouton"
      backgroundColor="blue"
      borderColor="red"
      borderWith={2}
      onPress={onPressMock}
    />
  );

  // Vérifiez que le texte "Mon bouton" est présent dans le composant rendu
  const buttonText = getByText('Mon bouton');
  expect(buttonText).toBeTruthy();

  // Simule un clic sur le bouton
  fireEvent.press(buttonText);

  // Vérifiez si onPress a été appelé
  expect(onPressMock).toHaveBeenCalled();
});
