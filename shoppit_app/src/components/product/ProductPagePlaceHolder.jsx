import React from 'react'

const ProductPagePlaceHolder = () => {
  return (
    <section className="py-3">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">

          
          <div className="col-md-6">
            <div
              className="placeholder-glow w-100 mb-5 mb-md-0"
            >
              <span
                className="placeholder w-100 d-block rounded"
                style={{height: "400px"}}
              ></span>
            </div>
          </div>

          {/* Text Placeholder */}
          <div className="col-md-6">
            <div className="placeholder-glow">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-4"></span>
              <p>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProductPagePlaceHolder