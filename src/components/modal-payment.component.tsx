import React, {useEffect, useState} from 'react';
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

interface ModalPaymentProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: {
    name: string;
    price: number;
    image: ImageSourcePropType;
  } | null;
  setSelectedMoneyValue: (value: number) => void;
}

const ModalPayment = ({
  visible,
  onClose,
  onConfirm,
  product,
  setSelectedMoneyValue,
}: ModalPaymentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedMoneyId, setSelectedMoneyId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedMoneyId(null);
  }, [visible]);

  if (!product) {
    return null;
  }

  const moneyOptions = [
    {
      id: 1,
      value: 2000,
      image: require('../assets/images/money/2000.jpg'),
    },
    {
      id: 2,
      value: 5000,
      image: require('../assets/images/money/5000.jpg'),
    },
    {
      id: 3,
      value: 10000,
      image: require('../assets/images/money/10000.jpg'),
    },
    {
      id: 4,
      value: 20000,
      image: require('../assets/images/money/20000.jpg'),
    },
    {
      id: 5,
      value: 50000,
      image: require('../assets/images/money/50000.jpg'),
    },
  ];

  const renderMoneyOptions = () => {
    return moneyOptions.map(money => (
      <TouchableOpacity
        disabled={money.value < product.price}
        key={money.id}
        style={[
          styles.moneyOption,
          selectedMoneyId === money.id ? styles.moneyOptionSelected : null,
          money.value < product.price ? styles.moneyOptionDisabled : null,
        ]}
        onPress={() => {
          setSelectedMoneyId(money.id);
        }}>
        <Image source={money.image} style={styles.moneyOptionImage} />
      </TouchableOpacity>
    ));
  };

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
          <View style={styles.moneyOptionContainer}>
            <Text style={styles.moneyOptionTitle}>Harga 1 Buah {product.name} Adalah {rupiahFormatter(product.price)}</Text>
            <Text style={styles.moneyOptionTitle}>Ingin Bayar Dengan?</Text>
            {renderMoneyOptions()}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Batalkan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                if (selectedMoneyId) {
                  setSelectedMoneyValue(moneyOptions[selectedMoneyId - 1].value);
                  onConfirm();
                }
              }}>
              <Text style={styles.confirmButtonText}>Beli</Text>
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
  moneyOptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 16,
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
  moneyOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  moneyOption: {
    width: 200,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  moneyOptionDisabled: {
    opacity: 0.5,
  },
  moneyOptionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  moneyOptionTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ModalPayment;
