import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
  ImageSourcePropType,
} from 'react-native';
import colors from '../consts/color.const';
import {rupiahFormatter} from '../utils/string-formatter.util';

interface ProductCardProps {
  name: string;
  price: number;
  image: ImageSourcePropType;
  stock: number;
  onPress: () => void;
}

const ProductCard = ({
  name,
  price,
  image,
  stock,
  onPress,
}: ProductCardProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.black : colors.white},
      ]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        {stock < 5 && (
          <View style={styles.stockBadge}>
            <Text style={styles.stockBadgeText}>
              {stock === 0 ? 'Stok Habis' : `Stok Tersisa ${stock}`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.name,
            {color: isDarkMode ? colors.white : colors.black},
          ]}
          numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.price}>{rupiahFormatter(price)}</Text>
        <TouchableOpacity
          style={[
            styles.buyButton,
            stock === 0 ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          onPress={onPress}
          disabled={stock === 0}>
          <Text style={styles.buyButtonText}>
            {stock === 0 ? 'Stok Habis' : 'Beli'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonEnabled: {
    opacity: 1,
  },
});

export default ProductCard;
