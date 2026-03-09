const animationTimeline = () => {
  // --- 1. SETUP ELEMENT ---
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  // Split teks "Happy Birthday" / "My Gorgeous Girl" agar tetap bisa dianimasikan per huruf
  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // --- 2. FUNGSI KETIK PER KATA ---
  function mulaiNgetik() {
    const textString =
      "Ketemu kamu itu kayak nemu lagu favorit yang nggak sengaja keputar di radio, tiba-tiba aja bikin hidupku jadi jauh lebih baik. Aku emang ngga pandai ngerangkai kata-kata, tapi lewat kodingan sederhana ini, aku cuma mau bilang kalau setiap detik yang aku lewatin bareng kamu itu berharga banget. Sama aku terus ya, karena kalo nggaada kamu, aku gamau. I love you! ❤️";
    const words = textString.split(" ");
    const typingTextElement = document.getElementById("typing-text");
    let i = 0;

    if (typingTextElement) {
      typingTextElement.innerHTML = ""; // Bersihkan teks lama
      function type() {
        if (i < words.length) {
          typingTextElement.innerHTML += words[i] + " ";
          i++;
          setTimeout(type, 180); // Kecepatan ketik (180ms per kata)
        }
      }
      type();
    }
  }

  // Menggunakan TimelineMax dengan durasi transisi yang diperlambat (Slow)
  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    // Part 1: Hey
    .from(".one", 1, { opacity: 0, y: 10 })
    .from(".two", 0.8, { opacity: 0, y: 10 })
    .to(".one", 1, { opacity: 0, y: 10 }, "+=3") // Tahan 3 detik
    .to(".two", 1, { opacity: 0, y: 10 }, "-=1")

    // Part 2: It's your birthday
    .from(".three", 1, { opacity: 0, y: 10 })
    .to(".three", 1, { opacity: 0, y: 10 }, "+=3")

    // Part 3: KOTAK SURAT (Ketikan Muncul)
    .from(".four", 1, {
      scale: 0.2,
      opacity: 0,
      onStart: mulaiNgetik, // Jalankan fungsi ngetik
    })
    .to(".four", 1, { scale: 1 }, "+=15") // TAHAN 15 DETIK agar teks selesai diketik & terbaca
    .to(".four", 1, { scale: 0.2, opacity: 0, y: -150 })

    // Part 4: Ideas (Dibuat lebih slow transisinya)
    .from(".idea-1", 1, ideaTextTrans)
    .to(".idea-1", 1, ideaTextTransLeave, "+=2")
    .from(".idea-2", 1, ideaTextTrans)
    .to(".idea-2", 1, ideaTextTransLeave, "+=2")
    .from(".idea-3", 1, ideaTextTrans)
    .to(".idea-3 strong", 0.8, {
      scale: 1.2,
      x: 10,
      backgroundColor: "#d63384",
      color: "#fff",
    })
    .to(".idea-3", 1, ideaTextTransLeave, "+=2")
    .from(".idea-4", 1, ideaTextTrans)
    .to(".idea-4", 1, ideaTextTransLeave, "+=2")
    .from(
      ".idea-5",
      1,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1",
    )
    .to(".idea-5 span", 1, { rotation: 90, x: 8 }, "+=1")
    .to(".idea-5", 1, { scale: 0.2, opacity: 0 }, "+=2.5")

    // Part 5: Big Text (Slow Motion)
    .staggerFrom(
      ".idea-6 span",
      1.2,
      { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut },
      0.3,
    )
    .staggerTo(
      ".idea-6 span",
      1.2,
      { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut },
      0.3,
      "+=2",
    )

    // Part 6: VEKTOR BALON TERBANG (Seven)
    // Ini bagian yang memunculkan kembali 1.png, 2.jpg, dst
    .to(".seven", 0.1, { visibility: "visible" }) // Pastikan wadahnya muncul
    // Cari bagian ini di main.js dan ganti:
    .staggerTo(
      ".baloons img",
      12,
      {
        // Durasi jadi 8 detik (Sangat Slow)
        opacity: 1,
        y: -1500,
        // Logika agar foto hanya muncul di kiri atau kanan (menghindari tengah)
        x: () => {
          const sisi = Math.random() > 0.5 ? "kanan" : "kiri";
          if (sisi === "kiri") {
            return -Math.floor(Math.random() * 200 + 300); // Area Kiri
          } else {
            return Math.floor(Math.random() * 200 + 300); // Area Kanan
          }
        },
        rotation: () => Math.random() * 50 - 25, // Muter dikit aja biar rapi
        ease: Power1.easeOut,
      },
      0.8,
      "-=1",
    ) // Jeda antar foto 0.8 detik (biar munculnya santai)

    // Part 7: FOTO PACAR & WISH
    .from(
      ".girl-dp",
      1.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
        ease: Power2.easeOut,
      },
      "-=3",
    )
    .staggerFrom(
      ".wish-hbd span",
      1,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1,
    )
    .staggerFromTo(
      ".wish-hbd span",
      1,
      { scale: 1.4, rotationY: 150 },
      {
        scale: 1,
        rotationY: 0,
        color: "#d63384",
        ease: Expo.easeOut,
      },
      0.1,
      "party",
    )
    .from(".wish h5", 1, { opacity: 0, y: 10, skewX: "-15deg" }, "party")

    // Penutup
    .to(".six", 1, { opacity: 0, y: 30, zIndex: "-1" }, "+=6") // Foto tampil 6 detik
    .staggerFrom(".nine p", 1.5, ideaTextTrans, 1.5)
    .to(".last-smile", 1, { rotation: 90 }, "+=1.5");

  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
    });
  }
};

// Mengambil data dari customize.json
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          const el = document.getElementById(customData);
          if (el) {
            if (customData === "imagePath") {
              el.setAttribute("src", data[customData]);
            } else {
              el.innerText = data[customData];
            }
          }
        }
      });
    });
};

const resolveFetch = () => {
  return new Promise((resolve) => {
    fetchData();
    resolve("Fetch done!");
  });
};

const playBtn = document.getElementById("playBtn");
const overlay = document.getElementById("overlay");
const musik = document.getElementById("laguValentine");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (musik) musik.play();
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);
    resolveFetch().then(animationTimeline());
  });
}
