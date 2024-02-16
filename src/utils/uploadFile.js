import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadFile(file) {
  try {
    const fileRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(fileRef, file);

    const photoUrl = await getDownloadURL(fileRef);

    return photoUrl;
  } catch (error) {
    console.log(error);
  }
}
