import { ref, get } from 'firebase/database';

import dbFirebase from './config';

export const getLedStatus = async () => {
  try {
    const ledRef = ref(dbFirebase, '/led/brightness');
    const snapshot = await get(ledRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};
