"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="about">
      {/* ---------- Hero / Intro ---------- */}
      <section className="intro">
        <p className="eyebrow">ABOUT</p>
        <h1 className="title">Passione Gioielli</h1>
        <p className="subtitle">Colour, craftsmanship and individuality</p>

        <p className="lead">
          Passione Gioielli is a celebration of colour, craftsmanship and
          individuality. Rooted in Thailand&apos;s renowned gemstone
          heritage, the brand creates distinctive jewellery that brings the
          natural character of each stone to life.
        </p>
        <p className="lead">
          Every creation begins with a gemstone chosen for its unique light,
          tone and personality. From the first sketch to the final setting,
          each detail is thoughtfully considered, combining the precision of
          traditional craftsmanship with a refined, contemporary design
          language.
        </p>
        <p className="lead">
          Rather than following fleeting trends, Passione Gioielli creates
          pieces with a lasting presence. Jewellery designed to feel
          personal, to accompany meaningful moments and to become part of
          the stories passed from one generation to the next.
        </p>

        <hr className="divider" />
      </section>

      {/* ---------- Full-width banner ---------- */}
      <section className="banner">
        <div className="bannerImageWrap">
          <Image
            src="/about/7.jpg"
            alt="Behind Passione Gioielli — designer at work"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="bannerOverlay" />
        </div>
        <div className="bannerText">
          <p className="bannerEyebrow">BEHIND PASSIONE GIOIELLI</p>
          <p className="bannerQuote">
            Designed with emotion. Crafted with intention.
          </p>
        </div>
      </section>

      {/* ---------- Our Heritage (text left / image right) ---------- */}
      <section className="split">
        <div className="textCol order-text-first">
          <h2 className="heading">Our Heritage</h2>
          <p className="body">
            Thailand has long been recognised for its remarkable gemstones
            and generations of skilled artisans. This heritage lies at the
            heart of Passione Gioielli, inspiring a deep appreciation for
            vibrant colour, fine materials and the art of working by hand.
          </p>
          <p className="body">
            By bringing this tradition into a modern context, the brand
            creates jewellery that feels both timeless and unexpected,
            honouring its origins while expressing a distinctly contemporary
            point of view.
          </p>
        </div>
        <div className="imageCol order-image-first">
          <div className="imageWrap">
            <Image
              src="/about/4.jpg"
              alt="Hand-sketched jewellery designs in a studio notebook"
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
              src="/about/5.jpg"
              alt="Designer setting gemstones by hand"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="textCol order-text-second">
          <h2 className="heading">Our Philosophy</h2>
          <p className="body">
            We believe that no two gemstones and no two people are entirely
            alike. Each stone carries its own variations, brilliance and
            character, making every creation naturally individual.
          </p>
          <p className="body">
            Our jewellery is designed with emotion and crafted with
            intention. Every piece reflects a balance of artistry, quality
            and wearability, created not simply as an accessory, but as
            something deeply personal.
          </p>
        </div>
      </section>

      {/* ---------- Meet the Designer (text left / image right) ---------- */}
      <section className="split designer">
        <div className="textCol order-text-first">
          <h2 className="heading">Meet the Designer</h2>
          <p className="designerName">Mukesh Khanchandani</p>
          <p className="designerTitle">Founder &amp; Creative Director</p>
          <p className="body">
            For Mukesh Khanchandani, jewellery begins with emotion. Each
            design is inspired by the individuality of a gemstone and shaped
            into a creation that feels both refined and deeply personal.
          </p>
          <p className="body">
            The result is jewellery defined by expressive colour, meticulous
            craftsmanship and enduring elegance — with pieces created to be
            treasured today and passed on with their stories intact.
          </p>
        </div>
        <div className="imageCol order-image-first">
          <div className="imageWrap portrait">
            <Image
              src="/about/6.jpg"
              alt="Mukesh Khanchandani, Founder and Creative Director of Passione Gioielli"
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
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 18px;
          text-align: center;
        }

        .lead:last-of-type {
          margin-bottom: 40px;
        }

        .divider {
          width: 690px;
          border: none;
          border-top: 1px solid #ccc;
          margin: 0 auto 0;
        }

        /* ---------- Full-width banner ---------- */
        .banner {
          position: relative;
          width: 100%;
          margin: 0 0 72px;
        }

        .bannerImageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }

        .bannerOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.55) 100%
          );
        }

        .bannerText {
          position: absolute;
          left: 50%;
          bottom: 40px;
          transform: translateX(-50%);
          text-align: center;
          color: #fdfdfd;
          width: 90%;
        }

        .bannerEyebrow {
          font-size: 13px;
          letter-spacing: 2px;
          font-weight: 500;
          margin: 0 0 10px;
        }

        .bannerQuote {
          font-size: 22px;
          font-style: italic;
          line-height: 1.5;
          margin: 0;
        }

        /* ---------- Split sections ---------- */
        .split {
          display: flex;
          align-items: center;
          gap: 48px;
          margin-bottom: 72px;
        }

        .split.designer {
          margin-bottom: 0;
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
          aspect-ratio: 4 / 3.5;
          overflow: hidden;
        }

        .imageWrap.portrait {
          aspect-ratio: 4 / 5;
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

        .designerName {
          font-size: 19px;
          font-weight: 700;
          margin: 0 0 4px;
        }

        .designerTitle {
          font-size: 13px;
          font-style: italic;
          color: #555;
          margin: 0 0 20px;
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

          .divider {
            width: 180px;
          }

          .banner {
            margin-bottom: 48px;
          }

          .bannerImageWrap {
            aspect-ratio: 4 / 5;
          }

          .bannerQuote {
            font-size: 17px;
          }

          .split {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            margin-bottom: 48px;
          }

          .split.designer {
            margin-bottom: 0;
          }

          /* image always on top, text always below on mobile */
          .imageCol {
            order: 1;
          }
          .textCol {
            order: 2;
          }

          .imageWrap.portrait {
            aspect-ratio: 4 / 3;
          }

          .heading {
            font-size: 22px;
          }
        }
      `}</style>
    </main>
  );
}