/*************************************
 * 1) Fungsi Sapa Nama
 *************************************/
function sapaNama(nama) {
    return `Halo, ${nama} :)) Selamat datang >_< !`;
  }
  
  // Event handler tombol "Sapa"
  document.getElementById("sapa-button").addEventListener("click", function() {
    const nama = document.getElementById("nama-input").value;
    const outputEl = document.getElementById("sapa-output");
  
    if (nama.trim() === "") {
      outputEl.innerHTML = 
        `<p class="text-red-500">Silakan masukkan nama Anda terlebih dahulu!</p>`;
    } else {
      const pesan = sapaNama(nama);
      outputEl.innerHTML = 
        `<p class="text-green-500">${pesan}</p>`;
    }
  });
  
  
  /*************************************
   * 2) Fungsi Kalkulator (dengan tambahan pangkat, akar, dan modulus)
   *************************************/
  function hitungKalkulator(angka1, angka2, operasi) {
    let hasil = 0;
    switch (operasi) {
      case "tambah":
        hasil = angka1 + angka2;
        break;
      case "kurang":
        hasil = angka1 - angka2;
        break;
      case "kali":
        hasil = angka1 * angka2;
        break;
      case "bagi":
        if (angka2 === 0) {
          return "Error: Pembagian dengan nol tidak diperbolehkan";
        }
        hasil = angka1 / angka2;
        break;
      case "pangkat":
        // pangkat: angka1 ^ angka2
        hasil = Math.pow(angka1, angka2);
        break;
      case "akar":
        // akar kuadrat, hanya pakai angka1
        if (angka1 < 0) {
          return "Error: Tidak bisa mengambil akar dari bilangan negatif";
        }
        hasil = Math.sqrt(angka1);
        break;
      case "modulus":
        // modulus: angka1 % angka2
        hasil = angka1 % angka2;
        break;
      default:
        return "Operasi tidak valid";
    }
    return hasil;
  }
  
  // Fungsi bantu menampilkan hasil atau error
  function tampilkanHasil(hasil, operasi) {
    const hasilKalkulatorEl = document.getElementById("hasil-kalkulator");
    if (typeof hasil === "string" && hasil.startsWith("Error")) {
      // Jika hasil adalah string error
      hasilKalkulatorEl.innerHTML = `<p class="text-red-500">${hasil}</p>`;
    } else {
      // Jika hasil numerik atau valid
      hasilKalkulatorEl.innerHTML = `<p>Hasil ${operasi}: ${hasil}</p>`;
    }
  }
  
  // 2a) Event handler tombol TAMBAH
  document.getElementById("btn-tambah").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML = 
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "tambah");
      // Tampilkan dengan fungsi bantu
      tampilkanHasil(`${angka1} + ${angka2} = ${hasil}`, "Penjumlahan");
    }
  });
  
  // 2b) Event handler tombol KURANG
  document.getElementById("btn-kurang").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "kurang");
      tampilkanHasil(`${angka1} - ${angka2} = ${hasil}`, "Pengurangan");
    }
  });
  
  // 2c) Event handler tombol KALI
  document.getElementById("btn-kali").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "kali");
      tampilkanHasil(`${angka1} × ${angka2} = ${hasil}`, "Perkalian");
    }
  });
  
  // 2d) Event handler tombol BAGI
  document.getElementById("btn-bagi").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "bagi");
      if (typeof hasil === "string" && hasil.startsWith("Error")) {
        // Error: pembagian dengan nol
        document.getElementById("hasil-kalkulator").innerHTML = 
          `<p class="text-red-500">${hasil}</p>`;
      } else {
        tampilkanHasil(`${angka1} ÷ ${angka2} = ${hasil}`, "Pembagian");
      }
    }
  });
  
  // 2e) Event handler tombol PANGKAT
  document.getElementById("btn-pangkat").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "pangkat");
      tampilkanHasil(`${angka1} ^ ${angka2} = ${hasil}`, "Pangkat");
    }
  });
  
  // 2f) Event handler tombol AKAR
  document.getElementById("btn-akar").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    // Akar hanya butuh angka pertama
    if (isNaN(angka1)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka 1 yang valid (akar diambil dari Angka Pertama)!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, 0, "akar");
      if (typeof hasil === "string" && hasil.startsWith("Error")) {
        document.getElementById("hasil-kalkulator").innerHTML =
          `<p class="text-red-500">${hasil}</p>`;
      } else {
        tampilkanHasil(`√${angka1} = ${hasil}`, "Akar Kuadrat");
      }
    }
  });
  
  // 2g) Event handler tombol MODULUS
  document.getElementById("btn-modulus").addEventListener("click", function() {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
  
    if (isNaN(angka1) || isNaN(angka2)) {
      document.getElementById("hasil-kalkulator").innerHTML =
        `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
      const hasil = hitungKalkulator(angka1, angka2, "modulus");
      tampilkanHasil(`${angka1} mod ${angka2} = ${hasil}`, "Modulus");
    }
  });
  