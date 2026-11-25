/**
 * STATIC HACKATHON CERTIFICATE SHOWCASE ENGINE
 * 3D Perspective Tilt, Holographic Foil Lighting, Live QR Code,
 * Responsive Scaling, Confetti, and High-Res PNG/PDF Downloads.
 */

const CERT_DATA = {
  eventName: "QUANTUM NEXUS GLOBAL HACKATHON 2026",
  teamName: "TEAM NEURAL VANGUARD",
  certId: "QN-HACK-2026-9842"
};

// 3D Card Tilt & Holographic Lighting Logic
function setup3DCardTilt() {
  const card = document.getElementById('certificateCard');
  const wrapper = document.querySelector('.certificate-perspective-wrapper');
  if (!card || !wrapper) return;

  let isHovered = false;

  wrapper.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  wrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.setProperty('--holo-angle', '135deg');
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isHovered) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.012)`;

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;
    card.style.setProperty('--holo-angle', `${angle.toFixed(1)}deg`);
  });
}

// Responsive Certificate Scaling so it fits any screen cleanly
function updateCertificateScale() {
  const scaler = document.getElementById('certificateScaler');
  if (!scaler) return;

  const baseWidth = 1120;
  const padding = 32;
  const availableWidth = window.innerWidth - padding;

  if (availableWidth < baseWidth) {
    const scale = availableWidth / baseWidth;
    scaler.style.transform = `scale(${scale})`;
    scaler.style.height = `${780 * scale}px`;
  } else {
    scaler.style.transform = 'scale(1)';
    scaler.style.height = '780px';
  }
}

// Generate QR Code pointing to this certificate website
function generateQRCode() {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;
  qrContainer.innerHTML = '';

  const targetUrl = window.location.href;

  if (typeof QRCode !== 'undefined') {
    new QRCode(qrContainer, {
      text: targetUrl,
      width: 100,
      height: 100,
      colorDark: "#090d16",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } else {
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(targetUrl)}`;
    img.alt = "Verification QR Code";
    qrContainer.appendChild(img);
  }
}

// Confetti Celebration Burst
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#00f2fe', '#fbbf24', '#ec4899', '#a855f7']
    });
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#00f2fe', '#fbbf24', '#ec4899', '#a855f7']
    });
  }
}

// High-Resolution PNG Download
async function downloadAsPNG() {
  const card = document.getElementById('certificateCard');
  const scaler = document.getElementById('certificateScaler');
  const btn = document.getElementById('btnDownloadPNG');
  if (!card) return;

  const origCardTransform = card.style.transform;
  const origScalerTransform = scaler ? scaler.style.transform : '';
  card.style.transform = 'none';
  if (scaler) scaler.style.transform = 'scale(1)';

  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Rendering...</span>';

  try {
    const canvas = await html2canvas(card, {
      scale: 2.2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#090d16",
      logging: false
    });

    const link = document.createElement('a');
    const safeName = CERT_DATA.teamName.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `Certificate_${safeName}_${CERT_DATA.certId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    triggerConfetti();
  } catch (err) {
    console.error("PNG export failed:", err);
    alert("Could not export PNG. You can use Print -> Save as PDF as a fallback.");
  } finally {
    card.style.transform = origCardTransform;
    if (scaler) scaler.style.transform = origScalerTransform;
    if (btn) btn.innerHTML = '<i class="fa-solid fa-file-image"></i> <span>Download PNG</span>';
  }
}

// Official A4 Landscape PDF Download
async function downloadAsPDF() {
  const card = document.getElementById('certificateCard');
  const scaler = document.getElementById('certificateScaler');
  const btn = document.getElementById('btnDownloadPDF');
  if (!card) return;

  const origCardTransform = card.style.transform;
  const origScalerTransform = scaler ? scaler.style.transform : '';
  card.style.transform = 'none';
  if (scaler) scaler.style.transform = 'scale(1)';

  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Generating...</span>';

  try {
    const canvas = await html2canvas(card, {
      scale: 2.0,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#090d16",
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'FAST');
    const safeName = CERT_DATA.teamName.replace(/[^a-zA-Z0-9_-]/g, '_');
    pdf.save(`Certificate_${safeName}_${CERT_DATA.certId}.pdf`);
    triggerConfetti();
  } catch (err) {
    console.error("PDF export failed:", err);
    window.print();
  } finally {
    card.style.transform = origCardTransform;
    if (scaler) scaler.style.transform = origScalerTransform;
    if (btn) btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> <span>Download PDF</span>';
  }
}

// Fullscreen Stage Mode
function toggleStageMode() {
  const stage = document.getElementById('mainStage');
  if (!document.fullscreenElement) {
    if (stage.requestFullscreen) stage.requestFullscreen();
    else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
    triggerConfetti();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

// Ambient Background Canvas Particles
function initCanvasParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.8,
    color: Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.45)' : 'rgba(236, 72, 153, 0.35)',
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x = (p.x + p.vx + width) % width;
      p.y = (p.y + p.vy + height) % height;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  generateQRCode();
  setup3DCardTilt();
  initCanvasParticles();
  updateCertificateScale();

  window.addEventListener('resize', updateCertificateScale);

  document.getElementById('btnDownloadPNG')?.addEventListener('click', downloadAsPNG);
  document.getElementById('btnDownloadPDF')?.addEventListener('click', downloadAsPDF);
  document.getElementById('btnPrintCert')?.addEventListener('click', () => window.print());
  document.getElementById('btnStageMode')?.addEventListener('click', toggleStageMode);
  document.getElementById('triggerConfettiBtn')?.addEventListener('click', triggerConfetti);

  setTimeout(triggerConfetti, 500);
});
