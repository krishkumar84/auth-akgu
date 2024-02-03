'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
//import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faculty');
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/faculty/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>POST</td>
            <td>Degree</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={item.imageUrl || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {item.fullname}
                </div>
              </td>
              <td>{item.post}</td>
              <td>${item.degree}</td>
              <td>{item.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={''}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" />
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

export default ProductsPage;
