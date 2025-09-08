const accuContent = document.getElementById("accu-content");
const tmdContent = document.getElementById("tmd-content");

// ====== ข้อมูลจังหวัดทั้งหมด 77 จังหวัด แบ่งตามภาค ======
const REGIONS = {
  north: {
    name: "ภาคเหนือ",
    provinces: {
      chiangmai: { name: "เชียงใหม่", lat: 18.7883, lon: 98.9853 },
      chiangrai: { name: "เชียงราย", lat: 19.9105, lon: 99.8406 },
      lampang: { name: "ลำปาง", lat: 18.2888, lon: 99.4909 },
      lamphun: { name: "ลำพูน", lat: 18.5800, lon: 99.0079 },
      nan: { name: "น่าน", lat: 18.7756, lon: 100.7730 },
      phayao: { name: "พะเยา", lat: 19.1665, lon: 99.9016 },
      phrae: { name: "แพร่", lat: 18.1446, lon: 100.1403 },
      maeHongSon: { name: "แม่ฮ่องสอน", lat: 19.3002, lon: 97.9685 },
      uttaradit: { name: "อุตรดิตถ์", lat: 17.6198, lon: 100.0993 },
      sukhothai: { name: "สุโขทัย", lat: 17.0056, lon: 99.8264 },
      phitsanulok: { name: "พิษณุโลก", lat: 16.8286, lon: 100.2624 },
      phichit: { name: "พิจิตร", lat: 16.4429, lon: 100.3486 },
      kamphaengphet: { name: "กำแพงเพชร", lat: 16.4827, lon: 99.5228 },
      tak: { name: "ตาก", lat: 16.8839, lon: 99.1256 },
      phetchabun: { name: "เพชรบูรณ์", lat: 16.4180, lon: 101.1545 },
      nakhonsawan: { name: "นครสวรรค์", lat: 15.7047, lon: 100.1372 },
      uthaithani: { name: "อุทัยธานี", lat: 15.3830, lon: 100.0245 }
    }
  },
  northeast: {
    name: "ภาคตะวันออกเฉียงเหนือ",
    provinces: {
      khonkaen: { name: "ขอนแก่น", lat: 16.4419, lon: 102.8350 },
      udonthani: { name: "อุดรธานี", lat: 17.4138, lon: 102.7870 },
      loei: { name: "เลย", lat: 17.4860, lon: 101.7223 },
      nongkhai: { name: "หนองคาย", lat: 17.8783, lon: 102.7413 },
      nongbualamphu: { name: "หนองบัวลำภู", lat: 17.2046, lon: 102.4381 },
      mahasarakham: { name: "มหาสารคาม", lat: 16.1846, lon: 103.3026 },
      roiet: { name: "ร้อยเอ็ด", lat: 16.0538, lon: 103.6520 },
      kalasin: { name: "กาฬสินธุ์", lat: 16.4322, lon: 103.5065 },
      sakonnakhon: { name: "สกลนคร", lat: 17.1546, lon: 104.1476 },
      nakhonphanom: { name: "นครพนม", lat: 17.4033, lon: 104.7784 },
      mukdahan: { name: "มุกดาหาร", lat: 16.5449, lon: 104.7206 },
      buriram: { name: "บุรีรัมย์", lat: 14.9930, lon: 103.1029 },
      surin: { name: "สุรินทร์", lat: 14.8829, lon: 103.4937 },
      sisaket: { name: "ศรีสะเกษ", lat: 15.1186, lon: 104.3220 },
      ubonratchathani: { name: "อุบลราชธานี", lat: 15.2287, lon: 104.8564 },
      yasothon: { name: "ยโสธร", lat: 15.7941, lon: 104.1453 },
      amnatcharoen: { name: "อำนาจเจริญ", lat: 15.8652, lon: 104.6258 },
      nakhonratchasima: { name: "นครราชสีมา", lat: 14.9799, lon: 102.0977 },
      chayaphum: { name: "ชัยภูมิ", lat: 15.8103, lon: 102.0315 }
    }
  },
  central: {
    name: "ภาคกลาง",
    provinces: {
      bangkok: { name: "กรุงเทพมหานคร", lat: 13.7563, lon: 100.5018 },
      samutprakan: { name: "สมุทรปราการ", lat: 13.5991, lon: 100.5998 },
      nonthaburi: { name: "นนทบุรี", lat: 13.8591, lon: 100.5217 },
      pathumthani: { name: "ปทุมธานี", lat: 14.0208, lon: 100.5250 },
      phranakhonsiayutthaya: { name: "พระนครศรีอยุธยา", lat: 14.3513, lon: 100.5770 },
      angthong: { name: "อ่างทอง", lat: 14.5896, lon: 100.4550 },
      lopburi: { name: "ลพบุรี", lat: 14.7995, lon: 100.6534 },
      singburi: { name: "สิงห์บุรี", lat: 14.8879, lon: 100.4047 },
      chainat: { name: "ชัยนาท", lat: 15.1850, lon: 100.1251 },
      saraburi: { name: "สระบุรี", lat: 14.5289, lon: 100.9101 },
      ratchaburi: { name: "ราชบุรี", lat: 13.5283, lon: 99.8134 },
      kanchanaburi: { name: "กาญจนบุรี", lat: 14.0228, lon: 99.5328 },
      supanburi: { name: "สุพรรณบุรี", lat: 14.4745, lon: 100.1177 },
      nakhonpathom: { name: "นครปฐม", lat: 13.8199, lon: 100.0622 },
      samutsakhon: { name: "สมุทรสาคร", lat: 13.5475, lon: 100.2740 },
      samutsongkhram: { name: "สมุทรสงคราม", lat: 13.4098, lon: 100.0023 },
      phetchaburi: { name: "เพชรบุรี", lat: 13.1111, lon: 99.9395 },
      prachuapkhirikhan: { name: "ประจวบคีรีขันธ์", lat: 11.8123, lon: 99.7977 }
    }
  },
  east: {
    name: "ภาคตะวันออก",
    provinces: {
      chonburi: { name: "ชลบุรี", lat: 13.3611, lon: 100.9847 },
      rayong: { name: "ระยอง", lat: 12.6814, lon: 101.2789 },
      chanthaburi: { name: "จันทบุรี", lat: 12.6113, lon: 102.1039 },
      trat: { name: "ตราด", lat: 12.2428, lon: 102.5170 },
      chachoengsao: { name: "ฉะเชิงเทรา", lat: 13.6904, lon: 101.0777 },
      prachinburi: { name: "ปราจีนบุรี", lat: 14.0470, lon: 101.3705 },
      nakhonnayok: { name: "นครนายก", lat: 14.2069, lon: 101.2130 },
      saakaeo: { name: "สระแก้ว", lat: 13.8140, lon: 102.0722 }
    }
  },
  south: {
    name: "ภาคใต้",
    provinces: {
      nakhonsithammarat: { name: "นครศรีธรรมราช", lat: 8.4304, lon: 99.9631 },
      krabi: { name: "กระบี่", lat: 8.0863, lon: 98.9063 },
      phangnga: { name: "พังงา", lat: 8.4510, lon: 98.5250 },
      phuket: { name: "ภูเก็ต", lat: 7.8804, lon: 98.3923 },
      suratthani: { name: "สุราษฎร์ธานี", lat: 9.1382, lon: 99.3215 },
      ranong: { name: "ระนอง", lat: 9.9658, lon: 98.6348 },
      chumphon: { name: "ชุมพร", lat: 10.4930, lon: 99.1800 },
      songkhla: { name: "สงขลา", lat: 7.1990, lon: 100.5951 },
      satun: { name: "สตูล", lat: 6.6238, lon: 100.0674 },
      trang: { name: "ตรัง", lat: 7.5594, lon: 99.6111 },
      phatthalung: { name: "พัทลุง", lat: 7.6173, lon: 100.0771 },
      pattani: { name: "ปัตตานี", lat: 6.8682, lon: 101.2501 },
      yala: { name: "ยะลา", lat: 6.5412, lon: 101.2801 },
      narathiwat: { name: "นราธิวาส", lat: 6.4255, lon: 101.8253 }
    }
  }
};

// ====== เติม dropdown ภาค ======
const regionSelect = document.getElementById("region");
regionSelect.innerHTML = `<option value="">-- เลือกภาค --</option>` +
  Object.entries(REGIONS)
    .map(([key, r]) => `<option value="${key}">${r.name}</option>`)
    .join("");

// ====== เมื่อเลือกภาค ให้เติมจังหวัด ======
const provinceSelect = document.getElementById("province");
regionSelect.addEventListener("change", () => {
  const selectedRegion = regionSelect.value;
  provinceSelect.innerHTML = `<option value="">-- เลือกจังหวัด --</option>`;
  if (selectedRegion && REGIONS[selectedRegion]) {
    Object.entries(REGIONS[selectedRegion].provinces).forEach(([key, p]) => {
      provinceSelect.innerHTML += `<option value="${key}">${p.name}</option>`;
    });
  }
});

// ====== Render Widget พร้อมชื่อจังหวัด ======
function renderWidget(container, data, updated, provinceName) {
  container.innerHTML = `
    <div class="kv"><span class="k">จังหวัด</span><span>${provinceName}</span></div>
    <div class="kv"><span class="k">อุณหภูมิ</span><span>${data.main.temp} °C</span></div>
    <div class="kv"><span class="k">ความชื้น</span><span>${data.main.humidity} %</span></div>
    <div class="kv"><span class="k">ปริมาณเมฆ</span><span>${data.clouds.all} %</span></div>
    <div class="kv"><span class="k">ปริมาณฝน</span><span>${data.rain ? data.rain["1h"]+" มม." : "—"}</span></div>
    <div class="kv"><span class="k">ทัศนวิสัย</span><span>${(data.visibility/1000).toFixed(1)} กม.</span></div>
    <div class="kv"><span class="k">ความเร็วลม</span><span>${data.wind.speed} m/s</span></div>
    <div class="kv"><span class="k">ทิศลม</span><span>${data.wind.deg}°</span></div>
    <div class="kv"><span class="k">อัปเดตล่าสุด</span><span>${updated}</span></div>
  `;
}

// ====== Fetch Ventusky (ปรับส่ง provinceName) ======
async function fetchVentusky(lat = 15, lon = 100, provinceName = "") {
  try {
    const apiKey = "51aa5f1f28fbc963708d597cba354ffc";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=th&appid=${apiKey}`
    );
    const data = await res.json();

    const updated = new Date(data.dt * 1000).toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Bangkok"
    });

    renderWidget(accuContent, data, updated, provinceName);
  } catch (e) {
    accuContent.innerHTML = `<div class="kv"><span class="k">Error</span><span>${e.message}</span></div>`;
  }
}

// ====== Fetch TMD (ปรับส่ง provinceName) ======
async function fetchTMD(lat = 15, lon = 100, provinceName = "") {
  try {
    const apiKey = "51aa5f1f28fbc963708d597cba354ffc";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=th`
    );
    const data = await res.json();

    const updated = new Date(data.dt * 1000).toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short"
    });

    renderWidget(tmdContent, data, updated, provinceName);
  } catch (e) {
    tmdContent.innerHTML = `<div class="kv"><span class="k">Error</span><span>${e.message}</span></div>`;
  }
}

// ====== ปุ่มกด Fetch ข้อมูล ======
document.getElementById("btnFetch").addEventListener("click", () => {
  const selectedRegion = regionSelect.value;
  const selectedProvince = provinceSelect.value;

  if (!selectedRegion || !selectedProvince) {
    alert("กรุณาเลือกภาคและจังหวัดก่อนครับ");
    return;
  }

  const provinceData = REGIONS[selectedRegion].provinces[selectedProvince];
  const { lat, lon, name } = provinceData;

  // อัปเดต iframe
  document.getElementById('frame-ventusky').src = `https://www.ventusky.com/?p=${lat};${lon};5&l=temperature-2m`;
  document.getElementById('frame-windy').src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=5&level=surface&overlay=temp`;

  // ดึงข้อมูลอากาศ พร้อมส่งชื่อจังหวัด
  fetchVentusky(lat, lon, name);
  fetchTMD(lat, lon, name);

  // เมื่อมีการเปลี่ยนจังหวัด
document.getElementById("province").addEventListener("change", function() {
  const selected = this.options[this.selectedIndex].text; // เอาชื่อจังหวัดจาก <option>
  document.getElementById("province-name").innerText = "จังหวัด " + selected;
});

// เรียกตอนกดปุ่มดึงข้อมูลด้วยก็ได้
document.getElementById("btnFetch").addEventListener("click", function() {
  const provinceSelect = document.getElementById("province");
  const selected = provinceSelect.options[provinceSelect.selectedIndex].text;
  document.getElementById("province-name").innerText = "จังหวัด " + selected;
});
});