import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
const SalonCard = ({ 
  backgroundImage, 
  logoImage, 
  name, 
  address, 
  rating, 
  reviewCount 
}) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage} imageStyle={styles.bgImageStyle}>
      <View style={styles.overlay}>
        <View style={styles.row}>
          {/* Logo on left */}
          <Image source={logoImage} style={styles.logo} />

          {/* Info in center */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>

            <View style={styles.ratingContainer}>
              {[...Array(filledStars)].map((_, index) => (
                <Icon key={index} name="star" size={16} color="#fff" />
              ))}
              {hasHalfStar && <Icon name="star-half" size={16} color="#fff" />}
              {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <Icon key={index + 5} name="star-border" size={16} color="#fff" />
              ))}
              <Text style={styles.reviewText}>({reviewCount} Reviews)</Text>
            </View>
          </View>

          {/* Edit icon on right */}
          <Feather name="edit" size={24} color="#fff" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SalonCard;

const styles = StyleSheet.create({
  bgImage: {
    height: 200,
    overflow: 'hidden',
    width: '100%',
  },
  bgImageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Bold',
    marginBottom: 4,
  },
  address: {
    color: '#fff',
    fontSize: 15,
    marginTop: 2,
     fontFamily: 'Regular',
     marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  reviewText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Regular',
  },
});
