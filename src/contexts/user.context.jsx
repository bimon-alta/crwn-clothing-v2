import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';


// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  
});


// Provider is the actual component that will wrap around 
// any other component that need access to the value inside.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  

  // MEMINDAHKAN BLOK KODE UTK LISTENING USER AUTH, DARI 
  // SETIAP KOMPONEN AUTH KE CONTEXT (TERPUSAT/INDUK)
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user)=>{
      // console.log(user);

      if(user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}



// FUNGSI UTAMA DARI CONTEXT ADALAH SEBAGAI OPTIMASI DARI useState
// membuat state menjadi GLOBAL sehingga bisa diakses oleh komponen2
// dibawah atau di atas KOMPONEN dimana state tsb dideklarasikan
// TENTUNYA dengan bantuan PROVIDER

// setiap komponen yg LISTEN (HOOKED) state dari context terkait, maka
// setiap kali ada proses perubahan STATE maka komponen akan DIJALANKAN
// atau bahasa mudahnya DIRE-RENDER, akan tetapi arti RE-RENDER ini sebenarnya
// kurang tepat, karena selama tidak ada perubahan apapun di komponen yg LISTEN STATE
// (misal cuma mengambil data dari state TANPA menampilkannya di visual), maka
// komponen tsb sebenarnya hanya DIJALANKAN ULANG /DIRE-RUN
// akan tetapi tidak dilakukan RENDER oleh VIRTUAL DOM.
// yang mana sangat MUSTAHIL TERJADI proses LISTENING STATE tanpa
// MENGOLAH/MENAMPILKAN state itu sendiri.
