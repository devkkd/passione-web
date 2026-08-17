"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

const EMPTY_FORM = {
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
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [types, setTypes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [gemstones, setGemstones] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);

  /*
   * Existing images already stored on backend
   */
  const [existingImages, setExistingImages] = useState([]);

  /*
   * Newly selected files
   */
  const [newImages, setNewImages] = useState([]);

  /*
   * Preview URLs for newly selected files
   */
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  /* =====================================================
     LOAD PRODUCT + CATEGORIES
  ===================================================== */

  useEffect(() => {
    if (!productId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setCategoryLoading(true);
        setError("");

        const [productRes, typeRes, collectionRes, gemstoneRes] =
          await Promise.all([
            api.get(`/products/admin/${productId}`),

            api.get("/categories/type/type"),

            api.get("/categories/type/collection"),

            api.get("/categories/type/gemstone"),
          ]);

        /* =================================================
           CATEGORIES
        ================================================= */

        setTypes(typeRes.data?.categories || []);

        setCollections(
          collectionRes.data?.categories || []
        );

        setGemstones(
          gemstoneRes.data?.categories || []
        );

        /* =================================================
           PRODUCT
        ================================================= */

        const product =
          productRes.data?.product ||
          productRes.data?.data ||
          productRes.data;

        if (!product) {
          throw new Error("Product not found.");
        }

        /* =================================================
           CATEGORY IDS
        ================================================= */

        const typeId =
          product.type?._id ||
          product.type ||
          "";

        const collectionId =
          product.collection?._id ||
          product.collection ||
          "";

        const gemstoneId =
          product.gemstone?._id ||
          product.gemstone ||
          "";

        /* =================================================
           FEATURED
        ================================================= */

        const featured = Array.isArray(
          product.featured
        )
          ? product.featured
              .map((item) =>
                typeof item === "string"
                  ? item
                  : item?.value || item?.slug || item?.name
              )
              .filter(Boolean)
          : [];

        /* =================================================
           STYLES
        ================================================= */

        const styles = Array.isArray(
          product.styles
        )
          ? product.styles
              .map((item) =>
                typeof item === "string"
                  ? item
                  : item?.value || item?.slug || item?.name
              )
              .filter(Boolean)
          : [];

        /* =================================================
           SET FORM
        ================================================= */

        setForm({
          name: product.name || "",

          shortDescription:
            product.shortDescription || "",

          description:
            product.description || "",

          price:
            product.price !== undefined &&
            product.price !== null
              ? String(product.price)
              : "",

          salePrice:
            product.salePrice !== undefined &&
            product.salePrice !== null
              ? String(product.salePrice)
              : "",

          sku: product.sku || "",

          stock:
            product.stock !== undefined &&
            product.stock !== null
              ? String(product.stock)
              : "",

          type: typeId
            ? String(typeId)
            : "",

          collection: collectionId
            ? String(collectionId)
            : "",

          gemstone: gemstoneId
            ? String(gemstoneId)
            : "",

          featured,

          styles,

          metal: product.metal || "",

          metalColor:
            product.metalColor || "",

          purity: product.purity || "",

          weight:
            product.weight !== undefined &&
            product.weight !== null
              ? String(product.weight)
              : "",

          dimensions:
            product.dimensions || "",

          occasion:
            product.occasion || "",

          certificate:
            product.certificate || "",

          careInstructions:
            product.careInstructions || "",

          shippingInfo:
            product.shippingInfo || "",

          returnPolicy:
            product.returnPolicy || "",

          warranty:
            product.warranty || "",

          active:
            product.active !== undefined
              ? Boolean(product.active)
              : true,
        });

        /* =================================================
           EXISTING IMAGES
        ================================================= */

        const backendImages =
          Array.isArray(product.images)
            ? product.images
            : [];

        setExistingImages(backendImages);
      } catch (err) {
        console.error(
          "Load Edit Product Error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load product."
        );
      } finally {
        setLoading(false);
        setCategoryLoading(false);
      }
    };

    loadData();
  }, [productId]);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

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

  /* =====================================================
     FEATURED / STYLES
  ===================================================== */

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
              (item) =>
                item !== value
            )
          : [
              ...current,
              value,
            ],
      };
    });
  };

  /* =====================================================
     NEW IMAGES
  ===================================================== */

  const handleImages = (e) => {
    const selectedFiles =
      Array.from(
        e.target.files || []
      );

    if (!selectedFiles.length) {
      return;
    }

    setNewImages((prev) => {
      const combined = [
        ...prev,
        ...selectedFiles,
      ];

      return combined.slice(
        0,
        10
      );
    });

    /*
     * Reset input so same file can be
     * selected again if required.
     */
    e.target.value = "";
  };

  /* =====================================================
     PREVIEW NEW IMAGES
  ===================================================== */

  useEffect(() => {
    const urls = newImages.map(
      (file) =>
        URL.createObjectURL(file)
    );

    setNewImagePreviews(urls);

    return () => {
      urls.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [newImages]);

  /* =====================================================
     REMOVE NEW IMAGE
  ===================================================== */

  const removeNewImage = (
    index
  ) => {
    setNewImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    return (
      image.url ||
      image.secure_url ||
      image.path ||
      ""
    );
  };

  /* =====================================================
     ACTIVE TOGGLE
  ===================================================== */

  const toggleActive = () => {
    setForm((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Product name is required.";
    }

    if (!form.price) {
      return "Product price is required.";
    }

    if (!form.type) {
      return "Product type is required.";
    }

    if (!form.collection) {
      return "Product collection is required.";
    }

    return "";
  };

  /* =====================================================
     UPDATE PRODUCT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      /* =================================================
         BASIC
      ================================================= */

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

      /* =================================================
         PRICING
      ================================================= */

      formData.append(
        "price",
        form.price
      );

      if (
        form.salePrice !== ""
      ) {
        formData.append(
          "salePrice",
          form.salePrice
        );
      }

      /* =================================================
         INVENTORY
      ================================================= */

      if (form.sku) {
        formData.append(
          "sku",
          form.sku
        );
      }

      if (
        form.stock !== ""
      ) {
        formData.append(
          "stock",
          form.stock
        );
      }

      /* =================================================
         CATEGORIES
      ================================================= */

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

      /* =================================================
         FEATURED
      ================================================= */

      form.featured.forEach(
        (value) => {
          formData.append(
            "featured[]",
            value
          );
        }
      );

      /* =================================================
         STYLES
      ================================================= */

      form.styles.forEach(
        (value) => {
          formData.append(
            "styles[]",
            value
          );
        }
      );

      /* =================================================
         JEWELLERY DETAILS
      ================================================= */

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

      /* =================================================
         ADDITIONAL DETAILS
      ================================================= */

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

      /* =================================================
         STATUS
      ================================================= */

      formData.append(
        "active",
        String(form.active)
      );

      /* =================================================
         NEW IMAGES
      ================================================= */

      newImages.forEach(
        (file) => {
          formData.append(
            "images",
            file
          );
        }
      );

      /* =================================================
         UPDATE API
      ================================================= */

      await api.put(
        `/products/${productId}`,
        formData
      );

      setSuccess(
        "Product updated successfully."
      );

      /*
       * Give user a moment to see success.
       */
      setTimeout(() => {
        router.push(
          "/admin/products"
        );

        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "Update Product Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     EXISTING IMAGE COUNT
  ===================================================== */

  const totalImageCount =
    existingImages.length +
    newImages.length;

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="edit-loading-page">
        <div className="edit-loading-spinner" />

        <h2>
          Loading Product
        </h2>

        <p>
          Please wait while we
          load the product details.
        </p>

        <style jsx>{`
          .edit-loading-page {
            min-height: 70vh;

            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;

            text-align: center;

            color: #333;
          }

          .edit-loading-spinner {
            width: 32px;
            height: 32px;

            border: 2px solid #e7e2d8;
            border-top-color: #1b807f;

            border-radius: 50%;

            animation:
              edit-spin
              0.8s
              linear
              infinite;

            margin-bottom: 18px;
          }

          .edit-loading-page h2 {
            margin: 0 0 6px;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 22px;
            font-weight: 400;
          }

          .edit-loading-page p {
            margin: 0;

            color: #888;

            font-family:
              Arial,
              sans-serif;

            font-size: 12px;
          }

          @keyframes edit-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <div className="edit-product-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="edit-page-header">

        <div className="edit-header-content">

          <p className="edit-eyebrow">
            PASSIONE GIOIELLI
          </p>

          <h1>
            Edit Product
          </h1>

          <p className="edit-description">
            Update the details,
            pricing and information
            of your jewellery product.
          </p>

        </div>

        <button
          type="button"
          className="edit-back-button"
          onClick={() =>
            router.push(
              "/admin/products"
            )
          }
        >
          <span>←</span>
          Back to Products
        </button>

      </header>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="edit-message edit-success">
          <span>
            {success}
          </span>
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="edit-message edit-error">

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
        className="edit-product-form"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                01
              </p>

              <h2>
                Basic Information
              </h2>
            </div>

            <p>
              Main information about
              your jewellery product.
            </p>

          </div>

          <div className="edit-form-grid">

            <div className="edit-field edit-full">

              <label>
                Product Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
              />

            </div>

            <div className="edit-field edit-full">

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

            <div className="edit-field edit-full">

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
                rows={5}
                placeholder="Detailed product description"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            PRICING
        ================================================= */}

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                02
              </p>

              <h2>
                Pricing & Inventory
              </h2>
            </div>

            <p>
              Product price and
              inventory information.
            </p>

          </div>

          <div className="edit-form-grid">

            <div className="edit-field">

              <label>
                Price *
              </label>

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="1200"
              />

            </div>

            <div className="edit-field">

              <label>
                Sale Price
              </label>

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

            <div className="edit-field">

              <label>
                SKU
              </label>

              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="SKU-001"
              />

            </div>

            <div className="edit-field">

              <label>
                Stock
              </label>

              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="10"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                03
              </p>

              <h2>
                Categories
              </h2>
            </div>

            <p>
              Product category
              classification.
            </p>

          </div>

          {categoryLoading ? (

            <div className="edit-category-loading">
              Loading categories...
            </div>

          ) : (

            <div className="edit-form-grid">

              <div className="edit-field">

                <label>
                  Type *
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
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
                        {
                          category.name
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              <div className="edit-field">

                <label>
                  Collection *
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
                        {
                          category.name
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              <div className="edit-field">

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
                        {
                          category.name
                        }
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

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                04
              </p>

              <h2>
                Featured
              </h2>
            </div>

            <p>
              Choose where this product
              should appear.
            </p>

          </div>

          <div className="edit-option-grid">

            {FEATURED_OPTIONS.map(
              (option) => {

                const checked =
                  form.featured.includes(
                    option.value
                  );

                return (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    className={
                      checked
                        ? "edit-option edit-option-active"
                        : "edit-option"
                    }
                    onClick={() =>
                      toggleArrayValue(
                        "featured",
                        option.value
                      )
                    }
                  >

                    <span
                      className="edit-option-dot"
                    />

                    <span>
                      {
                        option.label
                      }
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* =================================================
            STYLES
        ================================================= */}

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                05
              </p>

              <h2>
                Styles
              </h2>
            </div>

            <p>
              Select applicable
              jewellery styles.
            </p>

          </div>

          <div className="edit-option-grid">

            {STYLE_OPTIONS.map(
              (option) => {

                const checked =
                  form.styles.includes(
                    option.value
                  );

                return (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    className={
                      checked
                        ? "edit-option edit-option-active"
                        : "edit-option"
                    }
                    onClick={() =>
                      toggleArrayValue(
                        "styles",
                        option.value
                      )
                    }
                  >

                    <span
                      className="edit-option-dot"
                    />

                    <span>
                      {
                        option.label
                      }
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* =================================================
            JEWELLERY DETAILS
        ================================================= */}

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                06
              </p>

              <h2>
                Jewellery Details
              </h2>
            </div>

            <p>
              Material and physical
              product information.
            </p>

          </div>

          <div className="edit-form-grid">

            <div className="edit-field">

              <label>
                Metal
              </label>

              <input
                name="metal"
                value={form.metal}
                onChange={handleChange}
                placeholder="Silver"
              />

            </div>

            <div className="edit-field">

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

            <div className="edit-field">

              <label>
                Purity
              </label>

              <input
                name="purity"
                value={form.purity}
                onChange={handleChange}
                placeholder="14K"
              />

            </div>

            <div className="edit-field">

              <label>
                Weight
              </label>

              <input
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="12"
              />

            </div>

            <div className="edit-field">

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

            <div className="edit-field">

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

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                07
              </p>

              <h2>
                Additional Details
              </h2>
            </div>

            <p>
              Extra product information
              for customers.
            </p>

          </div>

          <div className="edit-form-grid">

            <div className="edit-field">

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

            <div className="edit-field">

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

            <div className="edit-field edit-full">

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

            <div className="edit-field edit-full">

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

            <div className="edit-field edit-full">

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

        <section className="edit-form-section">

          <div className="edit-section-heading">

            <div>
              <p className="edit-section-number">
                08
              </p>

              <h2>
                Product Images
              </h2>
            </div>

            <p>
              Existing images and
              additional uploads.
            </p>

          </div>

          {/* EXISTING IMAGES */}

          {existingImages.length >
            0 && (

            <div className="existing-images">

              <div className="image-subheading">
                Existing Images
              </div>

              <div className="edit-image-grid">

                {existingImages.map(
                  (image, index) => {

                    const imageUrl =
                      getImageUrl(
                        image
                      );

                    if (!imageUrl) {
                      return null;
                    }

                    return (
                      <div
                        className="edit-image-card"
                        key={
                          image._id ||
                          image.public_id ||
                          `${imageUrl}-${index}`
                        }
                      >

                        <img
                          src={imageUrl}
                          alt={`Product ${
                            index + 1
                          }`}
                        />

                        {(
                          image.isPrimary ||
                          index === 0
                        ) && (
                          <span className="primary-badge">
                            Primary
                          </span>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>
          )}

          {/* UPLOAD */}

          <div className="edit-upload-box">

            <input
              id="edit-product-images"
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImages
              }
            />

            <label
              htmlFor="edit-product-images"
            >

              <span className="upload-plus">
                +
              </span>

              <strong>
                Add New Images
              </strong>

              <span>
                PNG, JPG, JPEG
                {" — "}
                Maximum 10 images
              </span>

            </label>

          </div>

          {/* NEW IMAGE PREVIEWS */}

          {newImages.length >
            0 && (

            <div className="new-images-area">

              <div className="image-subheading">
                New Images
              </div>

              <div className="edit-image-grid">

                {newImages.map(
                  (file, index) => (

                    <div
                      className="edit-image-card"
                      key={`${file.name}-${index}`}
                    >

                      <img
                        src={
                          newImagePreviews[
                            index
                          ]
                        }
                        alt={`New image ${
                          index + 1
                        }`}
                      />

                      <button
                        type="button"
                        className="remove-image-button"
                        onClick={() =>
                          removeNewImage(
                            index
                          )
                        }
                      >
                        ×
                      </button>

                      {index ===
                        0 &&
                        existingImages.length ===
                          0 && (
                          <span className="primary-badge">
                            Primary
                          </span>
                        )}

                    </div>

                  )
                )}

              </div>

            </div>
          )}

          <div className="image-count">
            {totalImageCount}
            {" "}
            image
            {totalImageCount ===
            1
              ? ""
              : "s"}
            {" "}
            currently available
          </div>

        </section>

        {/* =================================================
            STATUS
        ================================================= */}

        <section className="edit-status-section">

          <div className="status-text">

            <p>
              PRODUCT STATUS
            </p>

            <h3>
              Product Visibility
            </h3>

            <span>
              Control whether this
              product is visible
              on the storefront.
            </span>

          </div>

          <button
            type="button"
            className={
              form.active
                ? "status-switch status-on"
                : "status-switch"
            }
            onClick={
              toggleActive
            }
            aria-pressed={
              form.active
            }
          >

            <span className="status-switch-track">

              <span className="status-switch-knob" />

            </span>

            <span className="status-switch-label">
              {form.active
                ? "ON"
                : "OFF"}
            </span>

          </button>

        </section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="edit-form-actions">

          <button
            type="button"
            className="edit-cancel-button"
            onClick={() =>
              router.push(
                "/admin/products"
              )
            }
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="edit-save-button"
            disabled={saving}
          >
            {saving
              ? "Saving Changes..."
              : "Save Changes"}
          </button>

        </div>

      </form>

      {/* =================================================
          CUSTOM CSS
      ================================================= */}

      <style jsx>{`
        .edit-product-page {
          width: 100%;
          max-width: 1200px;

          margin: 0 auto;
          padding: 0 0 45px;

          color: #171717;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          box-sizing: border-box;
        }

        .edit-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 30px;

          margin-bottom: 28px;
        }

        .edit-header-content {
          min-width: 0;
        }

        .edit-eyebrow {
          margin: 0 0 9px;

          color: #9b8d68;

          font-size: 10px;
          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }

        .edit-page-header h1 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 38px;
          line-height: 1.05;

          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .edit-description {
          margin: 10px 0 0;

          color: #777;

          font-size: 13px;
          line-height: 1.5;
        }

        .edit-back-button {
          height: 43px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 17px;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #333;

          cursor: pointer;

          font-size: 12px;

          white-space: nowrap;

          transition:
            border-color 0.2s ease,
            color 0.2s ease,
            background 0.2s ease;
        }

        .edit-back-button:hover {
          border-color: #1b807f;
          color: #1b807f;
          background: #fbfdfc;
        }

        .edit-back-button span {
          font-size: 17px;
          line-height: 1;
        }

        .edit-message {
          min-height: 44px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 10px 14px;

          margin-bottom: 18px;

          box-sizing: border-box;

          font-size: 12px;
        }

        .edit-message button {
          width: 28px;
          height: 28px;

          border: none;
          background: transparent;

          color: inherit;

          cursor: pointer;

          font-size: 18px;
        }

        .edit-error {
          border: 1px solid #efcfcb;
          background: #fff4f3;
          color: #a32920;
        }

        .edit-success {
          border: 1px solid #c4e1da;
          background: #eff9f6;
          color: #17665f;
        }

        .edit-product-form {
          display: flex;
          flex-direction: column;

          gap: 18px;
        }

        .edit-form-section {
          background: #fff;

          border: 1px solid #e3ded4;

          padding: 28px;

          box-sizing: border-box;
        }

        .edit-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 25px;

          padding-bottom: 19px;

          margin-bottom: 22px;

          border-bottom: 1px solid #eeeae2;
        }

        .edit-section-heading > div {
          min-width: 0;
        }

        .edit-section-number {
          margin: 0 0 5px;

          color: #b29d70;

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 0.18em;
        }

        .edit-section-heading h2 {
          margin: 0;

          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;

          font-weight: 400;
        }

        .edit-section-heading > p {
          max-width: 330px;

          margin: 0;

          color: #888;

          font-size: 11px;

          line-height: 1.6;

          text-align: right;
        }

        .edit-form-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }

        .edit-field {
          min-width: 0;

          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .edit-full {
          grid-column: 1 / -1;
        }

        .edit-field label {
          color: #444;

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.02em;
        }

        .edit-field input,
        .edit-field select,
        .edit-field textarea {
          width: 100%;

          box-sizing: border-box;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #171717;

          outline: none;

          padding: 12px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 13px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .edit-field input,
        .edit-field select {
          height: 45px;
        }

        .edit-field textarea {
          min-height: 105px;

          resize: vertical;

          line-height: 1.6;
        }

        .edit-field input::placeholder,
        .edit-field textarea::placeholder {
          color: #aaa;
        }

        .edit-field input:focus,
        .edit-field select:focus,
        .edit-field textarea:focus {
          border-color: #1b807f;

          box-shadow:
            0 0 0 2px
            rgba(
              27,
              128,
              127,
              0.07
            );
        }

        .edit-field select {
          cursor: pointer;
        }

        .edit-category-loading {
          min-height: 100px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #faf9f6;

          color: #888;

          font-size: 12px;
        }

        .edit-option-grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 11px;
        }

        .edit-option {
          min-height: 53px;

          display: flex;
          align-items: center;

          gap: 10px;

          padding: 0 15px;

          border: 1px solid #ddd8cd;

          background: #fff;

          color: #444;

          cursor: pointer;

          text-align: left;

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.04em;

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }

        .edit-option:hover {
          border-color: #1b807f;
          color: #1b807f;
        }

        .edit-option-active {
          border-color: #1b807f;

          background: #eef8f6;

          color: #17665f;
        }

        .edit-option-dot {
          width: 8px;
          height: 8px;

          flex-shrink: 0;

          border: 1px solid #bdb7ab;

          border-radius: 50%;

          box-sizing: border-box;
        }

        .edit-option-active
          .edit-option-dot {
          background: #1b807f;

          border-color: #1b807f;

          box-shadow:
            0 0 0 3px
            rgba(
              27,
              128,
              127,
              0.12
            );
        }

        .existing-images {
          margin-bottom: 22px;
        }

        .new-images-area {
          margin-top: 22px;
        }

        .image-subheading {
          margin-bottom: 11px;

          color: #555;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.1em;

          text-transform: uppercase;
        }

        .edit-image-grid {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            );

          gap: 12px;
        }

        .edit-image-card {
          position: relative;

          aspect-ratio: 1;

          overflow: hidden;

          background: #f4f2ed;

          border: 1px solid #e5e0d6;
        }

        .edit-image-card img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .primary-badge {
          position: absolute;

          left: 7px;
          bottom: 7px;

          padding: 5px 8px;

          background: #1b807f;

          color: #fff;

          font-size: 8px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;
        }

        .remove-image-button {
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

          cursor: pointer;

          font-size: 18px;

          line-height: 1;
        }

        .remove-image-button:hover {
          background: #a32920;
        }

        .edit-upload-box {
          min-height: 125px;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px dashed #cfc9bb;

          background: #faf9f6;

          text-align: center;

          box-sizing: border-box;
        }

        .edit-upload-box input {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          opacity: 0;

          cursor: pointer;
        }

        .edit-upload-box label {
          display: flex;
          flex-direction: column;

          align-items: center;

          gap: 6px;

          pointer-events: none;
        }

        .upload-plus {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 3px;

          border: 1px solid #cfc9bb;

          border-radius: 50%;

          color: #9b8d68;

          font-size: 20px;
        }

        .edit-upload-box strong {
          color: #333;

          font-size: 12px;

          font-weight: 600;
        }

        .edit-upload-box label > span:last-child {
          color: #999;

          font-size: 10px;
        }

        .image-count {
          margin-top: 11px;

          color: #999;

          font-size: 10px;

          text-align: right;
        }

        .edit-status-section {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 25px;

          padding: 23px 28px;

          border: 1px solid #e3ded4;

          background: #fff;
        }

        .status-text p {
          margin: 0 0 5px;

          color: #9b8d68;

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 0.16em;
        }

        .status-text h3 {
          margin: 0 0 4px;

          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 17px;

          font-weight: 400;
        }

        .status-text span {
          color: #888;

          font-size: 11px;
        }

        .status-switch {
          min-width: 100px;

          height: 43px;

          display: inline-flex;
          align-items: center;

          justify-content: center;

          gap: 9px;

          padding: 0 13px;

          border: 1px solid #d8d4ca;

          background: #f4f2ee;

          color: #888;

          cursor: pointer;

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }

        .status-switch:hover {
          border-color: #1b807f;
        }

        .status-switch-track {
          width: 30px;
          height: 17px;

          position: relative;

          border-radius: 20px;

          background: #c9c5bd;

          transition:
            background 0.2s ease;
        }

        .status-switch-knob {
          position: absolute;

          top: 3px;
          left: 3px;

          width: 11px;
          height: 11px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 1px 3px
            rgba(
              0,
              0,
              0,
              0.2
            );

          transition:
            transform 0.2s ease;
        }

        .status-switch-label {
          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.08em;
        }

        .status-on {
          border-color: #b8dcd5;

          background: #eef8f6;

          color: #17665f;
        }

        .status-on
          .status-switch-track {
          background: #1b807f;
        }

        .status-on
          .status-switch-knob {
          transform:
            translateX(13px);
        }

        .edit-form-actions {
          display: flex;

          align-items: center;
          justify-content: flex-end;

          gap: 11px;

          padding-top: 3px;
        }

        .edit-cancel-button,
        .edit-save-button {
          min-height: 46px;

          padding: 0 24px;

          border: none;

          cursor: pointer;

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.05em;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            opacity 0.2s ease;
        }

        .edit-cancel-button {
          border: 1px solid #d8d4ca;

          background: #fff;

          color: #444;
        }

        .edit-cancel-button:hover {
          border-color: #999;
        }

        .edit-save-button {
          min-width: 150px;

          background: #1b807f;

          color: #fff;
        }

        .edit-save-button:hover {
          background: #176d6c;
        }

        .edit-cancel-button:disabled,
        .edit-save-button:disabled {
          opacity: 0.5;

          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .edit-product-page {
            padding-bottom: 30px;
          }

          .edit-page-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 16px;
          }

          .edit-back-button {
            width: 100%;
          }

          .edit-form-grid {
            grid-template-columns: 1fr;
          }

          .edit-full {
            grid-column: auto;
          }

          .edit-option-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }

          .edit-image-grid {
            grid-template-columns:
              repeat(
                4,
                minmax(0, 1fr)
              );
          }
        }

        @media (max-width: 600px) {
          .edit-page-header h1 {
            font-size: 32px;
          }

          .edit-form-section {
            padding: 20px 16px;
          }

          .edit-section-heading {
            align-items: flex-start;

            flex-direction: column;

            gap: 8px;

            padding-bottom: 16px;

            margin-bottom: 18px;
          }

          .edit-section-heading > p {
            max-width: none;

            text-align: left;
          }

          .edit-option-grid {
            grid-template-columns: 1fr;
          }

          .edit-image-grid {
            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );
          }

          .edit-status-section {
            align-items: flex-start;

            flex-direction: column;

            padding: 20px 16px;
          }

          .status-switch {
            width: 100%;
          }

          .edit-form-actions {
            flex-direction: column-reverse;
          }

          .edit-cancel-button,
          .edit-save-button {
            width: 100%;
          }
        }

        @media (max-width: 420px) {
          .edit-page-header h1 {
            font-size: 29px;
          }

          .edit-description {
            font-size: 12px;
          }

          .edit-image-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }
        }
      `}</style>
    </div>
  );
}