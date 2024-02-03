"use client"
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

// ... (previous imports and code)

const AddProductPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state to track upload success
  const router = useRouter();

  const handleImg = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', e.target.elements.image.files[0]);

      const uploadResponse = await axios.post("https://akgu-backend-7z96.onrender.com/api/upload", formData);

      if (uploadResponse.data.msg === "Uploaded successfully") {
        console.log("Image uploaded successfully");
        setImageUrl(uploadResponse.data.imageUrl); // Save the image URL
        setUploadSuccess(true);
      } else {
        console.log("Image not uploaded");
        setUploadSuccess(false);
      }
    } catch (err) {
      console.error("Error during image upload request", err);
      window.alert("An error occurred. Please try again.");
      setUploadSuccess(false);
    }
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

      const res = await axios.post("https://akgu-backend-7z96.onrender.com/api/faculty", {
        fullname: formData.get("fullname"),
        post: formData.get("post"),
        degree: formData.get("degree"),
        imageUrl: imageUrl,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Request headers:", res.config.headers);

      if (res.data.msg == "added successfully") {
        console.log("Faculty added successfully!");
        // You may handle the success case as needed
      } else {
        console.log("Failed to add faculty");
        // You may handle the failure case as needed
      }
    } catch (err) {
      console.error("Error during POST request", err);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleImg} method="post">
        <input type="file" name="image" />
        <button type="submit">Upload Image</button>
      </form>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="title" name="fullname" required />
        <select name="post" id="post">
          <option value="general">Choose a Category</option>
          <option value="HOD">HOD</option>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">Associate Professor</option>
        </select>
        <input type="text" placeholder="degree" name="degree" />
        <button type="submit">Submit Faculty</button>
      </form>
    </div>
  );
};

export default AddProductPage;
