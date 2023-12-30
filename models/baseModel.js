import { getFirestore, collection, doc, addDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import firebase from '../firebase.js'; // Ajuste o caminho conforme necessário

const db = getFirestore(firebase);

class BaseModel {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async add(data) {
    const docRef = await addDoc(this.collectionRef, data);
    return { id: docRef.id, ...data };
  }

  async findById(id) {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }

    return { id: docSnap.id, ...docSnap.data() };
  }

  async findAll(queryConstraints = []) {
    const q = query(this.collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  }

  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data);
  }

  async delete(id) {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }
}

export default BaseModel;