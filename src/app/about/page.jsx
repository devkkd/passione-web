"use client";

import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="about">
      {/* ---------- Hero / Intro ---------- */}
      <section className="intro">
        <p className="eyebrow">ABOUT</p>
        <h1 className="title">Drawn from, Earth&apos;s Heart</h1>
        <p className="subtitle">A love letter to Thailand, written in gold</p>
        <p className="lead">
          We did not set out to build a jewelry brand. We set out to find the
          most beautiful things in the world — and we found them in the
          rivers and earth of Thailand.
        </p>

        <blockquote className="quote">
          &quot;We believe that every gemstone carries the memory of the
          place it was born the pressure, the heat, the slow passage of
          geological time. Our work is simply to honour that memory.&quot;
        </blockquote>

        <hr className="divider" />

        <p className="foundedBold">Passione Jewelry was founded in Bangkok,</p>
        <p className="foundedText">
          Thailand, in 2018 with a single, impassioned belief: that the most
          extraordinary jewels in the world are already here, waiting to be
          discovered, held, and worn. This is the story of how we found them
          and why we will never stop searching.
        </p>
      </section>

      {/* ---------- Where It Began (text left / image right) ---------- */}
      <section className="split">
        <div className="textCol order-text-first">
          <h2 className="heading">Where It Began</h2>
          <p className="body">
            <strong>
              Passione Jewelry was founded in 2012 in Bangkok,
            </strong>{" "}
            Thailand a city renowned for its gemstone artistry and
            centuries-old tradition of fine craftsmanship. What began as a
            deep love for rare, colorful gemstones grew into a collection
            built on one simple belief: jewelry should never just be worn, it
            should be felt.
          </p>
          <p className="body">
            From our home in the heart of Bangkok&apos;s gem trade, we set
            out to create pieces that go beyond trend-driven design jewelry
            with soul, character, and a story of its own.
          </p>
        </div>
        <div className="imageCol order-image-first">
          <div className="imageWrap">
            <Image
              src="/about/1.png"
              alt="Gold earrings with citrine gemstones resting on black fabric"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ---------- Our Philosophy (image left / text right) ---------- */}
      <section className="split reverse">
        <div className="imageCol order-image-first">
          <div className="imageWrap">
            <Image
              src="/about/2.png"
              alt="Designer working with jewelry pieces in the studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="textCol order-text-second">
          <h2 className="heading">Our Philosophy</h2>
          <p className="body">
            Every Passione piece begins with a stone, not a sketch. We source
            rare and unusual gemstones citrine, tourmaline, opal, garnet,
            iolite, amethyst, and more and let each one&apos;s natural color,
            cut, and character guide the design around it.
          </p>
          <p className="body">
            The result is a collection where no two pieces feel quite the
            same, each one designed to celebrate individuality rather than
            conform to it.
          </p>
          <p className="body">
            We believe true luxury isn&apos;t about following trends
            it&apos;s about wearing something that feels unmistakably you.
          </p>
        </div>
      </section>

      {/* ---------- Meet the Designer (text left / image right) ---------- */}
      <section className="split">
        <div className="textCol order-text-first">
          <h2 className="heading">Meet the Designer</h2>
          <p className="body">
            John Deo is the creative force behind Passione Jewelry. [1–2
            sentences on their background — training, years of experience,
            what drew them to gemstone jewelry design.]
          </p>
          <p className="body">
            [1–2 sentences describing their design philosophy or process
            e.g., how they select stones, what inspires their work, what they
            want a woman to feel when she wears their pieces.]
          </p>
          <p className="body">
            Working closely with Bangkok&apos;s skilled artisans and gem
            cutters, [Designer Name] brings each design to life by hand —
            combining traditional craftsmanship with a distinctly modern,
            wearable elegance.
          </p>
        </div>
        <div className="imageCol order-image-first">
          <div className="imageWrap">
            <Image
              src="/about/3.png"
              alt="Hands holding an assortment of colorful gemstones"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .about {
          font-family: "Times New Roman", Times, serif;
          color: #1a1a1a;
          max-width: 1400px;
          margin: 0 auto;
          padding: 64px 32px 64px;
        }

        /* ---------- Intro ---------- */
        .intro {
          text-align: center;
          max-width: 850px;
          margin: 0 auto 72px;
        }

        .eyebrow {
          font-size: 18px;
          letter-spacing: 1px;
          font-weight: 500;
           margin-top: 20px;
          margin-bottom: 16px;
        }

        .title {
          font-size: 35px;
          font-weight: 600;
          line-height: 1.2;
          margin: 0 0 20px;
        }

        .subtitle {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 24px;
        }

        .lead {
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 40px;
        }

        .quote {
          font-size: 22px;
          
          line-height: 1.6;
          margin: 0 0 32px;
        }

        .divider {
          width: 690px;
          border: none;
          border-top: 1px solid #ccc;
          margin: 0 auto 32px;
        }

        .foundedBold {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .foundedText {
          font-size: 13px;
          font-weight: 500;
          line-height: 1.7;
          margin: 0;
        }

        /* ---------- Split sections ---------- */
        .split {
          display: flex;
          align-items: center;
          gap: 48px;
          margin-bottom: 72px;
        }

        .textCol {
          flex: 1;
        }

        .imageCol {
          flex: 1;
        }

        .imageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 1.5;
          overflow: hidden;
        }

        .heading {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 20px;
        }

        .body {
          font-size: 14px;
          line-height: 1.8;
          margin: 0 0 16px;
        }

        .body:last-child {
          margin-bottom: 0;
        }

        /* default desktop order (row = source order) */
        .order-text-first {
          order: 1;
        }
        .order-image-first {
          order: 2;
        }
        .order-text-second {
          order: 2;
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 768px) {
          .about {
            padding: 40px 20px 64px;
          }

          .intro {
            margin-bottom: 48px;
          }

          .title {
            font-size: 28px;
          }

          .quote {
            font-size: 16px;
          }

          .divider {
            width: 180px;
          }

          .split {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            margin-bottom: 48px;
          }

          /* image always on top, text always below on mobile */
          .imageCol {
            order: 1;
          }
          .textCol {
            order: 2;
          }

          .heading {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}