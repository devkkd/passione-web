"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const FEATURED_OPTIONS = [
  {
    label: "NEW ARRIVALS",
    value: "new-arrivals",
  },
  {
    label: "BESTSELLERS",
    value: "bestsellers",
  },
  {
    label: "CELEBRITIES' CHOICE",
    value: "celebrities-choice",
  },
];

const STYLE_OPTIONS = [
  {
    label: "MEN'S",
    value: "mens",
  },
  {
    label: "CASUAL",
    value: "casual",
  },
  {
    label: "STATEMENT",
    value: "statement",
  },
  {
    label: "FRIENDSHIP",
    value: "friendship",
  },
];

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");

  const [types, setTypes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [gemstones, setGemstones] = useState([]);

  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",

    price: "",
    salePrice: "",

    sku: "",
    stock: "",

    type: "",
    collection: "",
    gemstone: "",

    featured: [],
    styles: [],

    metal: "",
    metalColor: "",
    purity: "",
    weight: "",
    dimensions: "",

    occasion: "",
    certificate: "",
    careInstructions: "",
    shippingInfo: "",
    returnPolicy: "",
    warranty: "",

    active: true,
  });

  // =====================================================
  // Load Categories
  // =====================================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoryLoading(true);

        const [
          typeRes,
          collectionRes,
          gemstoneRes,
        ] = await Promise.all([
          api.get("/categories/type/type"),
          api.get("/categories/type/collection"),
          api.get("/categories/type/gemstone"),
        ]);

        setTypes(
          typeRes.data.categories || []
        );

        setCollections(
          collectionRes.data.categories || []
        );

        setGemstones(
          gemstoneRes.data.categories || []
        );
      } catch (err) {
        console.error(
          "Category Error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load categories."
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategories();
  }, []);

  // =====================================================
  // Input Change
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // Active Toggle
  // =====================================================

  const toggleActive = () => {
    setForm((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  // =====================================================
  // Checkbox Arrays
  // =====================================================

  const toggleArrayValue = (
    field,
    value
  ) => {
    setForm((prev) => {
      const current =
        prev[field] || [];

      const exists =
        current.includes(value);

      return {
        ...prev,
        [field]: exists
          ? current.filter(
              (item) => item !== value
            )
          : [...current, value],
      };
    });
  };

  // =====================================================
  // Images
  // =====================================================

  const handleImages = (e) => {
    const selectedFiles =
      Array.from(
        e.target.files || []
      );

    if (!selectedFiles.length) {
      return;
    }

    setImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // =====================================================
  // Submit
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // -------------------------
    // Basic Validation
    // -------------------------

    if (!form.name.trim()) {
      setError(
        "Product name is required."
      );
      return;
    }

    if (!form.price) {
      setError(
        "Product price is required."
      );
      return;
    }

    if (!form.type) {
      setError(
        "Product type is required."
      );
      return;
    }

    if (!form.collection) {
      setError(
        "Product collection is required."
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      // =================================================
      // Basic fields
      // =================================================

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "shortDescription",
        form.shortDescription
      );

      formData.append(
        "description",
        form.description
      );

      // =================================================
      // Pricing
      // =================================================

      formData.append(
        "price",
        form.price
      );

      if (form.salePrice !== "") {
        formData.append(
          "salePrice",
          form.salePrice
        );
      }

      // =================================================
      // Inventory
      // =================================================

      if (form.sku) {
        formData.append(
          "sku",
          form.sku
        );
      }

      if (form.stock !== "") {
        formData.append(
          "stock",
          form.stock
        );
      }

      // =================================================
      // Categories
      // =================================================

      formData.append(
        "type",
        form.type
      );

      formData.append(
        "collection",
        form.collection
      );

      if (form.gemstone) {
        formData.append(
          "gemstone",
          form.gemstone
        );
      }

      // =================================================
      // Featured
      // =================================================

      form.featured.forEach(
        (value) => {
          formData.append(
            "featured[]",
            value
          );
        }
      );

      // =================================================
      // Styles
      // =================================================

      form.styles.forEach(
        (value) => {
          formData.append(
            "styles[]",
            value
          );
        }
      );

      // =================================================
      // Jewellery Details
      // =================================================

      formData.append(
        "metal",
        form.metal
      );

      formData.append(
        "metalColor",
        form.metalColor
      );

      formData.append(
        "purity",
        form.purity
      );

      formData.append(
        "weight",
        form.weight
      );

      formData.append(
        "dimensions",
        form.dimensions
      );

      // =================================================
      // Product Details
      // =================================================

      formData.append(
        "occasion",
        form.occasion
      );

      formData.append(
        "certificate",
        form.certificate
      );

      formData.append(
        "careInstructions",
        form.careInstructions
      );

      formData.append(
        "shippingInfo",
        form.shippingInfo
      );

      formData.append(
        "returnPolicy",
        form.returnPolicy
      );

      formData.append(
        "warranty",
        form.warranty
      );

      // =================================================
      // Status
      // =================================================

      formData.append(
        "active",
        form.active
      );

      // =================================================
      // Images
      // =================================================

      images.forEach((file) => {
        formData.append(
          "images",
          file
        );
      });

      // =================================================
      // API
      // =================================================

      await api.post(
        "/products",
        formData
      );

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (err) {
      console.error(
        "Create Product Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-product-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-header">

        <div className="page-header-content">

          <div className="page-eyebrow">
            PASSIONE GIOIELLI
          </div>

          <h1>
            Add Product
          </h1>

          <p>
            Create a new jewellery
            product.
          </p>

        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() =>
            router.push(
              "/admin/products"
            )
          }
        >
          <span className="back-arrow">
            ←
          </span>

          Back to Products
        </button>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="error-box">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>

        </div>
      )}


      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="product-form"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              01
            </div>

            <div>
              <h2>
                Basic Information
              </h2>

              <p>
                Enter the main
                information about this
                product.
              </p>
            </div>

          </div>


          <div className="form-grid">

            <div className="field full">

              <label>
                Product Name
                <span>*</span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Product name"
              />

            </div>


            <div className="field full">

              <label>
                Short Description
              </label>

              <input
                name="shortDescription"
                value={
                  form.shortDescription
                }
                onChange={
                  handleChange
                }
                placeholder="Short product description"
              />

            </div>


            <div className="field full">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                placeholder="Detailed product description"
                rows={5}
              />

            </div>

          </div>

        </section>


        {/* =================================================
            PRICING & INVENTORY
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              02
            </div>

            <div>
              <h2>
                Pricing & Inventory
              </h2>

              <p>
                Set pricing and
                available stock.
              </p>
            </div>

          </div>


          <div className="form-grid">

            <div className="field">

              <label>
                Price
                <span>*</span>
              </label>

              <div className="input-prefix">

                <span>
                  ₹
                </span>

                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={
                    handleChange
                  }
                  placeholder="1200"
                />

              </div>

            </div>


            <div className="field">

              <label>
                Sale Price
              </label>

              <div className="input-prefix">

                <span>
                  ₹
                </span>

                <input
                  name="salePrice"
                  type="number"
                  min="0"
                  value={
                    form.salePrice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1097"
                />

              </div>

            </div>


            <div className="field">

              <label>
                SKU
              </label>

              <input
                name="sku"
                value={form.sku}
                onChange={
                  handleChange
                }
                placeholder="SKU-001"
              />

            </div>


            <div className="field">

              <label>
                Stock
              </label>

              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={
                  handleChange
                }
                placeholder="10"
              />

            </div>

          </div>

        </section>


        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              03
            </div>

            <div>

              <h2>
                Categories
              </h2>

              <p>
                Categories are loaded
                directly from the
                backend.
              </p>

            </div>

          </div>


          {categoryLoading ? (

            <div className="category-loading">

              <div className="loading-spinner" />

              <span>
                Loading categories...
              </span>

            </div>

          ) : (

            <div className="form-grid">

              <div className="field">

                <label>
                  Type
                  <span>*</span>
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select Type
                  </option>

                  {types.map(
                    (category) => (
                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div className="field">

                <label>
                  Collection
                  <span>*</span>
                </label>

                <select
                  name="collection"
                  value={
                    form.collection
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select Collection
                  </option>

                  {collections.map(
                    (category) => (
                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div className="field">

                <label>
                  Gemstone
                </label>

                <select
                  name="gemstone"
                  value={
                    form.gemstone
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    No Gemstone
                  </option>

                  {gemstones.map(
                    (category) => (
                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

          )}

        </section>


        {/* =================================================
            FEATURED
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              04
            </div>

            <div>

              <h2>
                Featured
              </h2>

              <p>
                Select where this
                product should appear.
              </p>

            </div>

          </div>


          <div className="checkbox-grid">

            {FEATURED_OPTIONS.map(
              (option) => {

                const checked =
                  form.featured.includes(
                    option.value
                  );

                return (
                  <label
                    key={
                      option.value
                    }
                    className={`checkbox-card ${
                      checked
                        ? "checked"
                        : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={
                        checked
                      }
                      onChange={() =>
                        toggleArrayValue(
                          "featured",
                          option.value
                        )
                      }
                    />

                    <span className="custom-checkbox">
                      {checked
                        ? "✓"
                        : ""}
                    </span>

                    <span className="checkbox-label">
                      {option.label}
                    </span>

                  </label>
                );
              }
            )}

          </div>

        </section>


        {/* =================================================
            STYLES
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              05
            </div>

            <div>

              <h2>
                Styles
              </h2>

              <p>
                Select the applicable
                product styles.
              </p>

            </div>

          </div>


          <div className="checkbox-grid">

            {STYLE_OPTIONS.map(
              (option) => {

                const checked =
                  form.styles.includes(
                    option.value
                  );

                return (
                  <label
                    key={
                      option.value
                    }
                    className={`checkbox-card ${
                      checked
                        ? "checked"
                        : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={
                        checked
                      }
                      onChange={() =>
                        toggleArrayValue(
                          "styles",
                          option.value
                        )
                      }
                    />

                    <span className="custom-checkbox">
                      {checked
                        ? "✓"
                        : ""}
                    </span>

                    <span className="checkbox-label">
                      {option.label}
                    </span>

                  </label>
                );
              }
            )}

          </div>

        </section>


        {/* =================================================
            JEWELLERY DETAILS
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              06
            </div>

            <div>

              <h2>
                Jewellery Details
              </h2>

              <p>
                Add material and
                dimensional information.
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="field">

              <label>
                Metal
              </label>

              <input
                name="metal"
                value={form.metal}
                onChange={
                  handleChange
                }
                placeholder="Silver"
              />

            </div>


            <div className="field">

              <label>
                Metal Color
              </label>

              <input
                name="metalColor"
                value={
                  form.metalColor
                }
                onChange={
                  handleChange
                }
                placeholder="White"
              />

            </div>


            <div className="field">

              <label>
                Purity
              </label>

              <input
                name="purity"
                value={form.purity}
                onChange={
                  handleChange
                }
                placeholder="14K"
              />

            </div>


            <div className="field">

              <label>
                Weight
              </label>

              <input
                name="weight"
                value={form.weight}
                onChange={
                  handleChange
                }
                placeholder="12"
              />

            </div>


            <div className="field">

              <label>
                Dimensions
              </label>

              <input
                name="dimensions"
                value={
                  form.dimensions
                }
                onChange={
                  handleChange
                }
                placeholder="20*14"
              />

            </div>


            <div className="field">

              <label>
                Occasion
              </label>

              <input
                name="occasion"
                value={
                  form.occasion
                }
                onChange={
                  handleChange
                }
                placeholder="Occasion"
              />

            </div>

          </div>

        </section>


        {/* =================================================
            ADDITIONAL DETAILS
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              07
            </div>

            <div>

              <h2>
                Additional Details
              </h2>

              <p>
                Add certificate,
                warranty and policy
                information.
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="field">

              <label>
                Certificate
              </label>

              <input
                name="certificate"
                value={
                  form.certificate
                }
                onChange={
                  handleChange
                }
                placeholder="Certificate information"
              />

            </div>


            <div className="field">

              <label>
                Warranty
              </label>

              <input
                name="warranty"
                value={
                  form.warranty
                }
                onChange={
                  handleChange
                }
                placeholder="Warranty information"
              />

            </div>


            <div className="field full">

              <label>
                Care Instructions
              </label>

              <textarea
                name="careInstructions"
                value={
                  form.careInstructions
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Care instructions"
              />

            </div>


            <div className="field full">

              <label>
                Shipping Info
              </label>

              <textarea
                name="shippingInfo"
                value={
                  form.shippingInfo
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Shipping information"
              />

            </div>


            <div className="field full">

              <label>
                Return Policy
              </label>

              <textarea
                name="returnPolicy"
                value={
                  form.returnPolicy
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Return policy"
              />

            </div>

          </div>

        </section>


        {/* =================================================
            IMAGES
        ================================================= */}

        <section className="form-section">

          <div className="section-heading">

            <div className="section-number">
              08
            </div>

            <div>

              <h2>
                Product Images
              </h2>

              <p>
                Upload up to 10 product
                images.
              </p>

            </div>

          </div>


          <div className="upload-box">

            <input
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImages
              }
            />

            <label htmlFor="product-images">

              <div className="upload-icon">
                +
              </div>

              <strong>
                Choose Product Images
              </strong>

              <span>
                PNG, JPG, JPEG — Maximum
                10 images
              </span>

            </label>

          </div>


          {images.length > 0 && (

            <div className="image-grid">

              {images.map(
                (file, index) => (
                  <div
                    className="image-preview"
                    key={`${file.name}-${index}`}
                  >

                    <img
                      src={URL.createObjectURL(
                        file
                      )}
                      alt={`Product preview ${
                        index + 1
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(
                          index
                        )
                      }
                      aria-label={`Remove image ${
                        index + 1
                      }`}
                    >
                      ×
                    </button>

                    {index === 0 && (
                      <span className="primary-badge">
                        Primary
                      </span>
                    )}

                  </div>
                )
              )}

            </div>

          )}

        </section>


        {/* =================================================
            STATUS
        ================================================= */}

        <section className="form-section status-section">

          <div className="status-content">

            <div className="status-text">

              <strong>
                Product Status
              </strong>

              <span>
                {form.active
                  ? "This product is visible and active."
                  : "This product is hidden and inactive."}
              </span>

            </div>


            {/* ==============================
                CUSTOM ON / OFF SWITCH
            ============================== */}

            <button
              type="button"
              role="switch"
              aria-checked={
                form.active
              }
              className={`status-toggle ${
                form.active
                  ? "status-toggle-on"
                  : "status-toggle-off"
              }`}
              onClick={
                toggleActive
              }
            >

              <span className="toggle-track">

                <span className="toggle-circle" />

              </span>

              <span className="toggle-text">
                {form.active
                  ? "ON"
                  : "OFF"}
              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              router.push(
                "/admin/products"
              )
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="button-spinner" />
                Creating Product...
              </>
            ) : (
              "Create Product"
            )}

          </button>

        </div>

      </form>


      {/* =================================================
          CUSTOM CSS
      ================================================= */}

      <style jsx>{`

        /* =================================================
           PAGE
        ================================================= */

        .new-product-page {
          width: 100%;
          max-width: 1200px;

          margin: 0 auto;

          padding: 30px 32px 50px;

          box-sizing: border-box;

          color: #171717;

          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }


        /* =================================================
           HEADER
        ================================================= */

        .page-header {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 25px;

          margin-bottom: 28px;
        }


        .page-header-content {
          min-width: 0;
        }


        .page-eyebrow {
          margin-bottom: 8px;

          color: #9b8d68;

          font-size: 9px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.22em;
        }


        .page-header h1 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 36px;

          line-height: 1.1;

          font-weight: 400;

          letter-spacing: -0.02em;
        }


        .page-header p {
          margin: 9px 0 0;

          color: #777;

          font-size: 12px;

          line-height: 1.5;
        }


        .back-btn {
          height: 42px;

          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 0 15px;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #444;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          white-space: nowrap;

          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }


        .back-btn:hover {
          color: #1b807f;

          border-color: #1b807f;

          background: #fbfdfc;
        }


        .back-arrow {
          font-size: 16px;

          line-height: 1;
        }


        /* =================================================
           ERROR
        ================================================= */

        .error-box {
          width: 100%;

          min-height: 45px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 20px;

          padding: 10px 13px;

          box-sizing: border-box;

          background: #fff4f3;

          border: 1px solid #efcfcb;

          color: #a32920;

          font-size: 12px;
        }


        .error-box button {
          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: none;

          background: transparent;

          color: #a32920;

          font-size: 18px;

          cursor: pointer;
        }


        /* =================================================
           FORM
        ================================================= */

        .product-form {
          display: flex;

          flex-direction: column;

          gap: 18px;
        }


        /* =================================================
           SECTION
        ================================================= */

        .form-section {
          width: 100%;

          background: #fff;

          border: 1px solid #e3dfd5;

          padding: 27px;

          box-sizing: border-box;
        }


        .section-heading {
          display: flex;

          align-items: flex-start;

          gap: 13px;

          margin-bottom: 24px;

          padding-bottom: 17px;

          border-bottom: 1px solid #eeeae2;
        }


        .section-number {
          width: 30px;
          height: 30px;

          min-width: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          background: #f5f1e8;

          color: #9b8d68;

          font-family:
            Georgia,
            serif;

          font-size: 10px;

          box-sizing: border-box;
        }


        .section-heading h2 {
          margin: 0 0 5px;

          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 19px;

          line-height: 1.2;

          font-weight: 500;
        }


        .section-heading p {
          margin: 0;

          color: #888;

          font-size: 11px;

          line-height: 1.5;
        }


        /* =================================================
           GRID
        ================================================= */

        .form-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }


        .field {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .field.full {
          grid-column: 1 / -1;
        }


        .field label {
          color: #444;

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.02em;
        }


        .field label span {
          margin-left: 3px;

          color: #b42318;
        }


        /* =================================================
           INPUTS
        ================================================= */

        .field input,
        .field select,
        .field textarea {
          width: 100%;

          box-sizing: border-box;

          border: 1px solid #d8d4ca;

          outline: none;

          background: #fff;

          color: #222;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 12px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }


        .field input,
        .field select {
          height: 44px;

          padding: 0 12px;
        }


        .field textarea {
          min-height: 105px;

          padding: 12px;

          resize: vertical;

          line-height: 1.6;
        }


        .field input::placeholder,
        .field textarea::placeholder {
          color: #aaa;
        }


        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #1b807f;

          box-shadow:
            0 0 0 2px
            rgba(
              27,
              128,
              127,
              0.06
            );
        }


        .field select {
          cursor: pointer;

          appearance: auto;
        }


        /* =================================================
           PRICE PREFIX
        ================================================= */

        .input-prefix {
          position: relative;

          width: 100%;
        }


        .input-prefix > span {
          position: absolute;

          left: 12px;

          top: 50%;

          transform:
            translateY(-50%);

          color: #888;

          font-size: 12px;

          pointer-events: none;

          z-index: 2;
        }


        .input-prefix input {
          padding-left: 27px;
        }


        /* =================================================
           CATEGORY LOADING
        ================================================= */

        .category-loading {
          min-height: 120px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 10px;

          background: #faf9f6;

          border: 1px solid #eeeae2;

          color: #777;

          font-size: 11px;
        }


        .loading-spinner {
          width: 22px;
          height: 22px;

          border: 2px solid #e5e1d8;

          border-top-color: #1b807f;

          border-radius: 50%;

          animation:
            spin 0.8s
            linear
            infinite;
        }


        @keyframes spin {
          to {
            transform:
              rotate(360deg);
          }
        }


        /* =================================================
           CHECKBOX CARDS
        ================================================= */

        .checkbox-grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 10px;
        }


        .checkbox-card {
          position: relative;

          min-height: 50px;

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 0 13px;

          border: 1px solid #ded9cf;

          background: #fff;

          cursor: pointer;

          box-sizing: border-box;

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }


        .checkbox-card:hover {
          border-color: #1b807f;

          background: #fbfdfc;
        }


        .checkbox-card.checked {
          border-color: #1b807f;

          background: #f1f9f7;

          color: #17665f;
        }


        .checkbox-card input {
          position: absolute;

          width: 1px;
          height: 1px;

          opacity: 0;

          pointer-events: none;
        }


        .custom-checkbox {
          width: 18px;
          height: 18px;

          min-width: 18px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid #c9c4b9;

          background: #fff;

          color: #fff;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }


        .checkbox-card.checked
          .custom-checkbox {
          background: #1b807f;

          border-color: #1b807f;
        }


        .checkbox-label {
          font-size: 11px;

          font-weight: 500;

          letter-spacing: 0.02em;
        }


        /* =================================================
           IMAGE UPLOAD
        ================================================= */

        .upload-box {
          position: relative;

          min-height: 145px;

          display: flex;

          align-items: center;
          justify-content: center;

          background: #faf9f6;

          border: 1px dashed #cfc9bb;

          text-align: center;

          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }


        .upload-box:hover {
          border-color: #1b807f;

          background: #fbfdfc;
        }


        .upload-box input {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          opacity: 0;

          cursor: pointer;
        }


        .upload-box label {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          pointer-events: none;
        }


        .upload-icon {
          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 3px;

          border: 1px solid #ddd7ca;

          color: #9b8d68;

          font-family:
            Georgia,
            serif;

          font-size: 21px;
        }


        .upload-box strong {
          color: #333;

          font-size: 12px;

          font-weight: 600;
        }


        .upload-box span {
          color: #999;

          font-size: 10px;
        }


        /* =================================================
           IMAGE GRID
        ================================================= */

        .image-grid {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            );

          gap: 12px;

          margin-top: 18px;
        }


        .image-preview {
          position: relative;

          aspect-ratio: 1;

          overflow: hidden;

          background: #f1f0ec;

          border: 1px solid #e5e0d5;
        }


        .image-preview img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }


        .image-preview button {
          position: absolute;

          top: 7px;
          right: 7px;

          width: 27px;
          height: 27px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: none;

          border-radius: 50%;

          background:
            rgba(
              0,
              0,
              0,
              0.68
            );

          color: #fff;

          font-size: 18px;

          line-height: 1;

          cursor: pointer;

          transition:
            background 0.2s ease;
        }


        .image-preview button:hover {
          background:
            rgba(
              180,
              35,
              24,
              0.9
            );
        }


        .primary-badge {
          position: absolute;

          left: 7px;
          bottom: 7px;

          padding: 5px 7px;

          background: #1b807f;

          color: #fff;

          font-family:
            Arial,
            sans-serif;

          font-size: 8px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;
        }


        /* =================================================
           STATUS
        ================================================= */

        .status-section {
          padding: 21px 27px;
        }


        .status-content {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 25px;
        }


        .status-text {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }


        .status-text strong {
          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;

          font-weight: 500;
        }


        .status-text span {
          color: #888;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          line-height: 1.5;
        }


        /* =================================================
           CUSTOM ON / OFF SWITCH
        ================================================= */

        .status-toggle {
          height: 40px;

          display: inline-flex;

          align-items: center;

          gap: 9px;

          padding: 0;

          border: none;

          background: transparent;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;
        }


        .toggle-track {
          position: relative;

          width: 52px;
          height: 28px;

          display: block;

          border-radius: 30px;

          box-sizing: border-box;

          transition:
            background 0.25s ease,
            border-color 0.25s ease;
        }


        .status-toggle-on
          .toggle-track {
          background: #1b807f;

          border: 1px solid #1b807f;
        }


        .status-toggle-off
          .toggle-track {
          background: #d7d4cc;

          border: 1px solid #c8c4ba;
        }


        .toggle-circle {
          position: absolute;

          top: 3px;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 1px 4px
            rgba(
              0,
              0,
              0,
              0.2
            );

          transition:
            left 0.25s ease;
        }


        .status-toggle-on
          .toggle-circle {
          left: 27px;
        }


        .status-toggle-off
          .toggle-circle {
          left: 3px;
        }


        .toggle-text {
          min-width: 24px;

          color: #555;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-align: left;
        }


        .status-toggle-on
          .toggle-text {
          color: #1b807f;
        }


        .status-toggle-off
          .toggle-text {
          color: #999;
        }


        .status-toggle:hover
          .toggle-track {
          box-shadow:
            0 0 0 3px
            rgba(
              27,
              128,
              127,
              0.07
            );
        }


        /* =================================================
           FORM ACTIONS
        ================================================= */

        .form-actions {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 10px;

          padding-top: 3px;
        }


        .cancel-btn,
        .submit-btn {
          min-width: 130px;

          height: 46px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          padding: 0 20px;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          font-weight: 500;

          letter-spacing: 0.04em;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }


        .cancel-btn {
          border: 1px solid #d8d4ca;

          background: #fff;

          color: #444;
        }


        .cancel-btn:hover {
          border-color: #999;

          background: #faf9f6;
        }


        .submit-btn {
          border: 1px solid #1b807f;

          background: #1b807f;

          color: #fff;
        }


        .submit-btn:hover:not(:disabled) {
          background: #176d6c;

          border-color: #176d6c;
        }


        .submit-btn:disabled {
          opacity: 0.55;

          cursor: not-allowed;
        }


        .button-spinner {
          width: 13px;
          height: 13px;

          border:
            2px solid
            rgba(
              255,
              255,
              255,
              0.35
            );

          border-top-color: #fff;

          border-radius: 50%;

          animation:
            spin
            0.7s
            linear
            infinite;
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 900px) {

          .new-product-page {
            padding:
              25px
              22px
              45px;
          }


          .checkbox-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }


          .image-grid {
            grid-template-columns:
              repeat(
                4,
                minmax(0, 1fr)
              );
          }

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 650px) {

          .new-product-page {
            padding:
              20px
              14px
              40px;
          }


          .page-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 16px;
          }


          .page-header h1 {
            font-size: 31px;
          }


          .back-btn {
            width: 100%;

            justify-content: center;
          }


          .form-section {
            padding: 20px 17px;
          }


          .section-heading {
            margin-bottom: 20px;
          }


          .form-grid {
            grid-template-columns: 1fr;

            gap: 16px;
          }


          .field.full {
            grid-column: auto;
          }


          .checkbox-grid {
            grid-template-columns: 1fr;
          }


          .image-grid {
            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );
          }


          .status-section {
            padding:
              18px 17px;
          }


          .status-content {
            align-items: flex-start;

            flex-direction: column;

            gap: 15px;
          }


          .form-actions {
            flex-direction: column-reverse;

            gap: 9px;
          }


          .cancel-btn,
          .submit-btn {
            width: 100%;
          }

        }


        /* =================================================
           SMALL MOBILE
        ================================================= */

        @media (max-width: 430px) {

          .new-product-page {
            padding:
              18px
              10px
              35px;
          }


          .page-header h1 {
            font-size: 28px;
          }


          .form-section {
            padding: 17px 14px;
          }


          .section-number {
            width: 27px;
            height: 27px;

            min-width: 27px;
          }


          .section-heading h2 {
            font-size: 17px;
          }


          .image-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }


          .status-toggle {
            width: 100%;
          }

        }

      `}</style>
    </div>
  );
}