'use client'
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";



const DetalleProducto =()=>{
    
    const {id}=useParams();
    const router = useRouter();
    const [producto,setProducto]= useState({});

    const getProducto= async ()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/productos/${id}`)
            const result =  await response.data;
            setProducto(result);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async ()=>{
        try {
            const response = await axios.delete(`http://localhost:8000/api/productos/${id}`)
            const result =  await response.data;
            console.log(result);
            router.push("/productos");
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(()=>{
        getProducto();
    },[])

    return(
        <main>
            <h1>Detalles del producto</h1>
            <h3>Titulo: {producto.title}</h3>
            <h4>Precio: Gs. {producto.price}</h4>
            <h4>Descripcion: {producto.description}</h4>
            <button onClick={deleteProduct}>Eliminar</button>
        </main>
    );
}


export default DetalleProducto;