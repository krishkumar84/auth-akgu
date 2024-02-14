'use client'
// import Search from "@/app/ui/dashboard/search/search";
import styles from "./users.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage =  () => {


  const [data, setData] = useState([]);

   useEffect(()=>{
       const fetchAchievements = async ()=>{
        try {
        const response = await fetch('https://akgu-backend-7z96.onrender.com/api/achievement');
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
      console.log(error)
    }
  };
    fetchAchievements();
   },[])


   const handleDelete = async (id)=>{
    // e.preventDefault();

    try {
      const responseDelete = await fetch(`https://akgu-backend-7z96.onrender.com/api/achievement/${id}`, {
      method : "DELETE",
    })

    if (!responseDelete.ok) {
      throw new Error("error");
    }
    router.push("/dashboard/users")
    
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a user..." /> */}
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Image</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.imageUrl || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.title}</td>
              <td>{user.description}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={''}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form >
                    <input value={user._id} type="hidden" name="id"  />
                    <button onClick={()=>{
                      handleDelete(user._id)
                    }} className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default UsersPage;
