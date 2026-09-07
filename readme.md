HydroScan PWA
​Aplikasi Progressive Web App (PWA) untuk mendeteksi tingkat hidrasi tubuh berdasarkan analisis warna sampel air seni menggunakan kamera ponsel secara real-time.
​Fitur Utama
​Akses Kamera Langsung: Memanfaatkan API MediaDevices untuk mengambil sampel visual langsung dari perangkat seluler tanpa perlu instalasi aplikasi dari toko pihak ketiga.
​Analisis Warna Otomatis: Memproses komponen RGB dari piksel gambar tangkapan untuk mencocokkannya dengan estimasi skala hidrasi (berdasarkan standar referensi warna urin).
​Rekomendasi Asupan Cairan: Memberikan saran kuantitatif penambahan air minum dalam mililiter (ml) sesuai tingkat hidrasi yang terdeteksi.
​Dukungan Offline (PWA): Dilengkapi dengan Service Worker dan caching lokal agar aplikasi tetap dapat diakses meskipun tanpa koneksi internet.
​Teknologi yang Digunakan
​Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
​PWA: Web App Manifest, Service Worker API
​API Perangkat: MediaDevices (getUserMedia), Canvas API