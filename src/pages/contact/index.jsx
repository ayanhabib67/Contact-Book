import {  collection,  deleteDoc,  doc,  onSnapshot, orderBy, query, updateDoc,    } from '@firebase/firestore';
import ButtonCmp from '../../components/ButtonCmp';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../fireBase";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import InputFeildCmp from '../../components/InputFeildCmp';
import styles from "./index.module.css";
import NavbarCmp from '../../components/NavbarCmp';
import FooterCmp from '../../components/footerCmp';



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
<>

      <NavbarCmp />
    <div className={styles.container}>
      <div className={styles.searchBox}>
      <div
  style={{
    display: "flex",
    gap: "10px",
    maxWidth: "600px",
    margin: "0 auto",
    alignItems: "center",
    flexWrap: "wrap", 
  }}
>
  
<InputFeildCmp
 placeholder=" Search by name, email, number, or category..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    flex: "1 1 100%",
    padding: "14px 20px",
    borderRadius: "50px",
    border: "none",
    outline: "none",
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: "500",
    minWidth: "clamp(180px, 40vw, 400px)",
    width: "100%",
    maxWidth: "600px",
    background: "linear-gradient(135deg, #5c748a, #7490ac)",
    color: "#fff",
    boxShadow:
      "0 4px 12px rgba(116,144,172,0.4), inset 2px 2px 5px rgba(255,255,255,0.15)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  }}
/>

<style>
{`
  input::placeholder {
    color: white;
    opacity: 1;
  }
`}
</style>







  <div
    style={{
      flex: "1 1 100%", 
      display: "flex",
      justifyContent: "center", 
    }}
  >
    <ButtonCmp
      text="Add Contact"
      onClick={() => navigate("/add-contact")}
      style={{
        padding: "12px 18px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        whiteSpace: "nowrap",
      }}
    />
  </div>
</div>




      </div>

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
  style={{
    width: "100%",
    padding: "10px 14px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }}
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
  style={{
    width: "100%",
    padding: "10px 14px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }}
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
  style={{
    width: "100%",
    padding: "10px 14px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }}
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
  style={{
    width: "100%",
    padding: "10px 14px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }}
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
  style={{
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(0,0,0,0.25)")
  }
  onMouseOut={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 4px 12px rgba(0,0,0,0.15)")
  }
/>

                </>
              ) : (
                <>
                  <h3 style={{ color: "#1d4ed8", fontWeight: "700" }}>
  {contact.contactNameUser}
</h3>

                  <p className={styles.category}>{contact.contactCategoryUser}</p>
                  <p>📞 {contact.contactNumberUser}</p>
                  <p>
                    ✉️{" "}
                    <a href={`mailto:${contact.contactEmailUser}`}>
                      {contact.contactEmailUser}
                    </a>
                  </p>
                  <div className={styles.actions}>
                  <ButtonCmp
  text="Edit"
  onClick={() => setEditId(contact.id)}
  style={{
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  }}
/>

<ButtonCmp
  text="Delete"
  onClick={() => deleteContact(contact.id)}
  style={{
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s ease, transform 0.2s ease",
    marginLeft: "8px",
  }}
/>

                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      <div className={styles.addBtn}>
   

      </div>
    </div>
    <FooterCmp />
    </>
  );
}

export default ContactPage




