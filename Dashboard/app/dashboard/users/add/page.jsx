'use client'
import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddUserPage = () => {

  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); 

  const handleImg = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', e.target.elements.image.files[0]);

      const uploadResponse = await axios.post("https://akgu-backend-7z96.onrender.com/api/upload", formData);

      if (uploadResponse.data.msg === "Uploaded successfully") {
        console.log("Image uploaded successfully");
        setImageUrl(uploadResponse.data.imageUrl); 
        setUploadSuccess(true);
      } else {
        console.log("Image not uploaded");
        setUploadSuccess(false);
      }
    } catch (err) {
      console.error("Error during image upload request", err);
      window.alert("An error occurred. Please try again.");
      setUploadSuccess(false);
    };
  };

    useEffect(() => {
      if (uploadSuccess) {
        // If upload was successful, you can perform additional actions or submit the form
        console.log("Image uploaded successfully. You can now submit the form.");
      }
    }, [uploadSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imageUrl) {
        console.log("Image URL is null. Please upload an image first.");
        return;
      }

      const formData = new FormData(e.target);

      const res = await axios.post("https://akgu-backend-7z96.onrender.com/api/achievement", {
        title: formData.get("title"),
         imageUrl: imageUrl,
        description: formData.get("address"),
      });

      if (res.status === 200) {
        console.log("Acheivement added successfully");
        router.push("/dashboard/users");
      } else {
        console.log("Acheivement not added");
      }
    } catch (err) {
      console.error("Error during Acheivement add request", err);
      console.log("An error occurred. Please try again.");
    }

  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleImg} method="post">
        <input type="file" name="image" />
        <button type="submit">Upload Image</button>
      </form>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <textarea
          name="address"
          id="address"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
