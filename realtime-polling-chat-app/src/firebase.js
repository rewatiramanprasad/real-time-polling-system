import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const app = initializeApp({
    apiKey: "AIzaSyD5FKsh4edjq2ZzaMb5LyyLz63tG_IT5LA",
    authDomain: "test-26006.firebaseapp.com",
    projectId: "test-26006",
    storageBucket: "test-26006.appspot.com",
    messagingSenderId: "968152374791",
    appId: "1:968152374791:web:877742285204bcc53554a2"
  });

 export const auth=getAuth(app);