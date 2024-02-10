'use client'
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {

const [title,setTitle]=useState("");
const [price,setPrice]=useState(0);
const [description,setDescription]=useState("");

const handleCreateProducto=async(e)=>{
  e.preventDefault();
  const data={
    title,
    price,
    description,
  }
  console.log(data);
  try {
    const response = await axios.post("http://localhost:8000/api/productos",data);
    const result = await response.data;
    setTitle("");
    setPrice(0);
    setDescription("");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <main className={styles.main}>
      <form onSubmit={handleCreateProducto}>
        <div>
          <label htmlFor="">Title</label>
          <input type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input type="number"
          value={price}
          onChange={(e)=>setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input type="text"
          value={description}
          onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
