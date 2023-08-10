import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";

const GeneralConditionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Condition General d'utilisation</Text>
      <Text style={styles.condition}>
        Les utilisateurs doivent respecter les droits de propriété
        intellectuelle : Les utilisateurs s'engagent à ne pas télécharger,
        vendre ou échanger de NFT qui enfreignent les droits d'auteur, les
        marques déposées ou d'autres droits de propriété intellectuelle. Contenu
        approprié et légal : Les NFT proposés à la vente doivent respecter les
        lois et réglementations en vigueur. Les contenus violents, offensants,
        illégaux ou discriminatoires ne sont pas autorisés. Transparence des
        informations : Les vendeurs doivent fournir des informations précises et
        complètes sur les NFT, y compris la description, les caractéristiques et
        toute limitation d'utilisation. Respect de la plateforme : Les
        utilisateurs doivent suivre les directives et les politiques de la
        plateforme de manière responsable, notamment en évitant les
        comportements frauduleux, les manipulations ou les abus. Protection de
        la vie privée : Les informations personnelles des utilisateurs doivent
        être protégées conformément à la politique de confidentialité de la
        plateforme, et les utilisateurs ne doivent pas collecter ou utiliser les
        informations d'autres utilisateurs de manière abusive.
      </Text>
      <Text style={styles.title}>⚠ Lire contenu si-dessous</Text>
      <Text style={styles.condition}>
        Veuillez noter que cette condition générale est une esquisse simplifiée.
        Dans la réalité, une marketplace de NFT nécessiterait des conditions
        d'utilisation plus détaillées et spécifiques pour couvrir tous les
        aspects juridiques, techniques et commerciaux liés à la plateforme. Il
        est recommandé de consulter des professionnels du droit et de la
        réglementation pour rédiger des conditions d'utilisation adaptées à
        votre marketplace.
      </Text>
    </View>
  );
};

export default GeneralConditionScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiary,
    justifyContent: "center",
    paddingHorizontal: Size.default,
  },
  title: {
    color: Colors.white,
    fontSize: Size.fs20,
    fontWeight: Size.w600,
    marginVertical: Size.small,
  },
  condition: {
    color: Colors.gray,
    marginBottom: Size.default,
  },
});
