import {  collection,  deleteDoc,  doc,  onSnapshot, orderBy, query, updateDoc,    } from '@firebase/firestore';
import ButtonCmp from '../../components/ButtonCmp';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../fireBase";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import InputFeildCmp from '../../components/InputFeildCmp';
import styles from "./index.module.css";



let  ContactPage = () => {
  console.log("ContactPage");
  const navigate = useNavigate();
  
  let [userData ,setUserData] = useState([])
  const [search, setSearch] = useState("");
  
  const [editId, setEditId] = useState(null); 
  const [editValues, setEditValues] = useState({});
  



  
  let fatchData = async (user) => {
    try {
    
    let collectionRef = collection(db, user.uid);

    let dbRef = query(collectionRef, orderBy("timestamp", "asc")); 

    onSnapshot(dbRef, (snapshot) => {
      let allData = [];
      snapshot.forEach((doc) => {
        let data = doc.data();
        allData.push({ id: doc.id, ...data });
        console.log(data);
        
        setUserData(allData)









      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



console.log(userData);


useEffect(()=>{

  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.uid);
    fatchData(user);
  } else {
    console.log("No user logged in");
  }
});

  },[])




  const deleteContact = async (contactId) => {
    try {
      const user = auth.currentUser;  
      if (!user) {
        console.error("User not logged in");
        return;
      }
  
      const docRef = doc(db,  user.uid, contactId);
      await deleteDoc(docRef);

      const newData = userData.filter(item => item.id !== contactId);
      setUserData(newData);
 
      console.log("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };


  return (
    <div className={styles.container}>
      {/* Search */}
      <div className={styles.searchBox}>
        <InputFeildCmp
          placeholder="Search contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Contacts */}
      <div className={styles.grid}>
        {userData
          .filter((item) => {
            if (search === "") return true;
            return (
              item.contactNameUser.toLowerCase().includes(search.toLowerCase()) ||
              item.contactCategoryUser.toLowerCase().includes(search.toLowerCase()) ||
              item.contactNumberUser.includes(search) ||
              item.contactEmailUser.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((contact) => (
            <div className={styles.card} key={contact.id}>
              <img
                src={contact.imagrUrlUser}
                alt={contact.contactNameUser}
                className={styles.avatar}
              />

              {editId === contact.id ? (
                <>
                  <InputFeildCmp
                    placeholder="Name"
                    value={editValues.contactNameUser || contact.contactNameUser}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        contactNameUser: e.target.value,
                      })
                    }
                  />

                  <InputFeildCmp
                    placeholder="Category"
                    value={editValues.contactCategoryUser || contact.contactCategoryUser}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        contactCategoryUser: e.target.value,
                      })
                    }
                  />

                  <InputFeildCmp
                    placeholder="Phone"
                    value={editValues.contactNumberUser || contact.contactNumberUser}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        contactNumberUser: e.target.value,
                      })
                    }
                  />

                  <InputFeildCmp
                    placeholder="Email"
                    value={editValues.contactEmailUser || contact.contactEmailUser}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        contactEmailUser: e.target.value,
                      })
                    }
                  />

                  <ButtonCmp
                    text="Save"
                    onClick={async () => {
                      try {
                        const user = auth.currentUser;
                        if (!user) return;

                        const docRef = doc(db, user.uid, contact.id);
                        await updateDoc(docRef, editValues);

                        console.log("Contact updated successfully!");
                        setEditId(null);
                        setEditValues({});
                      } catch (error) {
                        console.error("Error updating contact: ", error);
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <h3>{contact.contactNameUser}</h3>
                  <p className={styles.category}>{contact.contactCategoryUser}</p>
                  <p>📞 {contact.contactNumberUser}</p>
                  <p>
                    ✉️{" "}
                    <a href={`mailto:${contact.contactEmailUser}`}>
                      {contact.contactEmailUser}
                    </a>
                  </p>
                  <div className={styles.actions}>
                    <ButtonCmp text="Edit" onClick={() => setEditId(contact.id)} />
                    <ButtonCmp text="Delete" onClick={() => deleteContact(contact.id)} />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      <div className={styles.addBtn}>
        <ButtonCmp text="Add Contact" onClick={() => navigate("/add-contact")} />
      </div>
    </div>
  );
}

export default ContactPage




