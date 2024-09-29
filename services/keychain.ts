import * as SecureStore from 'expo-secure-store';

export async function saveItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string) {
    await SecureStore.getItemAsync(key);
}

export async function removeToken() {
    await SecureStore.deleteItemAsync('authToken');
}