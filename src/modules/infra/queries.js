import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';

// Supplies ----------------------------------------------------
export const getAllSupplies = async () => {
  try {
    const supplieRef = await getDocs(collection(db, "supplies"));
    const response = [];
    supplieRef.forEach(supplie => {
      response.push({id: supplie.id, ...supplie.data()});
    });
    return response;
  } catch (error) {
    console.error("Erro", error);
    return [];
  }
};
// Fim ---------------------------------------------------------

// Pilots ------------------------------------------------------
export const uploadImageToFirestorage = async (image) => {
  const imageRef = ref(storage, `pilots/${image.name}`);
  try {
    await uploadBytes(imageRef, image);
    console.log('Imagem carregada com sucesso');
    return await getDownloadURL(imageRef)
  } catch (error) {
    console.error('Erro:', error);
  }
}

export const getAllProductPilots = async () => {
  try {
    const pilotRef = await getDocs(collection(db, "product-pilots"));
    const response = [];
    pilotRef.forEach(pilot => {
      response.push({id: pilot.id, ...pilot.data()});
    });
    return response;
  } catch (error) {
    console.error("Erro", error);
    return [];
  }
};

export const addNewPilot = async (pilot) => {
try{
  const pilotRef = await addDoc(collection(db, "product-pilots"), pilot);
  console.log(pilotRef.id);
} catch(e){
  console.error('Erro:', e);
}
};

export const editPilot = async(pilotID, newData) => {
  try {
    const pilotRef = doc(collection(db, "product-pilots"), pilotID);
    await updateDoc(pilotRef, newData);
    console.log("Piloto atualizado com sucesso");
  } catch (error) {
    console.error("Erro:", error);
  }
};

export const deletePilot = async (pilotID) => {
  try {
    const pilotRef = doc(collection(db, "product-pilots"), pilotID);
    await deleteDoc(pilotRef);
    console.log("Deletado com sucesso");
  } catch (error) {
    console.error("Erro:", error);
  }
};
// Fim ---------------------------------------------------------