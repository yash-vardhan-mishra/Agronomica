import LottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import CustomText from '../atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';
import Paths from '../../constants/Paths';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LottieView
            autoPlay
            loop={false}
            style={styles.animationView}
            onAnimationFinish={onClose}
            source={Paths.animations.successCheckmark}
          />
          <CustomText style={styles.titleText} size={28} weight='700' color={Colors.darkGunmetal}>
            Registered!
          </CustomText>
          <CustomText style={styles.bottomText} color={Colors.romanSilver} size={16}>Your OTP has been verified successfully</CustomText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animationView: {
    width: 112,
    height: 112,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 12
  },
  titleText: { marginVertical: 24 },
  bottomText: { textAlign: 'center' }
});

export default SuccessModal;