import React, {useEffect, useState} from 'react'
import ProductPagePlaceHolder from './ProductPagePlaceHolder'
import RelatedProducts from './RelatedProducts'
import {useParams} from "react-router-dom"
import api from "../../api"
import { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

const ProductPage = ( {setNumberCartItems}) => {

    const {slug} = useParams()
    const [product, setProduct] = useState({}) 
    const [similarProducts, setSimilarProducts]= useState([])
    const [loading, setLoading]= useState(false)
    const [inCart, setInCart] = useState(false)
    

   

  
   useEffect(() => {

    const cart_code = localStorage.getItem("cart_code");

    if (!product?.id || !cart_code) {
      setInCart(false);
      return;}

    api.get(`/api/product_in_cart/${cart_code}/${product.id}/`)
        .then(res => {
            console.log(res.data)
            setInCart(res.data.product_in_cart)
        })
        .catch(err => {
            console.log(err.message)
        })
}, [product.id])


    function add_item() {

  let cart_code = localStorage.getItem("cart_code");

  if (!cart_code || cart_code === "") {
    cart_code = Math.random().toString(36).substring(2, 10);
    localStorage.setItem("cart_code", cart_code);
  }

  const newItem = {
    cart_code,
    product_id: product.id,
  };
  console.log("Sending:", newItem);

  api.post("/api/add_item/", newItem)
    .then(() => {
      setInCart(true);

      api.get(`/api/get_cart_stat/?cart_code=${cart_code}`)
        .then(res => {
          setNumberCartItems(res.data.num_of_items);
        });
    })
    .catch(err => console.log("ERROR:", err.response?.data));

 
 
}


    useEffect(function(){
        setLoading(true)
         api.get(`/api/product_detail/${slug}`)
          .then(res=>{
        console.log(res.data);
        setProduct(res.data);  
        setSimilarProducts(res.data.similar_products || [])
        setLoading(false)

        
    })
    .catch(err=>{
        console.log(err.message)
         setLoading(false)
       
    })

    },[slug])

    if(loading){
        return <ProductPagePlaceHolder/>
    }



  return (
    <div>

     
      {/* Product Section */}
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">

            {/* Product Image */}
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`${BASE_URL}${product.image}`}
                alt="..."
              />
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <div className="small mb-1">SKU: BST-498</div>

              <h1 className="display-5 fw-bolder">
               {product?.name}
              </h1>

              <div className="fs-5 mb-5">
               
                <span>{`$${product?.price}`}</span>
              </div>

              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium at dolorem quidem modi. Nam sequi consequatur
                obcaecati excepturi alias magni, accusamus eius blanditiis
                delectus ipsam minima ea iste laborum vero?
              </p>

              <div className="d-flex">
                
                <button className="btn btn-outline-dark flex-shrink-0"
                type="button"
                onClick={add_item} 
                disabled={inCart || !product?.id}
                >
                  <i className="bi-cart-fill me-1"></i>
                  {inCart ? "Product added to cart" : "Add to Cart"}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      <RelatedProducts products={similarProducts}/>

    </div>
  )
}

export default ProductPage