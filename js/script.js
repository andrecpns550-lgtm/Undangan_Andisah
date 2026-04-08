

function openInvite() {
      window.location.href = "home.html";
}

// ================= MUSIK =================
document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");

  let isPlaying = false;

  // paksa play lagi (karena sebelumnya sudah pernah play)
  music.play().then(() => {
    isPlaying = true;
    btn.innerHTML = "⏸️";
  }).catch(() => {
    console.log("Autoplay diblokir");
  });

  window.toggleMusic = function () {
    if (isPlaying) {
      music.pause();
      btn.innerHTML = "▶️";
    } else {
      music.play();
      btn.innerHTML = "⏸️";
    }
    isPlaying = !isPlaying;
  };
});



// =================== GALLERY SLIDE ===================
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".gallery-track");
  const images = track.querySelectorAll("img");

  // clone semua gambar agar looping mulus
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  let speed = 1; // kecepatan pixel per frame
  let position = 0;

  function slideGallery() {
    position += speed;
    if (position >= track.scrollWidth / 2) { // reset looping
      position = 0;
    }
    track.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(slideGallery);
  }

  slideGallery();
});



// ================= Calender ================

// ================= POPUP =================
function openPopup(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "flex";
}

function closePopup(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// ================= GOOGLE CALENDAR =================
function saveToGoogleCalendar() {
  const url = "https://www.google.com/calendar/render?action=TEMPLATE"
    + "&text=Wedding Andre & Isah 💍"
    + "&dates=20260606T080000/20260606T120000"
    + "&details=Acara pernikahan Andre & Isah"
    + "&location=Babelan, Bekasi";

  window.open(url, "_blank");
}

// ================= APPLE / iPHONE =================
function openICS() {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Wedding Andre & Isah 💍
DTSTART:20260606T080000
DTEND:20260606T120000
LOCATION:Babelan, Bekasi
DESCRIPTION:Acara pernikahan Andre & Isah
END:VEVENT
END:VCALENDAR
`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  window.open(url); // 🔥 ini bikin tidak download
}


// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

  // ================= COUNTDOWN =================
  const eventDate = new Date(2026, 5, 6, 8, 0, 0);

  function updateCountdown() {
    const now = new Date();
    const gap = eventDate - now;

    if (gap <= 0) return;

    document.getElementById("days").innerText =
      Math.floor(gap / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
      Math.floor((gap / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").innerText =
      Math.floor((gap / (1000 * 60)) % 60);

    document.getElementById("seconds").innerText =
      Math.floor((gap / 1000) % 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ================= GALLERY SLIDE =================
  const track = document.querySelector(".gallery-track");

  if (track) {
    const images = track.querySelectorAll("img");

    images.forEach(img => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });

    let speed = 1;
    let position = 0;

    function slideGallery() {
      position += speed;
      if (position >= track.scrollWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
      requestAnimationFrame(slideGallery);
    }

    slideGallery();
  }

  

  // ================= RSVP =================
// ================= GLOBAL =================
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyAzALwNfOWBXi--II3SwNUcK4_p_vruHzmm-tQAy4kD0xgmRZzPZuTQZKakMKwZenRTQ/exec";

const form = document.getElementById("formUcapan");
const list = document.getElementById("listUcapan");
const msg = document.getElementById("successMsg");

// ================= KIRIM DATA =================
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const hadir = document.getElementById("kehadiran").value;
    const jumlah = document.getElementById("jumlah").value;
    const pesan = document.getElementById("pesan").value.trim();

    if (nama === "") {
      msg.innerHTML = "❌ Nama wajib diisi!";
      msg.style.color = "red";
      msg.style.display = "block";
      return;
    }

    const data = {
      nama,
      hadir,
      jumlah,
      pesan,
      waktu: new Date().toLocaleString()
    };

    fetch(URL_SCRIPT, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      msg.innerHTML = "✅ Berhasil terkirim";
      msg.style.color = "green";
      msg.style.display = "block";

      const initial = nama.charAt(0).toUpperCase();
      const time = new Date().toLocaleTimeString();

      const item = document.createElement("div");
      item.classList.add("ucapan-item");

      item.innerHTML = `
        <div class="avatar">${initial}</div>
        <div class="comment">
          <b>${nama}</b>
          <p>${pesan}</p>
          <div class="meta">${hadir} • ${jumlah} orang • ${time}</div>
        </div>
      `;

      list.prepend(item);
      form.reset();
    })
    .catch(() => {
      msg.innerHTML = "❌ Gagal kirim!";
      msg.style.color = "red";
      msg.style.display = "block";
    });
  });
}

// ================= LOAD DATA =================
fetch(URL_SCRIPT)
  .then(res => res.json())
  .then(data => {
    data.reverse().forEach(item => {
      const initial = item.nama.charAt(0).toUpperCase();

      const div = document.createElement("div");
      div.classList.add("ucapan-item");

      div.innerHTML = `
        <div class="avatar">${initial}</div>
        <div class="comment">
          <b>${item.nama}</b>
          <p>${item.pesan}</p>
          <div class="meta">${item.hadir} • ${item.jumlah} orang • ${item.waktu}</div>
        </div>
      `;

      list.appendChild(div);
    });
  })
  .catch(err => console.log("Load error:", err));

  // ================= ANIMASI SCROLL =================
  const elements = document.querySelectorAll(".fade-up");

  function showOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

});


// ================= HADIAH =================
function openGift() {
  document.getElementById("giftPopup").style.display = "flex";
}

function closeGift() {
  document.getElementById("giftPopup").style.display = "none";
}



/// ================= HADIAH =================

function openGift(){
  document.getElementById('giftPopup').style.display = 'flex';
}
function closeGift(){
  document.getElementById('giftPopup').style.display = 'none';
}

function copyRek(id){
  const text = document.getElementById(id).innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    // optional: beri umpan balik singkat
    alert('Nomor rekening disalin: ' + text);
  }).catch(() => {
    // fallback: buat elemen temporary untuk seleksi
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); alert('Nomor rekening disalin: ' + text); }
    catch(e){ alert('Gagal menyalin'); }
    document.body.removeChild(ta);
  });
}


function openGift() {
  const popup = document.getElementById("giftPopup");
  popup.style.display = "flex";
  popup.style.opacity = "0";

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);
}