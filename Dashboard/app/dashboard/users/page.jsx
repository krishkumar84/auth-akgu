"use client"
// import { deleteUser } from "@/app/lib/actions";
// import { fetchUsers } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const [users, setUsers] = useState([])
  // const { count, users } = await fetchUsers(q, page);
   useEffect(()=>{
   
      const fetchAchievements = async ()=>{
        try {
        const res = await fetch('http://localhost:5000/api/achievements');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
      console.log(error)
    }
  };
    fetchAchievements();
   },[])
  

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
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
            <td>Image</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td> */}
              <td>{user.title}</td>
              <td>{user.description}</td>
              <td><div className={styles.user}>
                  <Image
                    src={user.imageUrl1 || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div></td>
                <td><div className={styles.user}>
                  <Image
                    src={user.imageUrl1 || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div></td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action="">
                    <input type="hidden" name="id" value={(user.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
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
