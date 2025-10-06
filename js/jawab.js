function submitQuiz() {
  const kdj = localStorage.getItem("kdj");
  const nama = localStorage.getItem("login") || "Tanpa Nama";

  let correctAnswers = {};
  switch (kdj) {
    case "X RPL":
      correctAnswers = { q1: "A", q2: "B", q3: "C", q4: "D", q5: "E",
                         q6: "A", q7: "B", q8: "C", q9: "D", q10: "E",
                         q11: "A", q12: "B", q13: "C", q14: "D", q15: "E",
                         q16: "A", q17: "B", q18: "C", q19: "D", q20: "E" };
      break;
    case "XI RPL":
      correctAnswers = { q1: "B", q2: "B", q3: "C", q4: "D", q5: "D",
                         q6: "C", q7: "B", q8: "B", q9: "C", q10: "B",
                         q11: "C", q12: "C", q13: "B", q14: "B", q15: "B",
                         q16: "C", q17: "B", q18: "C", q19: "C", q20: "B" };
      break;
    case "XII RPL":
      correctAnswers = { q1: "B", q2: "C", q3: "D", q4: "A", q5: "C",
                         q6: "E", q7: "B", q8: "C", q9: "A", q10: "E",
                         q11: "D", q12: "A", q13: "B", q14: "D", q15: "C",
                         q16: "D", q17: "A", q18: "C", q19: "D", q20: "E" };
      break;
    case "X AKL":
      correctAnswers = { q1: "C", q2: "A", q3: "B", q4: "E", q5: "B",
                         q6: "D", q7: "C", q8: "A", q9: "B", q10: "C",
                         q11: "D", q12: "E", q13: "A", q14: "C", q15: "B",
                         q16: "E", q17: "D", q18: "A", q19: "B", q20: "C" };
      break;
    default:
      alert("Kelas/Jurusan tidak dikenali!");
      return;
  }

  let benar = 0;
  const total = Object.keys(correctAnswers).length;

  for (let q in correctAnswers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correctAnswers[q]) benar++;
  }

  const score = benar * 5;

  // Simpan hasil individu
  localStorage.setItem("nilaiUjian", score);
  localStorage.setItem("jumlahBenar", benar);
  localStorage.setItem("totalSoal", total);

  // Simpan juga ke daftar hasil semua siswa
  const hasilSiswa = {
    nama: nama,
    kelas: kdj,
    benar: benar,
    total: total,
    skor: score,
    waktu: new Date().toLocaleString()
  };

  let dataUjian = JSON.parse(localStorage.getItem("dataUjian")) || [];
  dataUjian.push(hasilSiswa);
  localStorage.setItem("dataUjian", JSON.stringify(dataUjian));

  window.location.href = "hasil.html";
}
