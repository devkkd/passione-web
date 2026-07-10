"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CART_ITEM = {
  name: "Opal & Iolite Blue Topaz Earrings",
  description: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
  price: 1500.0,
  qty: 1,
  image: "/images/opal-iolite-earrings.jpg",
};

function formatUSD(amount) {
  return `$${amount.toFixed(2)}`;
}

/* ================= shared bits ================= */

function AuthShell({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-card">{children}</div>
      <Styles />
    </main>
  );
}

function PillTabs({ active, onLogin, onCreate }) {
  return (
    <div className="tabs">
      <button
        onClick={onLogin}
        className={`tab-btn ${active === "login" ? "tab-active" : "tab-inactive"}`}
      >
        LOGIN
      </button>
      <button
        onClick={onCreate}
        className={`tab-btn ${active === "create" ? "tab-active" : "tab-inactive"}`}
      >
        CREATE AN ACCOUNT
      </button>
    </div>
  );
}

function CreateAccountPerks() {
  return (
    <div className="perks">
      <h3 className="heading-serif perks-title">Create an Account</h3>
      <ul className="perks-list">
        <li>✓ An elevated, seamless checkout journey</li>
        <li>✓ Personalized access to your purchase history</li>
        <li>✓ Discreetly stored addresses and payment preferences</li>
        <li>✓ Invitations to exclusive collections and updates</li>
      </ul>
    </div>
  );
}

/* ================= Login ================= */

function LoginView({ onGoCreate, onGoForgot, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  return (
    <AuthShell>
      <PillTabs active="login" onLogin={() => {}} onCreate={onGoCreate} />
      <div className="pad">
        <label className="field-label">Email*</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="text-input"
        />

        <label className="field-label">Password*</label>
        <div className="pw-wrap">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="text-input pw-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="pw-toggle"
            aria-label="Toggle password visibility"
          >
            {showPassword ? "👁" : "⦸"}
          </button>
        </div>

        <button onClick={onGoForgot} className="forgot-link">
          Forgot Password?
        </button>

        <button
          disabled={!canSubmit}
          onClick={() => canSubmit && onLoginSuccess()}
          className="btn-primary"
          style={{ backgroundColor: canSubmit ? "#276152" : "#B1B7AB" }}
        >
          LOGIN
        </button>
      </div>
      <CreateAccountPerks />
      <div className="pad pad-top-0">
        <button onClick={onGoCreate} className="btn-outline">
          CREATE AN ACCOUNT
        </button>
      </div>
    </AuthShell>
  );
}

/* ================= Forgot password ================= */

function ForgotPasswordView({ onBack, onGoCreate }) {
  const [email, setEmail] = useState("");
  const canSubmit = email.trim() !== "";

  return (
    <AuthShell>
      <div className="pad">
        <button onClick={onBack} className="back-link">
          ‹ Back to Login
        </button>

        <div className="section-pill">FORGOT PASSWORD</div>

        <p className="body-text">
          To Receive A Password Reset Link, Please Enter The Email Address You Use To Login.
        </p>

        <label className="field-label">Email*</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="text-input"
          style={{ marginBottom: 24 }}
        />

        <button
          disabled={!canSubmit}
          className="btn-primary"
          style={{ backgroundColor: canSubmit ? "#276152" : "#B1B7AB" }}
        >
          SEND RESET LINK
        </button>
      </div>
      <CreateAccountPerks />
      <div className="pad pad-top-0">
        <button onClick={onGoCreate} className="btn-outline">
          CREATE AN ACCOUNT
        </button>
      </div>
    </AuthShell>
  );
}

/* ================= Create account ================= */

function CreateAccountView({ onGoLogin, onCreated }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phone: "",
    birthday: "",
    gender: "",
    subscribe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    form.country.trim() &&
    form.phone.trim() &&
    form.birthday.trim();

  return (
    <AuthShell>
      <PillTabs active="create" onLogin={onGoLogin} onCreate={() => {}} />
      <div className="pad form-grid">
        <div>
          <label className="field-label">First name*</label>
          <input value={form.firstName} onChange={update("firstName")} placeholder="Enter your first name*" className="text-input" />
        </div>
        <div>
          <label className="field-label">Country*</label>
          <select value={form.country} onChange={update("country")} className="text-input select-input">
            <option value="">Select your country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>

        <div>
          <label className="field-label">Last name*</label>
          <input value={form.lastName} onChange={update("lastName")} placeholder="Enter your last name" className="text-input" />
        </div>
        <div>
          <label className="field-label">Mobile Phone Number*</label>
          <input value={form.phone} onChange={update("phone")} placeholder="Enter your mobile phone number" className="text-input" />
        </div>

        <div>
          <label className="field-label">Email address*</label>
          <input type="email" value={form.email} onChange={update("email")} placeholder="Enter your email address" className="text-input" />
        </div>
        <div>
          <label className="field-label">Birthday*</label>
          <input value={form.birthday} onChange={update("birthday")} placeholder="MM/DD/YYYY" className="text-input" />
        </div>

        <div>
          <label className="field-label">Password*</label>
          <div className="pw-wrap">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={update("password")}
              placeholder="Enter your password"
              className="text-input pw-input"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="pw-toggle">
              {showPassword ? "👁" : "⦸"}
            </button>
          </div>
        </div>
        <div>
          <label className="field-label">Gender (Optional)</label>
          <select value={form.gender} onChange={update("gender")} className="text-input select-input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="span-2">
          <label className="field-label">Confirm password*</label>
          <div className="pw-wrap half-width">
            <input
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              placeholder="Enter your confirm password"
              className="text-input pw-input"
            />
            <button type="button" onClick={() => setShowConfirm((s) => !s)} className="pw-toggle">
              {showConfirm ? "👁" : "⦸"}
            </button>
          </div>
        </div>

        <div className="span-2 rules-text">
          <p>✓ A minimum of 8 character(s) ✓ A minimum of 1 number</p>
          <p>✓ A minimum of 1 uppercase letter ✓ A minimum of 1 lowercase letter</p>
          <p>✓ A minimum of 1 special character</p>
        </div>

        <div className="span-2 subscribe-row">
          <input type="checkbox" checked={form.subscribe} onChange={update("subscribe")} />
          <div>
            <p className="subscribe-title">Stay connected with Passione Jewelry</p>
            <p className="subscribe-copy">
              Receive thoughtful updates across email, messaging, social media, and print. Learn
              more about how we use your data in our Privacy Notice. California residents may
              also view the California Consumer Privacy Statement.
            </p>
          </div>
        </div>

        <div className="span-2">
          <button
            disabled={!canSubmit}
            onClick={() => canSubmit && onCreated(form)}
            className="btn-primary"
            style={{ backgroundColor: canSubmit ? "#276152" : "#B1B7AB" }}
          >
            CREATE AN ACCOUNT
          </button>
        </div>
      </div>
    </AuthShell>
  );
}

/* ================= Verify email ================= */

function VerifyEmailView({ firstName, email, onContinue }) {
  return (
    <main className="verify-page">
      <div className="verify-hero">
        <img src="/images/welcome-hero.jpg" alt="Passione Jewelry" className="verify-img" />
      </div>
      <div className="verify-body">
        <h1 className="heading-serif verify-title">Welcome to Passione Jewelry, {firstName}</h1>
        <p className="verify-step">Just one final step.</p>
        <p className="verify-copy">
          Please check your inbox to confirm your subscription. We&apos;ve sent a message to{" "}
          <span className="bold-inline">{email}</span> with a link to complete your journey with
          Passione.
        </p>
        <button onClick={onContinue} className="btn-primary verify-btn">
          RESEND EMAIL
        </button>
      </div>
      <Styles />
    </main>
  );
}

/* ================= Checkout form (default view) ================= */

function CheckoutForm({ onGoLogin }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    region: "",
    zip: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const total = CART_ITEM.price * CART_ITEM.qty;

  return (
    <main className="checkout-page">
      <div className="wrap">
        <div className="top-row">
          <button className="text-link">‹ Back to Shopping Bag</button>
          <h1 className="heading-serif checkout-title">Checkout</h1>
          <button onClick={onGoLogin} className="have-account">
            Have an account? <span className="login-pill">LOGIN</span>
          </button>
        </div>

        <div className="checkout-grid">
          {/* Left: form */}
          <div>
            <h2 className="heading-serif section-heading">01. Customer Details</h2>
            <div className="form-grid mb-8">
              <Field label="First name*" placeholder="Enter your first name" value={form.firstName} onChange={update("firstName")} />
              <Field label="Last name*" placeholder="Enter your last name" value={form.lastName} onChange={update("lastName")} />
              <Field label="Email address*" placeholder="Enter your email address" value={form.email} onChange={update("email")} />
              <Field label="Mobile Phone Number*" placeholder="Enter your mobile phone number" value={form.phone} onChange={update("phone")} />
            </div>

            <h2 className="heading-serif section-heading">02. Delivery Details</h2>
            <div className="form-grid mb-6">
              <div>
                <label className="field-label">Country*</label>
                <select value={form.country} onChange={update("country")} className="text-input select-input">
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                </select>
              </div>
              <Field label="Address*" placeholder="Enter address" value={form.address} onChange={update("address")} />
              <Field label="City*" placeholder="Enter your city" value={form.city} onChange={update("city")} />
              <Field label="Region*" placeholder="Enter your region" value={form.region} onChange={update("region")} />
              <Field label="Zip / Postal code*" placeholder="Enter your zip / postal code" value={form.zip} onChange={update("zip")} />
            </div>

            <button className="btn-primary continue-btn">CONTINUE WITH CHECKOUT</button>

            <h2 className="heading-serif section-heading section-heading-border">03. Delivery Method</h2>
            <h2 className="heading-serif section-heading section-heading-border">04. Payment</h2>
          </div>

          {/* Right: order summary */}
          <div>
            <div className="summary-lines">
              <div className="summary-row">
                <span className="muted">Estimated Total</span>
                <span className="bold">{formatUSD(total)}</span>
              </div>
              <div className="summary-row">
                <span className="muted">Complimentary Express Delivery</span>
                <span className="bold">$0.00</span>
              </div>
              <div className="summary-row">
                <span className="muted">Estimated Tax</span>
                <span className="bold">$0.00</span>
              </div>
            </div>

            <div className="h-divider" />

            <div className="summary-row total-row heading-serif">
              <span>Estimated Total</span>
              <span>{formatUSD(total)}</span>
            </div>
            <p className="fine-print mb-24">Complimentary Delivery with Effortless Returns</p>

            <h3 className="heading-serif order-summary-title">Order of Summary</h3>
            <div className="order-item">
              <img src={CART_ITEM.image} alt={CART_ITEM.name} className="order-img" />
              <div>
                <p className="heading-serif order-name">{CART_ITEM.name}</p>
                <p className="order-desc">{CART_ITEM.description}</p>
                <p className="order-qty">QTY : {CART_ITEM.qty}</p>
              </div>
            </div>

            <div className="footer-row">
              <span>Privacy Policy | Return Policy | Contact Us</span>
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
      <Styles />
    </main>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} className="text-input" />
    </div>
  );
}

/* ================= Page: switches between all the views above ================= */

export default function CheckoutPage() {
  const router = useRouter();
  const [view, setView] = useState("checkout"); // checkout | login | forgot | create | verify
  const [newAccount, setNewAccount] = useState({ firstName: "John", email: "" });

  if (view === "login") {
    return (
      <LoginView
        onGoCreate={() => setView("create")}
        onGoForgot={() => setView("forgot")}
        onLoginSuccess={() => router.push("/account")}
      />
    );
  }

  if (view === "forgot") {
    return <ForgotPasswordView onBack={() => setView("login")} onGoCreate={() => setView("create")} />;
  }

  if (view === "create") {
    return (
      <CreateAccountView
        onGoLogin={() => setView("login")}
        onCreated={(form) => {
          setNewAccount({ firstName: form.firstName, email: form.email });
          setView("verify");
        }}
      />
    );
  }

  if (view === "verify") {
    return (
      <VerifyEmailView
        firstName={newAccount.firstName}
        email={newAccount.email}
        onContinue={() => router.push("/account")}
      />
    );
  }

  return <CheckoutForm onGoLogin={() => setView("login")} />;
}

/* ================= all CSS for this file ================= */

function Styles() {
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
      `}</style>
      <style jsx>{`
        :global(.heading-serif) {
          font-family: "Times New Roman", Times, serif;
        }

        /* ---------- auth shell ---------- */
       :global(.auth-page) {
  min-height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 120px 32px 60px;
}
        :global(.auth-card) {
          width: 100%;
          max-width: 420px;
          border: 1px solid #e5e5e5;
          height: fit-content;
        }
        :global(.tabs) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #e5e5e5;
        }
        :global(.tab-btn) {
          padding: 12px;
          font-size: 12px;
          letter-spacing: 0.05em;
          background: none;
          cursor: pointer;
          border: 1px solid transparent;
        }
        :global(.tab-active) {
          border-color: #999;
        }
        :global(.tab-inactive) {
          color: #999;
        }
        :global(.pad) {
          padding: 24px;
        }
        :global(.pad-top-0) {
          padding-top: 0;
        }
        :global(.field-label) {
          display: block;
          font-size: 13px;
          margin-bottom: 4px;
        }
        :global(.text-input) {
          width: 100%;
          border: none;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 20px;
          font-size: 13px;
          outline: none;
          background: transparent;
          font-family: "Montserrat", sans-serif;
        }
        :global(.text-input:focus) {
          border-bottom-color: #276152;
        }
        :global(.select-input) {
          appearance: none;
        }
        :global(.pw-wrap) {
          position: relative;
          margin-bottom: 8px;
        }
        :global(.pw-input) {
          padding-right: 32px;
        }
        :global(.pw-toggle) {
          position: absolute;
          right: 0;
          top: 0;
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
        }
        :global(.forgot-link) {
          font-size: 13px;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          display: block;
          margin-bottom: 24px;
          color: #111;
        }
        :global(.btn-primary) {
          width: 100%;
          padding: 13px;
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        :global(.btn-outline) {
          width: 100%;
          padding: 13px;
          font-size: 13px;
          letter-spacing: 0.05em;
          background: #fff;
          border: 1px solid #999;
          cursor: pointer;
        }
        :global(.perks) {
          padding: 24px;
          border-top: 1px solid #e5e5e5;
        }
        :global(.perks-title) {
          font-size: 18px;
          margin-bottom: 12px;
        }
        :global(.perks-list) {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          font-size: 13px;
          color: #333;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        :global(.back-link) {
          font-size: 13px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }
        :global(.section-pill) {
          border: 1px solid #ccc;
          text-align: center;
          padding: 8px;
          font-size: 13px;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }
        :global(.body-text) {
          font-size: 13px;
          color: #333;
          margin-bottom: 20px;
        }

        /* ---------- create account form ---------- */
        :global(.form-grid) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        :global(.span-2) {
          grid-column: span 1;
        }
        :global(.half-width) {
          max-width: 100%;
        }
        :global(.rules-text) {
          font-size: 11px;
          color: #666;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        :global(.subscribe-row) {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        :global(.subscribe-title) {
          font-weight: 600;
          font-size: 13px;
        }
        :global(.subscribe-copy) {
          font-size: 11px;
          color: #666;
          margin-top: 4px;
        }

        /* ---------- verify email ---------- */
        :global(.verify-page) {
          min-height: 100vh;
          background: #fff;
          display: grid;
          grid-template-columns: 1fr;
          font-family: "Montserrat", sans-serif;
        }
        :global(.verify-hero) {
          display: none;
          background: #f3f3f3;
        }
        :global(.verify-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        :global(.verify-body) {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
           padding: 120px 32px 60px;
        }
        :global(.verify-title) {
          font-size: 26px;
          margin-bottom: 24px;
        }
        :global(.verify-step) {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        :global(.verify-copy) {
          font-size: 13px;
          color: #333;
          max-width: 320px;
          margin-bottom: 32px;
        }
        :global(.bold-inline) {
          font-weight: 600;
        }
        :global(.verify-btn) {
          width: auto;
          padding: 13px 32px;
          background: #276152;
        }
        :global(.verify-btn:hover) {
          background: #1e4c40;
        }

        /* ---------- checkout form ---------- */
        :global(.checkout-page) {
          min-height: 100vh;
          background: #fff;
          font-family: "Montserrat", sans-serif;
          color: #111;
        }
        :global(.wrap) {
          max-width: 1400px;
          margin: 0 auto;
            padding: 120px 32px 80px;

        }
        :global(.top-row) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }
        :global(.text-link) {
          font-size: 13px;
          color: #555;
          background: none;
          border: none;
          cursor: pointer;
        }
        :global(.checkout-title) {
          font-size: 22px;
        }
        :global(.have-account) {
          font-size: 13px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        :global(.login-pill) {
          display: inline-block;
          margin-left: 8px;
          padding: 8px 16px;
          color: #fff;
          background: #276152;
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        :global(.checkout-grid) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        :global(.section-heading) {
          font-size: 17px;
          margin-bottom: 16px;
        }
        :global(.section-heading-border) {
          margin-top: 40px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e5e5;
        }
        :global(.mb-8) {
          margin-bottom: 32px;
        }
        :global(.mb-6) {
          margin-bottom: 24px;
        }
        :global(.mb-24) {
          margin-bottom: 24px;
        }
        :global(.continue-btn) {
          width: auto;
          padding: 13px 40px;
          background: #276152;
        }
        :global(.continue-btn:hover) {
          background: #1e4c40;
        }
        :global(.summary-lines) {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 13px;
          margin-bottom: 16px;
        }
        :global(.summary-row) {
          display: flex;
          justify-content: space-between;
        }
        :global(.muted) {
          color: #6b6b6b;
        }
        :global(.bold) {
          font-weight: 600;
        }
        :global(.h-divider) {
          border-top: 1px solid #e5e5e5;
          margin: 16px 0;
        }
        :global(.total-row) {
          font-weight: 600;
          font-size: 15px;
        }
        :global(.fine-print) {
          font-size: 11px;
          color: #8a8a8a;
          margin-top: 4px;
        }
        :global(.order-summary-title) {
          font-size: 16px;
          margin-bottom: 12px;
        }
        :global(.order-item) {
          display: flex;
          gap: 16px;
        }
        :global(.order-img) {
          width: 64px;
          height: 64px;
          object-fit: cover;
          background: #f3f3f3;
          flex-shrink: 0;
        }
        :global(.order-name) {
          font-size: 13px;
        }
        :global(.order-desc) {
          font-size: 11px;
          color: #6b6b6b;
          margin-top: 4px;
        }
        :global(.order-qty) {
          font-size: 11px;
          margin-top: 8px;
        }
        :global(.footer-row) {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #6b6b6b;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (min-width: 640px) {
          :global(.form-grid) {
            grid-template-columns: 1fr 1fr;
            gap: 24px 24px;
          }
          :global(.span-2) {
            grid-column: span 2;
          }
          :global(.half-width) {
            max-width: calc(50% - 12px);
          }
        }
        @media (min-width: 1024px) {
          :global(.checkout-grid) {
            grid-template-columns: 1fr 360px;
          }
          :global(.verify-page) {
            grid-template-columns: 1fr 1fr;
          }
          :global(.verify-hero) {
            display: block;
          }
        }
          @media (max-width: 768px) {

  :global(.auth-page) {
    padding: 90px 20px 40px;
  }

  :global(.verify-body) {
    padding: 90px 20px 40px;
  }

  :global(.wrap) {
    padding: 90px 20px 60px;
  }

}
      `}</style>
    </>
  );
}