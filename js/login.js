document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login");
  const user = document.getElementById("user");
  const password = document.getElementById("pass");
  const errorMsg = document.getElementById("errorMsg");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let username = user.value.trim();
    let pass = password.value.trim();

    if (username === "" || pass === "") {
      errorMsg.innerHTML = "<p>User name dan password tidak boleh kosong</p>";
      setTimeout(() => { errorMsg.innerHTML = ""; }, 3000);
      return;
    }

    // Simpan username ke localStorage
    localStorage.setItem("login", username);

    // Ambil kelas/jurusan
    const kdj = document.querySelector('input[name="kdj"]:checked');
    if (kdj) {
      localStorage.setItem("kdj", kdj.value);

      // Tentukan file soal sesuai kelas
      let soalPage = "";
      switch (kdj.value) {
        case "X RPL":
          soalPage = "soal_x_rpl.html";
          break;
        case "XI RPL":
          soalPage = "soal_xi_rpl.html";
          break;
        case "XII RPL":
          soalPage = "soal_xii_rpl.html";
          break;
        case "X AKL":
          soalPage = "soal_x_akl.html";
          break;
        default:
          soalPage = "soal.html"; // fallback
      }

      // Arahkan ke halaman soal
      window.location.href = soalPage;

    } else {
      errorMsg.innerHTML = "<p>Silakan pilih kelas/jurusan dulu</p>";
      setTimeout(() => { errorMsg.innerHTML = ""; }, 3000);
    }
  });
});
