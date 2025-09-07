import React from 'react'
import InputFeildCmp from '../../components/InputFeildCmp'
import { useState } from 'react'
import ButtonCmp from '../../components/ButtonCmp'
import { auth } from "../../fireBase";
import { addDoc, collection, serverTimestamp,} from "fireBase/firestore";
import { db } from "../../fireBase";
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css";



function AddContact() {
  


  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fileHandler = async (e) => {
    try {
      setLoading(true);

      const file = e.target.files[0];
      console.log("Selected File:", file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Ayan-Cloud"); 
      formData.append("cloud_name", "df6wqygko");    

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/df6wqygko/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      setImageUrl(data.secure_url); 


      
      
    } catch (error) {
      console.error("Upload Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  
  
  







let [contactName ,setContactName] = useState("")
let [contactNumber ,setContactNumber] = useState("")
let [contactEmail ,setContactEmail] = useState("")
let [contactCategory ,setContactCategory] = useState("")



const navigate = useNavigate();

let addUserContact =  async()=>{
 
try {
    const useruid = auth.currentUser?.uid;

  

    let contactData = {
      contactNameUser: contactName,
      contactNumberUser: contactNumber,
      contactEmailUser: contactEmail,
      contactCategoryUser: contactCategory,
      timestamp: serverTimestamp(),
      imagrUrlUser :imageUrl 
    };

    let dbRef  =collection(db,useruid)

    await addDoc(dbRef, contactData);

    console.log("Contact added successfully!");
    navigate("../contact"); 
  } catch (error) {
    console.error("Error adding contact:", error);
  }






}

  
return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Add New Contact</h2>
      <p className={styles.subtitle}>Fill the details below 👇</p>

      <div className={styles.form}>
        <InputFeildCmp
          placeholder="Enter Your Contact Name"
          onChange={(e) => setContactName(e.target.value)}
        />

        <InputFeildCmp
          placeholder="Enter Your Contact Number"
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <InputFeildCmp
          placeholder="Enter Your Contact Email"
          onChange={(e) => setContactEmail(e.target.value)}
        />

        {/* Category */}
        <div className={styles.field}>
          <label htmlFor="category" className={styles.label}>
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={contactCategory}
            onChange={(e) => setContactCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">Choose Category</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="office">Office</option>
            <option value="work">Work</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className={styles.upload}>
          <h3>Upload Profile Picture</h3>
          <input type="file" onChange={fileHandler} />

          {loading && <p className={styles.loading}>Uploading... Please wait</p>}

          {imageUrl && (
            <div className={styles.preview}>
              <img src={imageUrl} alt="Uploaded" className={styles.image} />
            </div>
          )}
        </div>

        <ButtonCmp text="Add Contact" onClick={addUserContact} />
      </div>
    </div>
  </div>
);
}

export default AddContact
