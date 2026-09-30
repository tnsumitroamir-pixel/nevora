import { appPath } from "@agent-native/core/client/api-path";
import {
  IconArrowRight,
  IconBolt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandX,
  IconBrandYoutube,
  IconChartBar,
  IconChecklist,
  IconDeviceGamepad2,
  IconFileText,
  IconGift,
  IconGridDots,
  IconShieldCheck,
  IconSpeakerphone,
  IconUser,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { useState } from "react";

import { NevoraAuthModal, type AuthMode } from "@/components/NevoraAuthModal";

export function meta() {
  return [
    { title: "Nevora — Business Bridge" },
    {
      name: "description",
      content:
        "Nevora menghubungkan advertiser, publisher, dan pengguna dalam ekosistem digital yang saling menguntungkan.",
    },
  ];
}

const benefits = [
  {
    icon: IconBolt,
    title: "Performa Terukur",
    description: "Tracking real-time, konversi akurat, berbasis data.",
  },
  {
    icon: IconShieldCheck,
    title: "Aman & Terpercaya",
    description:
      "Sistem keamanan berlapis, anti-fraud, dan settlement transparan.",
  },
  {
    icon: IconChartBar,
    title: "Pilihan Produk Lengkap",
    description: "Beragam metode pendapatan dan reward untuk pengguna.",
  },
  {
    icon: IconUsers,
    title: "Multi-Role Account",
    description:
      "Satu akun, banyak peran: Konsumen, Publisher, Advertiser, Partner.",
  },
];

const products = [
  {
    icon: IconGift,
    title: "Reward",
    description: "Tukarkan poin Anda dengan berbagai hadiah menarik.",
  },
  {
    icon: IconChecklist,
    title: "Misi Harian",
    description: "Selesaikan misi harian dan dapatkan bonus setiap hari.",
  },
  {
    icon: IconDeviceGamepad2,
    title: "Main Game",
    description: "Nikmati berbagai game seru dan dapatkan reward.",
  },
  {
    icon: IconFileText,
    title: "Survei",
    description: "Isi survei dan bagikan pendapat Anda untuk reward.",
  },
  {
    icon: IconGridDots,
    title: "Produk Lainnya",
    description: "Tonton video, baca artikel, quiz, dan masih banyak lagi.",
  },
];

const ecosystem = [
  {
    id: "advertiser",
    title: "Advertiser",
    description:
      "Tingkatkan brand awareness dan penjualan melalui kampanye iklan yang efektif dan terukur.",
    action: "Jadi Advertiser",
    image:
      "https://images.pexels.com/photos/37073624/pexels-photo-37073624.jpeg",
    imageAlt: "Gedung perkantoran modern di tengah kota.",
    icon: IconSpeakerphone,
    tone: "blue",
  },
  {
    id: "publisher",
    title: "Publisher",
    description:
      "Dapatkan penghasilan dari konten, website, atau channel Anda dengan berbagai pilihan produk.",
    action: "Jadi Publisher",
    image: "https://images.pexels.com/photos/6779604/pexels-photo-6779604.jpeg",
    imageAlt: "Seorang kreator bekerja dengan laptop di ruang kerja.",
    icon: IconUser,
    tone: "green",
  },
  {
    id: "partner",
    title: "Partner",
    description:
      "Bergabung sebagai partner dan kembangkan bisnis Anda bersama Nevora.",
    action: "Jadi Partner",
    image: "https://images.pexels.com/photos/5520322/pexels-photo-5520322.jpeg",
    imageAlt: "Jabat tangan sebagai simbol kerja sama bisnis.",
    icon: IconUsers,
    tone: "violet",
  },
];

function NevoraLogo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`nevora-logo${light ? " nevora-logo-light" : ""}`}
      href="#home"
      aria-label="Nevora, beranda"
    >
      <span className="nevora-logo-mark" aria-hidden="true">
        N
      </span>
      <span>Nevora</span>
    </a>
  );
}

function DashboardPreview() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="art-orbit orbit-one" />
      <span className="art-orbit orbit-two" />
      <span className="art-leaf leaf-one" />
      <span className="art-leaf leaf-two" />
      <span className="art-leaf leaf-three" />
      <span className="art-leaf leaf-four" />

      <div className="role-badge advertiser-badge">
        <IconSpeakerphone size={17} stroke={2.3} /> Advertiser
      </div>
      <div className="role-badge publisher-badge">
        <IconUser size={17} stroke={2.3} /> Publisher
      </div>
      <div className="role-badge user-badge">
        <IconUsers size={17} stroke={2.3} /> User
      </div>
      <div className="role-badge reward-badge">
        <IconGift size={19} stroke={2.3} /> Reward
      </div>

      <div className="laptop">
        <div className="laptop-frame">
          <div className="dashboard-window">
            <div className="dashboard-topbar">
              <span className="dashboard-mini-logo">
                <b>N</b> Nevora
              </span>
              <span className="dashboard-user">
                <i /> Admin
              </span>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-sidebar">
                <span className="sidebar-selected" />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="dashboard-main">
                <div className="dashboard-welcome">Dashboard</div>
                <div className="dashboard-balance">
                  <span>Saldo Reward</span>
                  <strong>
                    <i /> 12.450
                  </strong>
                  <small>+12,8% bulan ini</small>
                </div>
                <div className="dashboard-label">Aktivitas terbaru</div>
                <div className="dashboard-tiles">
                  <div className="mini-tile tile-green">
                    <i />
                    <b>Reward</b>
                  </div>
                  <div className="mini-tile tile-yellow">
                    <i />
                    <b>Misi</b>
                  </div>
                  <div className="mini-tile tile-violet">
                    <i />
                    <b>Game</b>
                  </div>
                </div>
                <div className="dashboard-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop-base" />
      </div>

      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-topbar">
            <b>
              <i>N</i> Nevora
            </b>
            <span>9:41</span>
          </div>
          <p>Saldo Reward</p>
          <strong>
            <i /> 12.450
          </strong>
          <div className="phone-card phone-card-blue">
            <i />
            <span>
              <b>Misi Harian</b>
              <small>Selesaikan misi hari ini</small>
            </span>
          </div>
          <div className="phone-card">
            <i />
            <span>
              <b>Main Game</b>
              <small>Raih reward menarik</small>
            </span>
          </div>
          <div className="phone-card">
            <i />
            <span>
              <b>Survei</b>
              <small>Bagikan pendapatmu</small>
            </span>
          </div>
          <div className="phone-card">
            <i />
            <span>
              <b>Tukar Reward</b>
              <small>Lihat hadiah pilihan</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeRoute() {
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="nevora-site" id="home">
      <header className="site-header">
        <div className="site-container header-content">
          <NevoraLogo />
          <nav className="main-navigation" aria-label="Navigasi utama">
            <a className="active" href="#home">
              Home
            </a>
            <a href={appPath("/advertiser")}>Advertiser</a>
            <a href={appPath("/publisher")}>Publisher</a>
            <a href="#produk">Katalog Produk</a>
          </nav>
          <div className="header-actions">
            <span className="language-control">
              <IconWorld size={16} /> ID <span aria-hidden="true">⌄</span>
            </span>
            <button
              className="button button-outline button-small"
              type="button"
              onClick={() => openAuth("login")}
            >
              Login
            </button>
            <button
              className="button button-primary button-small"
              type="button"
              onClick={() => openAuth("signup")}
            >
              Daftar
            </button>
          </div>
          <a
            className="mobile-menu"
            href="#produk"
            aria-label="Lihat katalog produk"
          >
            <IconGridDots size={23} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="site-container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">Business Bridge</span>
              <h1>
                Jembatan Digital untuk <span>Advertiser, Publisher</span> dan
                Pengguna
              </h1>
              <p>
                Nevora adalah platform reward &amp; performance marketing yang
                menghubungkan advertiser, publisher dan pengguna dalam satu
                ekosistem yang saling menguntungkan.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => openAuth("signup")}
                >
                  Mulai Sekarang <IconArrowRight size={17} />
                </button>
                <a className="button button-outline" href="#produk">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section className="benefits-section section-pad" id="keunggulan">
          <div className="site-container benefits-layout">
            <div className="benefits-copy">
              <h2>Kenapa Memilih Nevora?</h2>
              <p className="section-intro">
                Kami menghadirkan solusi lengkap untuk pertumbuhan bisnis Anda
                dengan teknologi modern, keamanan terjamin, dan ekosistem yang
                saling menguntungkan.
              </p>
              <div className="benefits-grid">
                {benefits.map(({ icon: Icon, title, description }) => (
                  <article className="benefit-item" key={title}>
                    <span className="benefit-icon">
                      <Icon size={21} stroke={2.2} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <article className="reward-promo">
              <div className="reward-photo">
                <img
                  src="https://images.pexels.com/photos/3785851/pexels-photo-3785851.jpeg"
                  alt="Seorang perempuan tersenyum saat menggunakan ponsel di kafe."
                  loading="lazy"
                />
              </div>
              <div className="reward-copy">
                <span className="reward-icon">
                  <IconGift size={24} stroke={2.1} />
                </span>
                <h3>Dapatkan Reward Setiap Aktivitas</h3>
                <p>
                  Selesaikan misi, main game, isi survei, atau lihat iklan untuk
                  mendapatkan reward menarik.
                </p>
                <button
                  className="button button-primary button-small"
                  type="button"
                  onClick={() => openAuth("signup")}
                >
                  Mulai Sekarang <IconArrowRight size={15} />
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="products-section section-pad" id="produk">
          <div className="site-container">
            <div className="section-heading">
              <h2>Produk Kami</h2>
              <p>Beragam pilihan produk untuk memenuhi kebutuhan Anda</p>
            </div>
            <div className="product-grid">
              {products.map(({ icon: Icon, title, description }, index) => (
                <article
                  className={`product-card product-card-${index + 1}`}
                  key={title}
                >
                  <span className="product-icon">
                    <Icon size={22} stroke={2.2} />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a className="text-link" href="#cta">
                    Lihat Detail <IconArrowRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecosystem-section section-pad" id="ekosistem">
          <div className="site-container">
            <div className="section-heading">
              <h2>Ekosistem Bisnis Nevora</h2>
              <p>
                Solusi lengkap untuk advertiser, publisher, dan partner dalam
                satu platform.
              </p>
            </div>
            <div className="ecosystem-grid">
              {ecosystem.map(
                ({
                  id,
                  title,
                  description,
                  action,
                  image,
                  imageAlt,
                  icon: Icon,
                  tone,
                }) => (
                  <article
                    className={`ecosystem-card ecosystem-${tone}`}
                    id={id}
                    key={id}
                  >
                    <div className="ecosystem-image">
                      <img src={image} alt={imageAlt} loading="lazy" />
                    </div>
                    <div className="ecosystem-copy">
                      <span className="ecosystem-icon">
                        <Icon size={20} stroke={2.2} />
                      </span>
                      <h3>{title}</h3>
                      <p>{description}</p>
                      <a
                        className="text-link"
                        href={
                          id === "advertiser"
                            ? appPath("/advertiser")
                            : id === "publisher"
                              ? appPath("/publisher")
                              : "#cta"
                        }
                      >
                        {action} <IconArrowRight size={14} />
                      </a>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="opportunity-band" id="cta">
          <div className="site-container opportunity-content">
            <div className="opportunity-copy">
              <h2>
                Bersama Nevora,
                <br />
                Raih Lebih Banyak Peluang
              </h2>
              <p>
                Bergabunglah sekarang dan jadilah bagian dari ekosistem digital
                yang terus berkembang.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <IconUsers size={22} />
                <strong>1M+</strong>
                <span>Pengguna Aktif</span>
              </div>
              <div className="stat-item">
                <IconChartBar size={22} />
                <strong>500+</strong>
                <span>Kampanye Iklan</span>
              </div>
              <div className="stat-item">
                <IconGift size={22} />
                <strong>5M+</strong>
                <span>Reward Tersalurkan</span>
              </div>
              <div className="stat-item">
                <IconWorld size={22} />
                <strong>10K+</strong>
                <span>Publisher &amp; Partner</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="site-container footer-main">
          <div className="footer-brand">
            <NevoraLogo light />
            <p>
              Nevora adalah platform reward &amp; performance marketing yang
              menghubungkan advertiser, publisher dan pengguna dalam satu
              ekosistem yang saling menguntungkan.
            </p>
            <div className="social-links" aria-label="Media sosial">
              <span>
                <IconBrandFacebook size={17} />
              </span>
              <span>
                <IconBrandInstagram size={17} />
              </span>
              <span>
                <IconBrandYoutube size={17} />
              </span>
              <span>
                <IconBrandX size={16} />
              </span>
              <span>
                <IconBrandTelegram size={17} />
              </span>
            </div>
          </div>
          <div className="footer-column">
            <h3>Produk</h3>
            <a href="#produk">Reward</a>
            <a href="#produk">Misi Harian</a>
            <a href="#produk">Main Game</a>
            <a href="#produk">Survei</a>
            <a href="#produk">Produk Lainnya</a>
          </div>
          <div className="footer-column">
            <h3>Bisnis</h3>
            <a href="#publisher">Publisher</a>
            <a href="#advertiser">Advertiser</a>
            <a href="#partner">Partner</a>
          </div>
          <div className="footer-column">
            <h3>Perusahaan</h3>
            <a href="#keunggulan">About Us</a>
            <a href="#cta">Cara Kerja</a>
            <a href="#ekosistem">FAQ</a>
            <a href="#cta">Kontak</a>
          </div>
          <div className="footer-column">
            <h3>Legal</h3>
            <span>Syarat dan ketentuan</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© 2025 Nevora. Semua hak dilindungi.</span>
          <span>Bersama Membangun Ekosistem Digital yang Lebih Baik</span>
        </div>
      </footer>
      <NevoraAuthModal
        mode={authMode}
        open={authOpen}
        onOpenChange={setAuthOpen}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
