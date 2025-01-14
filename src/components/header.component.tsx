import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../consts/color.const';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>VENDING.ID</Text>
      <Text style={styles.textSubtitle}>Informasi & Promo Menarik Lainnya</Text>
      <View style={styles.contactContainer}>
        <View style={styles.whatsappContainer}>
          <Icon name="whatsapp" size={20} color={colors.white} />
          <Text style={styles.textSubtitle}>0812-3456-7890</Text>
        </View>
        <View style={styles.instagramContainer}>
          <Icon name="instagram" size={20} color={colors.white} />
          <Text style={styles.textSubtitle}>@vending.id</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  textTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textSubtitle: {
    color: colors.white,
    fontSize: 12,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instagramContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default Header;
