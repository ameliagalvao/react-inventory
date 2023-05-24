import { collection, getDocs } from 'firebase/firestore';
import { db } from './FireBase';

export const getAllProductPilots = async () => {
  const doc_refs = await getDocs(collection(db, "product-pilots"));
  const response = [];
  doc_refs.forEach(pilot => {
    response.push({id: pilot.id, ...pilot.data()});
  });
  return response;
};