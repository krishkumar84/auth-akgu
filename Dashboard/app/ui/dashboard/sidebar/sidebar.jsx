"use client"
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdLogout,
  MdLogin,
} from "react-icons/md";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Faculty",
        path: "/dashboard/faculty",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter()

  const handleLogout = async (event)=>{
    event.preventDefault();
    try {
      const res = await fetch ("https://akgu-backend.onrender.com/admin/logout",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
    })

    if (res.ok) {
      router.push("/admin/login");
      console.log("logout sucessfully");
    } else {
      throw new Error('Logout was not successful');
      console.log("cd xd ")
    }
    }
     catch (error) {
      console.log(error)
    }

  }

  

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>username</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      {/* <form
        onSubmit={handleLogin}
      >
        <button className={styles.logout} >
          <MdLogin />
          <h3>Login</h3>
        </button>
      </form> */}
      <form
        onSubmit={handleLogout}
      >
        <button className={styles.logout} >
          <MdLogout />
          <h3>Logout</h3>
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
