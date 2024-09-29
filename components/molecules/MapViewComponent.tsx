import React, { useImperativeHandle, forwardRef, useState, Ref } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

// Define the types for the ref
export interface FullScreenModalRef {
  open: () => void;
  close: () => void;
}

// Define the component
const MapViewComponent = forwardRef<FullScreenModalRef, {}>((props, ref) => {
  const [visible, setVisible] = useState(false);

  // Expose open and close methods to the parent component
  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Full Screen Modal</Text>
        <Button title="Close" onPress={() => setVisible(false)} />
      </View>
    </Modal>
  );
});

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MapViewComponent;
