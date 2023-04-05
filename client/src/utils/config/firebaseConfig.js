import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDTxQhjbVKWoGJZIzNDAVb5_nnyYLDF5zA",
	authDomain: "price-recommender.firebaseapp.com",
	projectId: "price-recommender",
	storageBucket: "price-recommender.appspot.com",
	messagingSenderId: "313426221129",
	appId: "1:313426221129:web:7bccd96395bba33e7f0798",
	measurementId: "G-RGL5303PTX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore };
