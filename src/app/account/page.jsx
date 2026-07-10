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
  return (
    <h2 className="font-serif text-[18px] tracking-tight text-stone-900 pb-2 border-b-2 border-[#b08d57] inline-block">
      {children}
    </h2>
  );
}

function Placeholder({ label }) {
  return (
    <div className="w-16 h-16 shrink-0 bg-stone-100 border border-stone-200 flex items-center justify-center text-[9px] text-stone-400 text-center leading-tight">
      {label}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2 py-1">
      <dt className="font-semibold w-40 shrink-0 text-stone-900">{label}</dt>
      <dd className="text-stone-600">{value}</dd>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-[13px] mb-1 text-stone-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-0 border-b border-stone-300 pb-2 text-[13px] bg-transparent outline-none focus:border-[#1f4a3f] transition-colors"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[13px] mb-1 text-stone-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none border-0 border-b border-stone-300 pb-2 text-[13px] bg-transparent outline-none focus:border-[#1f4a3f] transition-colors"
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
    <button
      className={`bg-[#1f4a3f] text-white px-6 py-3 text-[13px] tracking-wider hover:bg-[#163a31] transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      className={`border border-stone-400 px-6 py-3 text-[13px] tracking-wider hover:bg-stone-50 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Sidebar ---------- */

function Sidebar({ active, onSelect }) {
  return (
    <div className="w-full sm:w-64 shrink-0 border border-stone-200">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`w-full flex items-center justify-between px-4 py-3 text-[13px] border-b border-stone-200 last:border-b-0 text-left transition-colors ${
            active === tab
              ? "bg-[#1f4a3f] text-white hover:bg-[#1f4a3f]"
              : "bg-white text-stone-700 hover:bg-stone-50"
          }`}
        >
          {tab} <span className="text-[15px] leading-none">›</span>
        </button>
      ))}
      <div className="p-4">
        <OutlineButton className="w-full">LOG OUT</OutlineButton>
      </div>
    </div>
  );
}

/* ---------- Order card ---------- */

function OrderCard({ order, statusLabel, ctaLabel = "TRACK ORDER", ctaVariant = "primary" }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Placeholder label="Earring photo" />
      <div className="flex-1">
        <div className="flex flex-wrap items-start justify-between gap-1">
          <p className="font-serif text-[14px] text-stone-900">{order.name}</p>
          <span className="text-[11px] font-semibold text-[#1f4a3f]">{statusLabel}</span>
        </div>
        <p className="text-[11px] text-stone-500 mt-1">{order.description}</p>
        <div className="flex flex-wrap gap-6 mt-2 text-[11px]">
          <span className="font-semibold text-stone-900">{order.price}</span>
          <span className="text-stone-600">QTY : {order.qty}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-stone-500">
            <span>Order ID : {order.orderId}</span>
            <span>Date : {order.date}</span>
            <span>Payment: {order.payment}</span>
          </div>
          {ctaVariant === "primary" ? (
            <PrimaryButton className="!px-4 !py-2 shrink-0">{ctaLabel} ›</PrimaryButton>
          ) : (
            <OutlineButton className="!px-4 !py-2 shrink-0">{ctaLabel} ›</OutlineButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- My Account ---------- */

function MyAccountView({ hasOrder }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SectionHeading>Recent Order</SectionHeading>
        {!hasOrder && <OutlineButton className="!px-4 !py-2">CONTINUE SHOPPING</OutlineButton>}
      </div>

      {!hasOrder ? (
        <p className="text-[13px] text-stone-500 mt-4 pb-6 border-b border-stone-200">
          You do not have any recent orders.
        </p>
      ) : (
        <div className="border border-stone-200 p-4 mt-4 mb-10">
          <OrderCard order={ORDER} statusLabel={`Estimate Delivery : ${ORDER.date.split(",")[0]}`} />
        </div>
      )}

      <div className="flex items-center justify-between mt-10 mb-3">
        <SectionHeading>Profile</SectionHeading>
        <button className="text-[11px] underline underline-offset-2 text-stone-700">EDIT PROFILE</button>
      </div>
      <dl className="text-[13px] pb-6 border-b border-stone-200">
        <Row label="Name" value={USER.name} />
        <Row label="Email" value={USER.email} />
        <Row label="Phone" value={USER.phone} />
        <Row label="Birthday" value={USER.birthday} />
        <Row label="Gender" value={USER.gender} />
        <Row label="Relationship" value={USER.relationship} />
        <Row label="Anniversary Date" value={USER.anniversary} />
      </dl>

      <div className="flex items-center justify-between mt-10 mb-3">
        <SectionHeading>Address Book</SectionHeading>
        <button className="text-[11px] underline underline-offset-2 text-stone-700">ADD ADDRESS</button>
      </div>
      <p className="text-[13px] text-stone-500">You do not have any stored addresses.</p>
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
    <div className="flex-1 min-w-0">
      <div className="mb-5">
        <SectionHeading>Orders</SectionHeading>
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order, i) => (
          <div key={i} className="border border-stone-200 p-4">
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
    <div className="flex-1 min-w-0">
      <div className="mb-8">
        <SectionHeading>Profile Information</SectionHeading>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
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
      <PrimaryButton className="mt-10">SAVE</PrimaryButton>
    </div>
  );
}

/* ---------- Password ---------- */

function PasswordView() {
  const [form, setForm] = useState({ old: "", next: "", confirm: "" });
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="flex-1 min-w-0 max-w-md">
      <div className="mb-8">
        <SectionHeading>Password</SectionHeading>
      </div>

      <div className="flex flex-col gap-6">
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

      <div className="text-[11px] text-stone-500 flex flex-col gap-1 mt-6 mb-8">
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
      <div className="flex-1 min-w-0">
        <SectionHeading>Address Book</SectionHeading>
        <h3 className="font-serif text-[15px] mt-6 mb-6 text-stone-900">Add New Address</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
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

        <div className="mt-6 flex flex-col gap-2 max-w-2xl">
          <label className="flex items-center gap-2 text-[13px] text-stone-700">
            <input type="checkbox" checked={form.defaultShipping} onChange={update("defaultShipping")} />
            Set as default Shipping Address
          </label>
          <label className="flex items-center gap-2 text-[13px] text-stone-700">
            <input type="checkbox" checked={form.defaultBilling} onChange={update("defaultBilling")} />
            Set as default Billing Address
          </label>
        </div>

        <PrimaryButton className="mt-10" onClick={saveAddress}>
          SAVE
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-5">
        <SectionHeading>Address Book</SectionHeading>
      </div>

      {addresses.length === 0 ? (
        <p className="text-[13px] text-stone-500 mb-6">You do not have any stored addresses.</p>
      ) : (
        <div className="flex flex-col gap-4 mb-6">
          {addresses.map((a, i) => (
            <div key={i} className="border border-stone-200 p-4 flex flex-wrap items-start justify-between gap-3">
              <div className="text-[13px] text-stone-700 leading-relaxed">
                <p className="font-semibold text-stone-900">{a.label}</p>
                <p>{a.name}</p>
                <p>{a.street}</p>
                <p>{a.city}</p>
                <p>{a.phone}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="text-[11px] underline underline-offset-2 text-stone-700">EDIT</button>
                <span className="px-3 py-1 text-[11px] bg-[#b08d57]/15 text-[#8a6d3e]">Default Addresses</span>
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
    <main className="min-h-screen bg-[#FAFAF7] font-sans text-stone-900">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-8 sm:py-16">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10">
          <Sidebar active={active} onSelect={setActive} />

          {active === "My Account" && <MyAccountView hasOrder={hasOrder} />}
          {active === "Orders" && <OrdersView />}
          {active === "Profile Information" && <ProfileInformationView />}
          {active === "Password" && <PasswordView />}
          {active === "Address Book" && <AddressBookView />}
        </div>
      </div>
    </main>
  );
}