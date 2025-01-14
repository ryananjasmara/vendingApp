import React from 'react';
import {Linking, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../consts/color.const';

const Footer = () => {
  const handlePress = () => {
    Linking.openURL('https://wa.me/6281234567890');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>
        Anda Memiliki Kendala? Hubungi Customer Service Kami
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="whatsapp" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Customer Service</Text>
      </TouchableOpacity>
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
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Footer;
