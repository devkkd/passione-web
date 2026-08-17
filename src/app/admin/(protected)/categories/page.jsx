"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Folder,
  Gem,
  Layers3,
  Check,
  CircleAlert,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

const CATEGORY_TYPES = [
  { value: "type", label: "Type" },
  { value: "collection", label: "Collection" },
  { value: "gemstone", label: "Gemstone" },
];

const ITEMS_PER_PAGE = 8;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // FILTER + PAGINATION
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    type: "type",
    active: true,
  });

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/categories");

      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Categories Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Reset to page 1 whenever the filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // OPEN CREATE
  // =====================================================

  const openCreate = (type = "type") => {
    setEditingId(null);

    setForm({
      name: "",
      type,
      active: true,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (category) => {
    setEditingId(category._id);

    setForm({
      name: category.name || "",
      type: category.type || "type",
      active: category.active ?? true,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
  };

  // =====================================================
  // SAVE CATEGORY
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/categories/${editingId}`, {
          name: form.name.trim(),
          type: form.type,
          active: form.active,
        });

        setSuccess("Category updated successfully.");
      } else {
        await api.post("/categories", {
          name: form.name.trim(),
          type: form.type,
          active: form.active,
        });

        setSuccess("Category created successfully.");
      }

      setShowForm(false);
      setEditingId(null);

      await loadCategories();
    } catch (err) {
      console.error("Save Category Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE CATEGORY
  // =====================================================

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/categories/${category._id}`);

      setSuccess("Category deleted successfully.");

      await loadCategories();
    } catch (err) {
      console.error("Delete Category Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to delete category."
      );
    }
  };

  // =====================================================
  // GROUP CATEGORIES (for summary counts)
  // =====================================================

  const typeCategories = categories.filter(
    (category) => category.type === "type"
  );

  const collectionCategories = categories.filter(
    (category) => category.type === "collection"
  );

  const gemstoneCategories = categories.filter(
    (category) => category.type === "gemstone"
  );

  // =====================================================
  // FILTERED + PAGINATED LIST
  // =====================================================

  const filteredCategories =
    filterType === "all"
      ? categories
      : categories.filter(
          (category) => category.type === filterType
        );

  const totalPages =
    Math.ceil(filteredCategories.length / ITEMS_PER_PAGE) || 1;

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCategories = filteredCategories.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const FILTER_TABS = [
    {
      value: "all",
      label: "All",
      icon: <LayoutGrid size={15} />,
      count: categories.length,
    },
    {
      value: "type",
      label: "Types",
      icon: <Layers3 size={15} />,
      count: typeCategories.length,
    },
    {
      value: "collection",
      label: "Collections",
      icon: <Folder size={15} />,
      count: collectionCategories.length,
    },
    {
      value: "gemstone",
      label: "Gemstones",
      icon: <Gem size={15} />,
      count: gemstoneCategories.length,
    },
  ];

  // =====================================================
  // CATEGORY ICON
  // =====================================================

  const getCategoryIcon = (type) => {
    if (type === "type") return <Layers3 size={17} />;
    if (type === "collection") return <Folder size={17} />;
    return <Gem size={17} />;
  };

  const getTypeLabel = (type) => {
    if (type === "type") return "Type";
    if (type === "collection") return "Collection";
    return "Gemstone";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="categories-page">
      {/* PAGE HEADER */}

      <header className="page-header">
        <div>
          <div className="eyebrow">
            PASSIONE GIOIELLI
          </div>

          <h1>Categories</h1>

          <p>
            Manage product types, collections and
            gemstones from one place.
          </p>
        </div>

        <button
          type="button"
          className="add-button"
          onClick={() => openCreate("type")}
        >
          <Plus size={16} />
          Add Category
        </button>
      </header>

      {/* MESSAGES */}

      {error && (
        <div className="message error">
          <CircleAlert size={16} />
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {success && (
        <div className="message success">
          <Check size={16} />
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* SUMMARY */}

      {!loading && (
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">
              <Layers3 size={18} />
            </div>

            <div>
              <span>Product Types</span>
              <strong>{typeCategories.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Folder size={18} />
            </div>

            <div>
              <span>Collections</span>
              <strong>
                {collectionCategories.length}
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Gem size={18} />
            </div>

            <div>
              <span>Gemstones</span>
              <strong>
                {gemstoneCategories.length}
              </strong>
            </div>
          </div>

          <div className="summary-card highlight">
            <div className="summary-icon">
              <Check size={18} />
            </div>

            <div>
              <span>Total Categories</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
        </div>
      )}

      {/* FILTER TABS */}

      {!loading && (
        <div className="filter-tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={
                filterType === tab.value
                  ? "filter-tab active"
                  : "filter-tab"
              }
              onClick={() => setFilterType(tab.value)}
            >
              {tab.icon}
              {tab.label}
              <span className="filter-count">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* CONTENT */}

      {loading ? (
        <div className="loading-card">
          <div className="loader" />
          <p>Loading categories...</p>
        </div>
      ) : (
        <section className="category-section">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-icon">
                {filterType === "all" ? (
                  <LayoutGrid size={17} />
                ) : (
                  getCategoryIcon(filterType)
                )}
              </div>

              <div>
                <h2>
                  {
                    FILTER_TABS.find(
                      (t) => t.value === filterType
                    )?.label
                  }
                </h2>

                <p>
                  {filteredCategories.length}{" "}
                  {filteredCategories.length === 1
                    ? "category"
                    : "categories"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="section-add"
              onClick={() =>
                openCreate(
                  filterType === "all" ? "type" : filterType
                )
              }
            >
              <Plus size={15} />
              Add Category
            </button>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">
                {filterType === "all" ? (
                  <LayoutGrid size={20} />
                ) : (
                  getCategoryIcon(filterType)
                )}
              </div>

              <h3>No categories yet</h3>

              <p>Add your first category to get started.</p>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th className="name-column">
                        Name
                      </th>

                      <th>Slug</th>

                      <th>Type</th>

                      <th>Status</th>

                      <th>Created</th>

                      <th className="actions-column">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCategories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <div className="category-name">
                            <div className="row-icon">
                              {getCategoryIcon(category.type)}
                            </div>

                            <div>
                              <strong>
                                {category.name}
                              </strong>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="slug">
                            {category.slug}
                          </span>
                        </td>

                        <td>
                          <span className="type-pill">
                            {getTypeLabel(category.type)}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              category.active
                                ? "status active"
                                : "status inactive"
                            }
                          >
                            <span className="status-dot" />

                            {category.active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td>
                          <span className="created-date">
                            {category.createdAt
                              ? new Date(
                                  category.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </span>
                        </td>

                        <td>
                          <div className="row-actions">
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() =>
                                openEdit(category)
                              }
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              onClick={() =>
                                handleDelete(category)
                              }
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              {totalPages > 1 && (
                <div className="pagination">
                  <span className="pagination-info">
                    Page {safePage} of {totalPages}
                  </span>

                  <div className="pagination-controls">
                    <button
                      type="button"
                      className="page-nav"
                      onClick={() => goToPage(safePage - 1)}
                      disabled={safePage === 1}
                    >
                      <ChevronLeft size={15} />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={
                          page === safePage
                            ? "page-number active"
                            : "page-number"
                        }
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      className="page-nav"
                      onClick={() => goToPage(safePage + 1)}
                      disabled={safePage === totalPages}
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* ================================================= */}
      {/* FORM MODAL */}
      {/* ================================================= */}

      {showForm && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div>
                <div className="modal-eyebrow">
                  CATEGORY MANAGEMENT
                </div>

                <h2>
                  {editingId
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  {editingId
                    ? "Update the category information below."
                    : "Create a new category for your jewellery catalogue."}
                </p>
              </div>

              <button
                type="button"
                className="close"
                onClick={closeForm}
                disabled={saving}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="field">
                  <label>
                    Category Name
                    <span>*</span>
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rings"
                    autoFocus
                  />
                </div>

                <div className="field">
                  <label>
                    Category Type
                    <span>*</span>
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    {CATEGORY_TYPES.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="active-toggle-row">
                  <span className="toggle-text">
                    <strong>
                      Category is active
                    </strong>

                    <small>
                      Active categories are available
                      throughout the store.
                    </small>
                  </span>

                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="active"
                      checked={form.active}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Category"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .categories-page {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          color: #171717;
        }

        /* ================================
           PAGE HEADER
        ================================= */

        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;

          padding-bottom: 30px;

          border-bottom: 1px solid #ded9ce;
        }

        .eyebrow {
          margin-bottom: 9px;

          color: #9b8d68;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.2em;
        }

        .page-header h1 {
          margin: 0;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 36px;
          font-weight: 400;

          line-height: 1.1;
        }

        .page-header p {
          margin: 10px 0 0;

          color: #777;

          font-size: 13px;
          line-height: 1.6;
        }

        .add-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          height: 44px;

          padding: 0 20px;

          border: 1px solid #1b807f;

          background: #1b807f;

          color: #fff;

          cursor: pointer;

          font-size: 12px;
          letter-spacing: 0.04em;

          white-space: nowrap;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .add-button:hover {
          background: #176e6d;
          border-color: #176e6d;
        }

        /* ================================
           MESSAGES
        ================================= */

        .message {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-top: 20px;

          padding: 13px 15px;

          font-size: 12px;
        }

        .message button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          margin-left: auto;

          width: 26px;
          height: 26px;

          border: none;

          background: transparent;

          cursor: pointer;
        }

        .message.error {
          border: 1px solid #efd0cb;
          background: #fff5f3;
          color: #a73529;
        }

        .message.success {
          border: 1px solid #c9e2db;
          background: #f0f9f6;
          color: #17665f;
        }

        /* ================================
           SUMMARY
        ================================= */

        .summary-grid {
          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 14px;

          margin-top: 24px;
          margin-bottom: 26px;
        }

        .summary-card {
          display: flex;
          align-items: center;

          gap: 13px;

          min-width: 0;

          padding: 18px;

          background: #fff;

          border: 1px solid #e2ddd2;
        }

        .summary-card.highlight {
          border-color: #d6c9a9;
          background: #fcfaf4;
        }

        .summary-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          width: 38px;
          height: 38px;

          background: #f5f1e7;

          color: #9b8d68;
        }

        .summary-card.highlight
          .summary-icon {
          background: #e9f5f2;
          color: #1b807f;
        }

        .summary-card span {
          display: block;

          color: #858585;

          font-size: 9px;

          text-transform: uppercase;

          letter-spacing: 0.1em;
        }

        .summary-card strong {
          display: block;

          margin-top: 5px;

          font-family: Georgia, serif;

          font-size: 23px;

          font-weight: 400;
        }

        /* ================================
           FILTER TABS
        ================================= */

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;

          gap: 10px;

          margin-bottom: 18px;
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          height: 38px;

          padding: 0 15px;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #555;

          cursor: pointer;

          font-size: 12px;
          font-weight: 500;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .filter-tab:hover {
          border-color: #1b807f;
          color: #1b807f;
        }

        .filter-tab.active {
          border-color: #1b807f;
          background: #1b807f;
          color: #fff;
        }

        .filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-width: 20px;
          height: 20px;

          padding: 0 6px;

          background: rgba(0, 0, 0, 0.06);

          font-size: 10px;
          font-weight: 600;
        }

        .filter-tab.active .filter-count {
          background: rgba(255, 255, 255, 0.22);
        }

        /* ================================
           SECTIONS
        ================================= */

        .category-section {
          overflow: hidden;

          background: #fff;

          border: 1px solid #e0dbd0;
        }

        .section-header {
          min-height: 74px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          padding: 0 22px;

          border-bottom: 1px solid #e7e2d8;

          background: #fff;
        }

        .section-title-wrap {
          display: flex;
          align-items: center;

          gap: 12px;
        }

        .section-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 38px;
          height: 38px;

          background: #f6f2e9;

          color: #9b8d68;
        }

        .section-header h2 {
          margin: 0;

          font-family: Georgia, serif;

          font-size: 18px;
          font-weight: 400;
        }

        .section-header p {
          margin: 4px 0 0;

          color: #888;

          font-size: 11px;
        }

        .section-add {
          display: inline-flex;
          align-items: center;

          gap: 6px;

          height: 34px;

          padding: 0 13px;

          border: 1px solid #d7d1c4;

          background: #fff;

          color: #444;

          cursor: pointer;

          font-size: 11px;

          transition: 0.2s ease;
        }

        .section-add:hover {
          border-color: #1b807f;
          color: #1b807f;
        }

        /* ================================
           TABLE
        ================================= */

        .table-wrap {
          width: 100%;

          overflow-x: auto;
        }

        table {
          width: 100%;

          min-width: 820px;

          border-collapse: collapse;

          table-layout: fixed;
        }

        th {
          padding: 12px 20px;

          background: #faf9f6;

          color: #858585;

          text-align: left;

          font-size: 9px;
          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 0.1em;

          white-space: nowrap;

          border-bottom: 1px solid #e8e4da;
        }

        td {
          padding: 15px 20px;

          border-bottom: 1px solid #eeeae2;

          color: #333;

          font-size: 12px;

          vertical-align: middle;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        tbody tr {
          transition: background 0.15s ease;
        }

        tbody tr:hover {
          background: #fcfbf8;
        }

        .name-column {
          width: 26%;
        }

        .actions-column {
          width: 190px;

          text-align: right;
        }

        .category-name {
          display: flex;
          align-items: center;

          gap: 11px;
        }

        .row-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 32px;
          height: 32px;

          flex-shrink: 0;

          background: #f7f4ed;

          color: #9b8d68;
        }

        .category-name strong {
          display: block;

          color: #222;

          font-size: 12px;

          font-weight: 600;
        }

        .type-pill {
          display: inline-block;

          padding: 5px 9px;

          background: #f6f2e9;

          color: #9b8d68;

          font-size: 9px;
          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 0.05em;
        }

        .slug {
          display: inline-block;

          padding: 5px 8px;

          background: #f7f6f2;

          color: #777;

          font-family: monospace;

          font-size: 10px;
        }

        .status {
          display: inline-flex;
          align-items: center;

          gap: 6px;

          padding: 6px 9px;

          font-size: 9px;

          font-weight: 500;
        }

        .status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: currentColor;
        }

        .status.active {
          background: #edf8f5;
          color: #17665f;
        }

        .status.inactive {
          background: #fff5e4;
          color: #986800;
        }

        .created-date {
          color: #777;

          font-size: 11px;

          white-space: nowrap;
        }

        .row-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 7px;
        }

        .row-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          height: 32px;

          padding: 0 10px;

          cursor: pointer;

          font-size: 10px;

          background: #fff;

          transition: 0.2s ease;
        }

        .edit-button {
          border: 1px solid #d8d4ca;

          color: #444;
        }

        .edit-button:hover {
          border-color: #1b807f;
          color: #1b807f;
        }

        .delete-button {
          border: 1px solid #ead2ce;

          color: #a13a30;
        }

        .delete-button:hover {
          border-color: #c0392b;
          background: #fff7f5;
        }

        /* ================================
           PAGINATION
        ================================= */

        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;

          flex-wrap: wrap;

          gap: 12px;

          padding: 16px 22px;

          border-top: 1px solid #e7e2d8;

          background: #faf9f6;
        }

        .pagination-info {
          color: #888;

          font-size: 11px;
        }

        .pagination-controls {
          display: flex;
          align-items: center;

          gap: 6px;
        }

        .page-nav,
        .page-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-width: 32px;
          height: 32px;

          padding: 0 6px;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #444;

          cursor: pointer;

          font-size: 11px;

          transition: 0.2s ease;
        }

        .page-nav:hover:not(:disabled),
        .page-number:hover {
          border-color: #1b807f;
          color: #1b807f;
        }

        .page-nav:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-number.active {
          border-color: #1b807f;
          background: #1b807f;
          color: #fff;
        }

        /* ================================
           EMPTY
        ================================= */

        .empty {
          display: flex;
          align-items: center;
          flex-direction: column;

          padding: 45px 20px;

          text-align: center;
        }

        .empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 42px;
          height: 42px;

          background: #f7f4ed;

          color: #a19577;
        }

        .empty h3 {
          margin: 14px 0 4px;

          font-family: Georgia, serif;

          font-size: 16px;

          font-weight: 400;
        }

        .empty p {
          margin: 0;

          color: #888;

          font-size: 11px;
        }

        /* ================================
           LOADING
        ================================= */

        .loading-card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          min-height: 260px;

          background: #fff;

          border: 1px solid #e2ddd2;
        }

        .loading-card p {
          margin: 13px 0 0;

          color: #888;

          font-size: 11px;
        }

        .loader {
          width: 24px;
          height: 24px;

          border: 2px solid #e7e1d5;
          border-top-color: #1b807f;

          border-radius: 50%;

          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================================
           MODAL
        ================================= */

        .modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 2000;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(20, 20, 20, 0.5);

          backdrop-filter: blur(4px);
        }

        .modal {
          width: 100%;
          max-width: 480px;

          background: #fff;

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 25px;

          border-bottom: 1px solid #e7e2d8;
        }

        .modal-eyebrow {
          margin-bottom: 7px;

          color: #9b8d68;

          font-size: 9px;
          font-weight: 600;

          letter-spacing: 0.16em;
        }

        .modal-header h2 {
          margin: 0;

          font-family: Georgia, serif;

          font-size: 22px;

          font-weight: 400;
        }

        .modal-header p {
          margin: 7px 0 0;

          color: #888;

          font-size: 11px;

          line-height: 1.5;
        }

        .close {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          width: 32px;
          height: 32px;

          border: 1px solid #ddd8cd;

          background: #fff;

          color: #555;

          cursor: pointer;
        }

        .close:hover {
          border-color: #222;
          color: #222;
        }

        .modal-body {
          padding: 25px;
        }

        .field {
          display: flex;
          flex-direction: column;

          gap: 7px;

          margin-bottom: 20px;
        }

        .field label {
          color: #333;

          font-size: 11px;
          font-weight: 600;
        }

        .field label span {
          margin-left: 3px;

          color: #b42318;
        }

        .field input,
        .field select {
          width: 100%;
          height: 45px;

          box-sizing: border-box;

          padding: 0 13px;

          border: 1px solid #d8d4ca;

          outline: none;

          background: #fff;

          color: #222;

          font-family: inherit;

          font-size: 12px;
        }

        .field input:focus,
        .field select:focus {
          border-color: #1b807f;
          box-shadow: 0 0 0 2px rgba(27, 128, 127, 0.08);
        }

        /* ================================
           TOGGLE SWITCH (Active status)
        ================================= */

        .active-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 14px;

          padding: 14px 15px;

          border: 1px solid #e7e2d8;

          background: #faf9f6;
        }

        .toggle-text {
          display: flex;
          flex-direction: column;

          gap: 3px;
        }

        .toggle-text strong {
          color: #333;

          font-size: 11px;

          font-weight: 500;
        }

        .toggle-text small {
          color: #999;

          font-size: 9px;
        }

        .toggle-switch {
          position: relative;

          display: inline-block;

          flex-shrink: 0;

          width: 42px;
          height: 24px;

          cursor: pointer;
        }

        .toggle-switch input {
          position: absolute;

          width: 0;
          height: 0;

          opacity: 0;
        }

        .toggle-slider {
          position: absolute;

          inset: 0;

          background: #d8d4ca;

          transition: 0.2s ease;
        }

        .toggle-slider::before {
          content: "";

          position: absolute;

          left: 3px;
          top: 3px;

          width: 18px;
          height: 18px;

          background: #fff;

          transition: 0.2s ease;

          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: #1b807f;
        }

        .toggle-switch
          input:checked
          + .toggle-slider::before {
          transform: translateX(18px);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 9px;

          padding: 18px 25px;

          border-top: 1px solid #e7e2d8;

          background: #fcfbf8;
        }

        .cancel,
        .save {
          height: 40px;

          padding: 0 17px;

          cursor: pointer;

          font-size: 11px;
        }

        .cancel {
          border: 1px solid #d8d4ca;

          background: #fff;

          color: #444;
        }

        .cancel:hover {
          border-color: #999;
        }

        .save {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #1b807f;

          background: #1b807f;

          color: #fff;
        }

        .save:hover {
          background: #176e6d;
        }

        .save:disabled,
        .cancel:disabled {
          opacity: 0.5;

          cursor: not-allowed;
        }

        /* ================================
           RESPONSIVE
        ================================= */

        @media (max-width: 1050px) {
          .summary-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .page-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 18px;
          }

          .page-header h1 {
            font-size: 30px;
          }

          .add-button {
            width: 100%;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .filter-tabs {
            width: 100%;
          }

          .filter-tab {
            flex: 1 1 calc(50% - 5px);
            justify-content: center;
          }

          .section-header {
            padding: 16px;

            min-height: auto;
          }

          .section-add {
            flex-shrink: 0;
          }

          .pagination {
            flex-direction: column;

            align-items: flex-start;
          }

          .modal-header,
          .modal-body {
            padding: 20px;
          }

          .modal-footer {
            padding: 16px 20px;
          }
        }
      `}</style>
    </div>
  );
}