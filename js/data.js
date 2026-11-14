// Semua isi portofolio ada di file ini. Edit di sini, tidak perlu menyentuh index.html.
// Foto dan gambar: taruh di folder images/, lalu tulis path-nya (contoh: "images/profil.jpg").
window.DATA = {
  name: "Metalika Gunena",
  role: "Lulusan D-IV Teknik Informatika",
  intro: "Saya membangun server, jaringan, dan aplikasi web, dari homelab sampai halaman yang dibuka pengguna.",
  photo: "images/profil.jpg", // GANTI: foto profilmu. Kalau file belum ada, tampil inisial.
  about: [
    "Saya lulus dari D-IV Teknik Informatika, Politeknik Negeri Manado, pada 2026. Skripsi saya membangun sistem Virtual Lab di atas arsitektur IaaS, mulai dari hypervisor sampai aplikasi webnya.",
    "Saya pernah magang sebagai IT Support di PT Angkasa Pura Indonesia Cabang Manado (Juli–Desember 2025). Sebelum kuliah, saya belajar akuntansi di SMK."
    // GANTI/TAMBAH: paragraf lain tentang dirimu
  ],
  projects: [
    {
      title: "Virtual Lab berbasis IaaS",
      summary: "Sistem lab virtual untuk praktikum pemrograman dan jaringan (skripsi).",
      img: "", // GANTI: contoh "images/virtual-lab.png"
      description: "Sistem lab virtual yang dijalankan di atas infrastruktur IaaS buatan sendiri dan dibuka ke internet secara aman.",
      features: [
        "Lab pemrograman dan lab jaringan berbasis Docker Compose",
        "Server dijalankan di Proxmox VE dengan firewall pfSense",
        "Akses publik lewat Cloudflare Tunnel"
      ],
      stack: ["Proxmox VE", "pfSense", "Docker Compose", "aaPanel", "Cloudflare Tunnel", "PHP"],
      link: "https://v-lab.my.id",
      github: ""
    },
    {
      title: "Aplikasi penjadwalan kuliah",
      summary: "Aplikasi web yang menyusun jadwal kuliah otomatis.",
      img: "",
      description: "Aplikasi web untuk menyusun jadwal kuliah secara otomatis dengan aturan beban dosen.",
      features: [
        "Penyusunan jadwal kuliah otomatis",
        "Batas jumlah kelas per dosen",
        "Penggabungan slot kelas"
      ],
      stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      link: "",
      github: ""
    }
    // GANTI/TAMBAH: salin salah satu blok di atas untuk proyek baru
  ],
  certificates: [
    // GANTI: satu baris per sertifikat. Taruh gambarnya di images/.
    { title: "Sertifikat 1", img: "images/sertifikat-1.jpg" },
    { title: "Sertifikat 2", img: "images/sertifikat-2.jpg" }
  ],
  skills: [
    { group: "Infrastruktur dan jaringan", items: ["Proxmox VE", "pfSense", "Cloudflare Tunnel"] },
    { group: "Server dan container", items: ["Docker", "Docker Compose", "aaPanel", "WSL2"] },
    { group: "Pengembangan web", items: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"] }
  ],
  cta: "Saya sedang mencari pekerjaan di bidang IT. Kirim pesan dan saya akan membalas secepatnya.",
  contacts: [
    { label: "Email", text: "metalikagunena02@gmail.com", href: "mailto:metalikagunena02@gmail.com" },
    { label: "LinkedIn", text: "linkedin.com/in/GANTI-USERNAME", href: "https://www.linkedin.com/in/GANTI-USERNAME" },
    { label: "GitHub", text: "github.com/11lika", href: "https://github.com/11lika" }
  ]
};
