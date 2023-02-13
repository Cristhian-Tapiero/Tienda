// Import the functions you need from the SDKs you need
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js'
import { getFirestore, collection, addDoc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyddSabQ2RRRVLfiB9payipTqj1tQaf_g",
  authDomain: "artes-y-cosas.firebaseapp.com",
  projectId: "artes-y-cosas",
  storageBucket: "artes-y-cosas.appspot.com",
  messagingSenderId: "37871471430",
  appId: "1:37871471430:web:4b8894d122e065caeb7347",
  measurementId: "G-GYR4MK3P6B"
};
//Initialize classes
class Factura {
  constructor(id, item, client, cant, total) {
      this.id = id,
      this.item = item,
      this.client = client,
      this.cant = cant,
      this.total = total
  }
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
export const agregarClienteBD = (id, nombre, telefono, correo) =>{
    addDoc(collection(db, 'Clients'), {id, nombre,telefono, correo})
}
export const agregarProductoBD = (id, nombre, precio, cantidad) => {
    addDoc(collection(db, 'Products'), {id, nombre, precio, cantidad})
}
export const crearFactura = (id_client, name_client, id_product, name_product, cant_product, total_compra) =>{
  addDoc(collection(db, "Facturas"), {id_client, name_client, id_product, name_product, cant_product, total_compra})
}
export const executeQuery = (table, value) =>{
  const q1 = query(collection(db,table), where('id', '==', value))
  onSnapshot(q1, (snapshot) =>{
    if(!snapshot.empty){
      snapshot.docs.forEach((doc) =>{
        console.log(doc.data().nombre);
      })
    }else{
      console.log("Cliente no registrado");
    }
  })
}