import React, {useEffect, useState} from 'react';
import {
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../consts/color.const';
import {useProductContext} from '../contexts/product.context';
import ProductCard from '../components/product-card.component';
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import ModalPurchase from '../components/modal-purchase.component';
import ModalPayment from '../components/modal-payment.component';
import ThankYouModal from '../components/thank-you-modal.component';

function HomeScreen(): React.JSX.Element {
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false);
  const [isModalPurchaseVisible, setIsModalPurchaseVisible] = useState(false);
  const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false);
  const [selectedMoneyValue, setSelectedMoneyValue] = useState<number | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    price: number;
    image: ImageSourcePropType;
  } | null>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const {products, setProducts} = useProductContext();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.black : colors.white,
  };

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Biskuit',
        price: 6000,
        image: require('../assets/images/product/biskuit.jpg'),
        stock: 0,
      },
      {
        id: 2,
        name: 'Chips',
        price: 8000,
        image: require('../assets/images/product/chips.jpg'),
        stock: 1,
      },
      {
        id: 3,
        name: 'Oreo',
        price: 10000,
        image: require('../assets/images/product/oreo.jpg'),
        stock: 5,
      },
      {
        id: 4,
        name: 'Tango',
        price: 12000,
        image: require('../assets/images/product/tango.jpg'),
        stock: 10,
      },
      {
        id: 5,
        name: 'Cokelat',
        price: 15000,
        image: require('../assets/images/product/cokelat.jpg'),
        stock: 12,
      },
    ]);
  }, [setProducts]);

  const renderProductGrid = () => {
    return (
      <View style={styles.productGrid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            image={product.image as ImageSourcePropType}
            onPress={() => {
              setSelectedProduct({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image as ImageSourcePropType,
              });
              setIsModalPurchaseVisible(true);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainContainer]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle]}>
        <>
          <Header />
          <View
            style={[
              {backgroundColor: isDarkMode ? colors.black : colors.white},
              styles.contentContainer,
            ]}>
            {renderProductGrid()}
          </View>
          <Footer />
        </>
      </ScrollView>
      <ModalPurchase
        visible={isModalPurchaseVisible}
        onClose={() => setIsModalPurchaseVisible(false)}
        onConfirm={() => {
          setIsModalPaymentVisible(true);
          setIsModalPurchaseVisible(false);
        }}
        product={selectedProduct}
      />
      <ModalPayment
        visible={isModalPaymentVisible}
        onClose={() => setIsModalPaymentVisible(false)}
        onConfirm={() => {
          setIsThankYouModalVisible(true);
          setIsModalPaymentVisible(false);

          // update stock
          const updatedProducts = products.map(product => {
            if (product.id === selectedProduct?.id) {
              return {...product, stock: product.stock - 1};
            }
            return product;
          });
          setProducts(updatedProducts);
        }}
        product={selectedProduct}
        setSelectedMoneyValue={setSelectedMoneyValue}
      />
      <ThankYouModal
        visible={isThankYouModalVisible}
        onClose={() => setIsThankYouModalVisible(false)}
        onConfirm={() => {
          setIsThankYouModalVisible(false);
        }}
        product={selectedProduct}
        selectedMoneyValue={selectedMoneyValue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
