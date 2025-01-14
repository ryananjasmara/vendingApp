import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  ImageSourcePropType,
} from 'react-native';
import colors from '../consts/color.const';
import {rupiahFormatter} from '../utils/string-formatter.util';

interface ThankYouModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: {
    name: string;
    price: number;
    image: ImageSourcePropType;
  } | null;
  selectedMoneyValue: number | null;
}

const ThankYouModal = ({
  visible,
  onClose,
  onConfirm,
  product,
  selectedMoneyValue,
}: ThankYouModalProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  if (!product || !selectedMoneyValue) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: isDarkMode ? colors.black : colors.white},
          ]}>
          <View style={styles.imageContainer}>
            <Image source={product.image} style={styles.image} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Terimakasih telah membeli {product.name} seharga{' '}
              {rupiahFormatter(product.price)}
            </Text>
            <Text style={styles.contentText}>
              Anda membayar dengan uang {rupiahFormatter(selectedMoneyValue)} dan kembalian anda
              adalah sejumlah{' '}
              {rupiahFormatter(selectedMoneyValue - product.price)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Selesai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  contentText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default ThankYouModal;
