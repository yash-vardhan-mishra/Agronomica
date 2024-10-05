import { Alert, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


export const _size = (digits: number) => {
  let s = 90 / digits;
  return `${s}%`;
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    height: 1,
    width: 1,
    opacity: 0
  },
  renderInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.amber,
    paddingVertical: 16,
    minHeight: 64
  },
  textStyles: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Inter-Bold'
  },
  focused: {
    borderColor: Colors.philippineOrange
  }
});


export const showError = (err: any) => {
  Alert.alert('Error', err?.response?.data?.error || err?.message || 'Something went wrong')
}
