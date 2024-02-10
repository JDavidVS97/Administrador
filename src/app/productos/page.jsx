'use client'
const { Fragment, useState, useEffect } = require("react");
import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductosPage= ()=>{

    const [productos,setProductos]=useState([]);
    const router = useRouter();

    const getProductos= async()=>{
        const response = await axios.get("http://localhost:8000/api/productos");
        const result = await response.data;
        setProductos(result);
    }

    const deleteProduct = (id)=> async ()=>{
        try {
            const response = await axios.delete(`http://localhost:8000/api/productos/${id}`)
            const result =  await response.data;
            console.log(result);
            // router.push("/productos");
            setProductos((prevVal)=>{
                const newList =prevVal.filter((item)=>item._id !== id);
                return([...newList]);
            })
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(()=>{
        getProductos();
    },[]);

    return(
        <Fragment>
            <h1>Productos Disponibles</h1>
            <ul>
                {
                    productos.map((item,idx)=>{
                        return(
                            <li key={idx}>
                                <h5 className={styles.lista} style={{display:"flex",alignItems:"center"}}>
                                    <Link href={`/productos/${item._id}`}>{item.title}</Link>
                                    <button style={{marginLeft:"5px"}}><Link href={`/productos/${item._id}/edit`}>Editar</Link></button>
                                    <button onClick={deleteProduct(item._id)} style={{marginLeft:"5px"}}>Eliminar</button>
                                </h5>
                            </li>
                        );
                    })
                }
            </ul>
        </Fragment>
    );
}

export default ProductosPage;