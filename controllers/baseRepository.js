import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import firebase from '../firebase.js';

class BaseRepository {
  constructor(collectionName) {
    const db = getFirestore(firebase);
    this.collectionRef = collection(db, collectionName);
  }

  async create(data) {
    const docRef = await addDoc(this.collectionRef, data);
    return { id: docRef.id, ...data };
  }

  async findAll() {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id) {
    const docRef = doc(this.collectionRef, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Document not found');
    }
    return { id: snapshot.id, ...snapshot.data() };
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

export default BaseRepository;