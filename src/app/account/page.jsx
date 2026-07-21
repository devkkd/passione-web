"use client";

import { useState } from "react";

const USER = {
  name: "John Deo",
  email: "johndeo@gmail.com",
  phone: "(+91) 1234567890",
  birthday: "06/29/1999",
  gender: "Male",
  relationship: "Married",
  anniversary: "11/03/2012",
};

const ORDER = {
  name: "Opal & Iolite Blue Topaz Earrings",
  description: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
  price: "$1,500.00",
  qty: 1,
  orderId: "#1234567890",
  date: "March 20, 2026, 14:54:00",
  payment: "Success | PayPal",
};

const TABS = ["My Account", "Orders", "Profile Information", "Password", "Address Book"];

/* ---------- shared bits ---------- */

function SectionHeading({ children }) {
  return <h2 className="rs-heading">{children}</h2>;
}

function Placeholder({ label }) {
  return <div className="rs-orderImg">{label}</div>;
}

function Row({ label, value }) {
  return (
    <div className="rs-profileRow">
      <dt className="rs-profileLabel">{label}</dt>
      <dd className="rs-profileValue">{value}</dd>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="rs-fieldLabel">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rs-textInput"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="rs-fieldLabel">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="rs-textInput rs-selectInput"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button className={`rs-btnPrimary ${className}`} {...props}>
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button className={`rs-btnOutline ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ---------- Sidebar ---------- */

function Sidebar({ active, onSelect }) {
  return (
    <div className="rs-sidebar">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`rs-sideBtn ${active === tab ? "rs-sideActive" : ""}`}
        >
          {tab} <span>›</span>
        </button>
      ))}
      <div className="rs-logoutWrap">
        <OutlineButton className="rs-btnFull">LOG OUT</OutlineButton>
      </div>
    </div>
  );
}

/* ---------- Order card ---------- */

function OrderCard({ order, statusLabel, ctaLabel = "TRACK ORDER", ctaVariant = "primary" }) {
  return (
    <div className="rs-orderRow">
      <Placeholder label="Earring photo" />
      <div className="rs-orderInfo">
        <div className="rs-orderTop">
          <p className="rs-orderName">{order.name}</p>
          <span className="rs-orderStatus">{statusLabel}</span>
        </div>
        <p className="rs-orderDesc">{order.description}</p>
        <div className="rs-orderMetaInline">
          <span className="rs-bold">{order.price}</span>
          <span className="rs-muted">QTY : {order.qty}</span>
        </div>
        <div className="rs-orderFooter">
          <div className="rs-orderMeta">
            <span className="rs-muted">Order ID : {order.orderId}</span>
            <span className="rs-muted">Date : {order.date}</span>
            <span className="rs-orderPayment">Payment: {order.payment}</span>
          </div>
          {ctaVariant === "primary" ? (
            <PrimaryButton className="rs-btnAuto">{ctaLabel} ›</PrimaryButton>
          ) : (
            <OutlineButton className="rs-btnAuto">{ctaLabel} ›</OutlineButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- My Account ---------- */

function MyAccountView({ hasOrder }) {
  return (
    <div className="rs-content">
      <div className="rs-rowBetween">
        <SectionHeading>Recent Order</SectionHeading>
        {!hasOrder && <OutlineButton className="rs-btnAuto">CONTINUE SHOPPING</OutlineButton>}
      </div>

      {!hasOrder ? (
        <p className="rs-emptyText rs-mt10 rs-bottomBorder">You do not have any recent orders.</p>
      ) : (
        <div className="rs-orderBox rs-mt10 rs-mb32">
          <OrderCard order={ORDER} statusLabel={`Estimate Delivery : ${ORDER.date.split(",")[0]}`} />
        </div>
      )}

      <div className="rs-rowBetween rs-mt32 rs-mb12">
        <SectionHeading>Profile</SectionHeading>
        <button className="rs-linkBtn">EDIT PROFILE</button>
      </div>
      <dl className="rs-profileList rs-bottomBorder">
        <Row label="Name" value={USER.name} />
        <Row label="Email" value={USER.email} />
        <Row label="Phone" value={USER.phone} />
        <Row label="Birthday" value={USER.birthday} />
        <Row label="Gender" value={USER.gender} />
        <Row label="Relationship" value={USER.relationship} />
        <Row label="Anniversary Date" value={USER.anniversary} />
      </dl>

      <div className="rs-rowBetween rs-mt32 rs-mb12">
        <SectionHeading>Address Book</SectionHeading>
        <button className="rs-linkBtn">ADD ADDRESS</button>
      </div>
      <p className="rs-emptyText">You do not have any stored addresses.</p>
    </div>
  );
}

/* ---------- Orders ---------- */

function OrdersView() {
  const orders = [
    { ...ORDER, statusLabel: "Estimate Delivery : March 30, 2026", cta: "TRACK ORDER", variant: "primary" },
    { ...ORDER, statusLabel: "Delivered : March 30, 2026", cta: "ORDER DETAILS", variant: "outline" },
    { ...ORDER, statusLabel: "Return and Refund Success : March 30, 2026", cta: "ORDER DETAILS", variant: "outline" },
  ];

  return (
    <div className="rs-content">
      <div className="rs-mb16">
        <SectionHeading>Orders</SectionHeading>
      </div>
      <div className="rs-ordersList">
        {orders.map((order, i) => (
          <div key={i} className="rs-orderBox">
            <OrderCard order={order} statusLabel={order.statusLabel} ctaLabel={order.cta} ctaVariant={order.variant} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Profile Information ---------- */

function ProfileInformationView() {
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Deo",
    email: "johndeo@gmail.com",
    confirmEmail: "",
    country: "India",
    phone: "1234567890",
    birthday: "01/24/1999",
    gender: "Male",
  });
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="rs-content">
      <div className="rs-mb32">
        <SectionHeading>Profile Information</SectionHeading>
      </div>
      <div className="rs-formGrid rs-maxW">
        <Field label="First name*" value={form.firstName} onChange={update("firstName")} />
        <SelectField label="Country*" value={form.country} onChange={update("country")} options={["India", "United States"]} />
        <Field label="Last name*" value={form.lastName} onChange={update("lastName")} />
        <Field label="Mobile Phone Number*" value={form.phone} onChange={update("phone")} />
        <Field label="Email address*" value={form.email} onChange={update("email")} />
        <Field label="Birthday(Optional)" value={form.birthday} onChange={update("birthday")} />
        <Field
          label="Confirm Email address*"
          value={form.confirmEmail}
          onChange={update("confirmEmail")}
          placeholder="Enter confirm email address*"
        />
        <SelectField label="Gender (Optional)" value={form.gender} onChange={update("gender")} options={["Male", "Female", "Other"]} />
      </div>
      <PrimaryButton className="rs-mt10">SAVE</PrimaryButton>
    </div>
  );
}

/* ---------- Password ---------- */

function PasswordView() {
  const [form, setForm] = useState({ old: "", next: "", confirm: "" });
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="rs-content rs-narrow">
      <div className="rs-mb32">
        <SectionHeading>Password</SectionHeading>
      </div>

      <div className="rs-passwordFields">
        <Field type="password" label="Old Password*" value={form.old} onChange={update("old")} placeholder="Enter your old password" />
        <Field type="password" label="New Password*" value={form.next} onChange={update("next")} placeholder="Enter your new password" />
        <Field
          type="password"
          label="Confirm password*"
          value={form.confirm}
          onChange={update("confirm")}
          placeholder="Enter your confirm password"
        />
      </div>

      <div className="rs-rulesText rs-mt24 rs-mb32">
        <p>✓ A minimum of 8 character(s) &nbsp; ✓ A minimum of 1 number</p>
        <p>✓ A minimum of 1 uppercase letter &nbsp; ✓ A minimum of 1 lowercase letter</p>
        <p>✓ A minimum of 1 special character</p>
      </div>

      <PrimaryButton>SAVE</PrimaryButton>
    </div>
  );
}

/* ---------- Address Book ---------- */

function AddressBookView() {
  const [addresses, setAddresses] = useState([
    {
      label: "LARGE LEAF LN - 33021 (Shipping & Billing)",
      name: "John Deo",
      street: "LARGE LEAF LN",
      city: "Hollywood, FL 33021",
      phone: "1234567890",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    region: "",
    zip: "",
    phone: "",
    defaultShipping: false,
    defaultBilling: false,
  });

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const saveAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        label: `${form.address.toUpperCase()} - ${form.zip} (Shipping & Billing)`,
        name: `${form.firstName} ${form.lastName}`,
        street: form.address,
        city: `${form.city}, ${form.region} ${form.zip}`,
        phone: form.phone,
      },
    ]);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="rs-content">
        <SectionHeading>Address Book</SectionHeading>
        <h3 className="rs-subheading">Add New Address</h3>

        <div className="rs-formGrid rs-maxW">
          <Field label="First name*" value={form.firstName} onChange={update("firstName")} placeholder="Enter your first name*" />
          <Field label="Last name*" value={form.lastName} onChange={update("lastName")} placeholder="Enter your last name*" />
          <SelectField label="Country/Region*" value={form.country} onChange={update("country")} options={["", "India", "United States"]} />
          <Field label="Address*" value={form.address} onChange={update("address")} placeholder="Enter your address*" />
          <Field label="City*" value={form.city} onChange={update("city")} placeholder="Enter your city*" />
          <SelectField label="Region*" value={form.region} onChange={update("region")} options={["", "FL", "CA", "NY"]} />
          <Field label="Zip / Postal code*" value={form.zip} onChange={update("zip")} placeholder="Enter your Zip / Postal code*" />
          <Field
            label="Recipient's Phone Number*"
            value={form.phone}
            onChange={update("phone")}
            placeholder="Enter recipient's phone number*"
          />
        </div>

        <div className="rs-checkboxList rs-maxW">
          <label className="rs-checkboxRow">
            <input type="checkbox" checked={form.defaultShipping} onChange={update("defaultShipping")} />
            Set as default Shipping Address
          </label>
          <label className="rs-checkboxRow">
            <input type="checkbox" checked={form.defaultBilling} onChange={update("defaultBilling")} />
            Set as default Billing Address
          </label>
        </div>

        <PrimaryButton className="rs-mt10" onClick={saveAddress}>
          SAVE
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="rs-content">
      <div className="rs-mb16">
        <SectionHeading>Address Book</SectionHeading>
      </div>

      {addresses.length === 0 ? (
        <p className="rs-emptyText rs-mb24">You do not have any stored addresses.</p>
      ) : (
        <div className="rs-addrList rs-mb24">
          {addresses.map((a, i) => (
            <div key={i} className="rs-addrBox">
              <div className="rs-addrText">
                <p className="rs-bold">{a.label}</p>
                <p>{a.name}</p>
                <p>{a.street}</p>
                <p>{a.city}</p>
                <p>{a.phone}</p>
              </div>
              <div className="rs-addrActions">
                <button className="rs-linkBtn">EDIT</button>
                <span className="rs-defaultPill">Default Addresses</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <PrimaryButton onClick={() => setShowForm(true)}>ADD NEW ADDRESS</PrimaryButton>
    </div>
  );
}

/* ---------- Page ---------- */

export default function AccountPage() {
  const [active, setActive] = useState("My Account");
  const hasOrder = true; // set to false to see the empty state

  return (
    <main className="rs-page">
      <div className="rs-wrap">
        <div className="rs-layout">
          <Sidebar active={active} onSelect={setActive} />

          {active === "My Account" && <MyAccountView hasOrder={hasOrder} />}
          {active === "Orders" && <OrdersView />}
          {active === "Profile Information" && <ProfileInformationView />}
          {active === "Password" && <PasswordView />}
          {active === "Address Book" && <AddressBookView />}
        </div>
      </div>

      <style>{`
        .rs-page {
          min-height: 100vh;
          background: #fafaf7;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1c1c1a;
        }

       .rs-wrap {
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 32px 80px;
}

@media (max-width: 768px) {
  .rs-wrap {
    padding: 90px 20px 60px;
  }
}

        .rs-layout {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        @media (min-width: 640px) {
          .rs-layout { flex-direction: row; gap: 40px; }
        }

        .rs-heading {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.01em;
          padding-bottom: 8px;
          border-bottom: 2px solid #B4AA8F;
          display: inline-block;
          margin: 0;
        }

        .rs-subheading {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          font-weight: 700;
          margin: 24px 0;
        }

        .rs-sidebar {
          width: 100%;
          flex-shrink: 0;
          border: 1px solid #B4AA8F;
          align-self: flex-start;
        }

        @media (min-width: 640px) {
          .rs-sidebar { width: 256px; }
        }

        .rs-sideBtn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          font-size: 13px;
          border: none;
          border-bottom: 1px solid #B4AA8F;
          text-align: left;
          background: #fff;
          color: #333;
          cursor: pointer;
          font-family: inherit;
        }

        .rs-sideBtn:hover { background: #f7f6f2; }
        .rs-sideBtn:last-of-type { border-bottom: none; }

        .rs-sideActive { background: #1B807F; color: #fff; }
        .rs-sideActive:hover { background: #166967; }

        .rs-logoutWrap { padding: 16px; }

        .rs-btnOutline {
          width: auto;
          padding: 12px 24px;
          font-size: 13px;
          letter-spacing: 0.05em;
          background: #fff;
          border: 1px solid #B4AA8F;
          cursor: pointer;
          font-family: inherit;
        }

        .rs-btnOutline:hover { background: #f7f6f2; }

        .rs-btnFull { width: 100%; }

        .rs-btnAuto { padding: 8px 16px; }

        .rs-btnPrimary {
          padding: 12px 24px;
          color: #fff;
          background: #1B807F;
          font-size: 13px;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .rs-btnPrimary:hover { background: #166967; }

        .rs-linkBtn {
          font-size: 11px;
          text-decoration: underline;
          text-underline-offset: 2px;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          font-family: inherit;
        }

        .rs-content { flex: 1; min-width: 0; }

        .rs-narrow { max-width: 420px; }

        .rs-rowBetween {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .rs-mb12 { margin-bottom: 12px; }
        .rs-mb16 { margin-bottom: 16px; }
        .rs-mb24 { margin-bottom: 24px; }
        .rs-mb32 { margin-bottom: 32px; }
        .rs-mt10 { margin-top: 40px; }
        .rs-mt24 { margin-top: 24px; }
        .rs-mt32 { margin-top: 32px; }

        .rs-bottomBorder {
          padding-bottom: 24px;
          border-bottom: 1px solid #B4AA8F;
        }

        .rs-emptyText { font-size: 13px; color: #7a7566; margin: 0; }

        .rs-orderBox { border: 1px solid #B4AA8F; padding: 16px; }

        .rs-ordersList { display: flex; flex-direction: column; gap: 16px; }

        .rs-orderRow { display: flex; flex-direction: column; gap: 16px; }

        @media (min-width: 640px) {
          .rs-orderRow { flex-direction: row; }
        }

        .rs-orderImg {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          background: #f3f2ee;
          border: 1px solid #B4AA8F;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #a39d8c;
          text-align: center;
          line-height: 1.2;
        }

        .rs-orderInfo { flex: 1; min-width: 0; }

        .rs-orderTop {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 4px;
        }

        .rs-orderName {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          margin: 0;
        }

        .rs-orderStatus { font-size: 11px; font-weight: 600; color: #1B807F; }

        .rs-orderDesc { font-size: 11px; color: #7a7566; margin: 4px 0 0; }

        .rs-orderMeta {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 8px;
          font-size: 11px;
        }

        .rs-orderMetaInline {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 8px;
          font-size: 11px;
        }

        .rs-muted { color: #7a7566; }
        .rs-bold { font-weight: 600; }

        .rs-orderFooter {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
        }

        .rs-orderPayment { font-size: 11px; color: #7a7566; }

        .rs-profileList {
          font-size: 13px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 0;
        }

        .rs-profileRow { display: flex; gap: 8px; padding: 4px 0; }

        .rs-profileLabel { font-weight: 600; width: 160px; flex-shrink: 0; margin: 0; }

        .rs-profileValue { color: #4d4a3f; margin: 0; }

        .rs-formGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .rs-formGrid { grid-template-columns: 1fr 1fr; gap: 20px 32px; }
        }

        .rs-maxW { max-width: 680px; }

        .rs-passwordFields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .rs-fieldLabel {
          display: block;
          font-size: 13px;
          margin-bottom: 4px;
          color: #333;
        }

        .rs-textInput {
          width: 100%;
          border: none;
          border-bottom: 1px solid #B4AA8F;
          padding-bottom: 8px;
          font-size: 13px;
          outline: none;
          background: transparent;
          font-family: inherit;
          box-sizing: border-box;
        }

        .rs-textInput:focus { border-bottom-color: #1B807F; }

        .rs-selectInput { appearance: none; }

        .rs-rulesText {
          font-size: 11px;
          color: #7a7566;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rs-checkboxList {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rs-checkboxRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .rs-addrList { display: flex; flex-direction: column; gap: 16px; }

        .rs-addrBox {
          border: 1px solid #B4AA8F;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rs-addrText { font-size: 13px; line-height: 1.6; }

        .rs-addrActions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .rs-defaultPill {
          padding: 4px 12px;
          font-size: 11px;
          background: rgba(27, 128, 127, 0.12);
          color: #1B807F;
        }
      `}</style>
    </main>
  );
}