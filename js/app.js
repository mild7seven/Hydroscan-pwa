const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const hydrationStatus = document.getElementById('hydration-status');
const waterRecommendation = document.getElementById('water-recommendation');

// Inisialisasi Kamera
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    video.srcObject = stream;
  } catch (error) {
    console.error('Gagal mengakses kamera:', error);
  }
}

// Pemetaan Warna ke Skala Hidrasi (Armstrong Scale 1-8 logika sederhana)
function analyzeColor(r, g, b) {
  // Logika sederhana penentuan tingkat berdasarkan komponen RGB
  // Nilai aktual memerlukan kalibrasi rentang HEX/RGB standar
  const brightness = (r + g + b) / 3;
  
  if (brightness > 200) {
    return {
      status: 'Tingkat 1-2: Terhidrasi Optimal (Kelebihan Asupan / Normal)',
      recommendation: 'Pertahankan konsumsi air harian.'
    };
  } else if (brightness > 120) {
    return {
      status: 'Tingkat 3-5: Hidrasi Cukup / Mulai Dehidrasi Ringan',
      recommendation: 'Minum 300ml - 500ml air putih tambahan.'
    };
  } else {
    return {
      status: 'Tingkat 6-8: Dehidrasi Berat',
      recommendation: 'Segera konsumsi 500ml - 1000ml air putih dan elektrolit.'
    };
  }
}

// Tangkap Frame dan Proses Analisis
captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Ambil sampel piksel di bagian tengah gambar
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  const pixelData = context.getImageData(centerX, centerY, 1, 1).data;
  
  const red = pixelData[0];
  const green = pixelData[1];
  const blue = pixelData[2];

  const result = analyzeColor(red, green, blue);
  hydrationStatus.textContent = result.status;
  waterRecommendation.textContent = result.recommendation;
});

// Registrasi Service Worker untuk PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker terdaftar:', reg.scope))
      .catch((err) => console.error('Pendaftaran Service Worker gagal:', err));
  });
}

initCamera();
