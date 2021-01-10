import React from 'react';
import { View, Dimensions, Text, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../constants';
const { width, height } = Dimensions.get('window');

const StartModal = ({ navigation, user, setUserExited }) => {
  //start guide
  const onStart = () => {
    navigation.navigate('Guide');
    setUserExited(true);
  };

  return (
    <Modal transparent={true} visible={true} style={{ flex: 1 }}>
      <View style={styles.modal}>
        <View style={styles.modal__card}>
          <LinearGradient
            start={{ x: 0.0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={['rgba(219, 21, 64, 0.9)', 'rgba(219, 132, 32, 0.9)']}
            style={{ paddingTop: 35, paddingHorizontal: 35, paddingBottom: 10, borderRadius: 20 }}
          >
            <Text style={styles.modal__card__h1}>Budget App Guide</Text>
            <Text style={styles.modal__card__h3}>Welcome {user && user.name}</Text>
            <Text style={styles.modal__card__text}>
              To be able to properly use this App we suggest following this guided tour of all the features
            </Text>
            <View style={styles.modal__card__btngroup}>
              <TouchableOpacity style={styles.modal__card__btngroup__startbutton}>
                <Text>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modal__card__btngroup__declinebutton} onPress={onStart}>
                <Text>Start Guide</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: { backgroundColor: 'rgba(0,0,0,0.1)', flex: 1 },
  modal__card: {
    margin: 50,
    marginTop: height / 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 2,
    elevation: 15,
  },
  modal__card__h1: { fontSize: 30, textAlign: 'center', color: '#fff' },
  modal__card__h3: { fontSize: 20, textAlign: 'center', color: '#fff', paddingVertical: 10, fontWeight: theme.fonts.weight.semibold },
  modal__card__text: { fontSize: 20, textAlign: 'center', color: '#fff' },
  modal__card__btngroup: { flexDirection: 'row', alignSelf: 'center', marginTop: 10 },
  modal__card__btngroup__startbutton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal__card__btngroup__declinebutton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default StartModal;
