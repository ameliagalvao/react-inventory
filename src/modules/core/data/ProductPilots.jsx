import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './FireBase';

export const getAllProductPilots = async () => {
  const doc_pilots = await getDocs(collection(db, "product-pilots"));
  const response = [];
  doc_pilots.forEach(pilot => {
    response.push({id: pilot.id, ...pilot.data()});
  });
  return response;
};

export const addNewPilot = async (pilot) => {
try{
  const doc_pilots = await addDoc(collection(db, "product-pilots"), pilot);
  console.log(doc_pilots.id);
} catch(e){
  console.error('Erro:', e);
}
}