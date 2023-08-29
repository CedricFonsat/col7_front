import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import env from '../../data/env';

const SettingScreen = () => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  // Récupérer les cartes favorites de l'utilisateur depuis le backend
  const fetchFavoriteCards = async () => {
    try {
      const response = await fetch('http://172.20.10.3:8000/api/cards', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data,'**********************');
      setFavoriteCards(data); // Mettre à jour l'état avec les cartes favorites
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes favorites', error);
    }
  };

  useEffect(() => {
    fetchFavoriteCards();
  }, []);

  // Gérer le clic sur l'icône de favori
  const handleFavoriteToggle = async (cardId) => {
    try {
      // Envoyer une requête au backend pour ajouter ou supprimer la carte des favoris
      const response = await fetch(`http://172.20.10.3:8000/api/users/1/add_favorite/${cardId}`, {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardId }),
      });
      const data = await response.json();
      console.log(data.cardFavoris); 

        // Marquer chaque carte avec l'attribut isFavorite en fonction des favoris de l'utilisateur
    const favoriteCardIds = data.favorite_card_ids; // Supposons que vous ayez une liste d'IDs de cartes favorites
    const cardsWithFavoriteStatus = data.cards.map((card) => ({
      ...card,
      isFavorite: favoriteCardIds.includes(card.id),
    }));

    setFavoriteCards(cardsWithFavoriteStatus); // Mettre à jour l'état avec les cartes favorites
  
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris', error);
    }
  };

  // Composant de rendu pour chaque carte favorite
  const renderFavoriteCard = ({ item }) => (

    
    <Card
    key={item.id}
    name={item.name}
    price={item.price}
    id={item.id}
    onPress={() => {
    //  handlePresentModalPress(item);
    }}
    bid="flex"
    favorite={item.isFavorite}
    image={{
      uri: `${env.IMAGE_URL_CARD}/${item.imageName}`,
    }}
  />
  );

  return (
    <View style={{
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
          <FlatList
      data={favoriteCards}
      renderItem={renderFavoriteCard}
      keyExtractor={(item) => item.id}
    />
    </View>
  );
};

export default SettingScreen;
