import React from 'react'
import InputFeildCmp from '../../components/InputFeildCmp'
import { useState } from 'react'
import ButtonCmp from '../../components/ButtonCmp'
import { auth } from "../../fireBase";
import { addDoc, collection, serverTimestamp,} from "fireBase/firestore";
import { db } from "../../fireBase";
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css";
import NavbarCmp from '../../components/NavbarCmp';
import FooterCmp from '../../components/footerCmp';
import Swal from 'sweetalert2';



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
 

  if (contactName && contactNumber && contactEmail && contactCategory && imageUrl) {
    console.log("All fields filled ");
    
    
    
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
    Swal.fire({
      icon: "success",
      title: "🎉 Contact Added!",
      text: "Contact added successfully!",
      confirmButtonColor: "#1d4ed8",
    });
    
    navigate("../contact"); 
  } catch (error) {
    console.error("Error adding contact:", error.message);
    Swal.fire({
      icon: "error",
      title: "Oops! 😢",
      text: error.message, 
      confirmButtonColor: "#d33",
    });
  }
  
  
} else {
  
  Swal.fire({
    icon: "warning",
    title: "Please fill all fields ❌",
    text: "All fields are required before adding a contact.",
    confirmButtonColor: "#d33",
  });
}




}

  

return (

<>

  <NavbarCmp />

  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Add New Contact</h2>
      <p className={styles.subtitle}>Fill the details below 👇</p>

      <div className={styles.form}>
      <InputFeildCmp
  placeholder="Enter Your Contact Name"
  onChange={(e) => setContactName(e.target.value)}
  style={{
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    color: "#111",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  }}
  onFocus={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(29,78,216,0.3), inset 0 2px 4px rgba(0,0,0,0.05)")
  }
  onBlur={(e) =>
    (e.currentTarget.style.boxShadow =
      "inset 0 2px 4px rgba(0,0,0,0.05)")
  }
/>

<InputFeildCmp
  placeholder="Enter Your Contact Number"
  onChange={(e) => setContactNumber(e.target.value)}
  style={{
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    color: "#111",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  }}
  onFocus={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(29,78,216,0.3), inset 0 2px 4px rgba(0,0,0,0.05)")
  }
  onBlur={(e) =>
    (e.currentTarget.style.boxShadow =
      "inset 0 2px 4px rgba(0,0,0,0.05)")
  }
/>

<InputFeildCmp
  placeholder="Enter Your Contact Email"
  onChange={(e) => setContactEmail(e.target.value)}
  style={{
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    color: "#111",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  }}
  onFocus={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(29,78,216,0.3), inset 0 2px 4px rgba(0,0,0,0.05)")
  }
  onBlur={(e) =>
    (e.currentTarget.style.boxShadow =
      "inset 0 2px 4px rgba(0,0,0,0.05)")
  }
/>


        <div
  style={{
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    width: "100%",
  }}
>
  <label
    htmlFor="category"
    style={{
      marginBottom: "8px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#111",
    }}
  >
    Select Category
  </label>

  <select
    id="category"
    name="category"
    value={contactCategory}
    onChange={(e) => setContactCategory(e.target.value)}
    style={{
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "16px",
      width: "100%",
      backgroundColor: "#fff",
      color: "#111",
      transition: "all 0.3s ease",
      appearance: "none", 
      WebkitAppearance: "none",
      MozAppearance: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    }}
    onFocus={(e) =>
      (e.currentTarget.style.boxShadow =
        "0 0 0 3px rgba(29,78,216,0.3), inset 0 2px 4px rgba(0,0,0,0.05)")
    }
    onBlur={(e) =>
      (e.currentTarget.style.boxShadow =
        "inset 0 2px 4px rgba(0,0,0,0.05)")
    }
  >
    <option value="">Choose Category</option>
    <option value="family">Family</option>
    <option value="friend">Friend</option>
    <option value="office">Office</option>
    <option value="work">Work</option>
  </select>
</div>


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

        <button
  onClick={addUserContact}
  style={{
    width: "100%",
    padding: "14px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#1d4ed8",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
>
  Add Contact
</button>

      </div>
    </div>
  </div>

<FooterCmp />

            </>
);
}

export default AddContact
