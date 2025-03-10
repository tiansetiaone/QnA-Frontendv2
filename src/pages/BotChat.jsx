import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BotChat.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png";


const Bot = () => {
  const navigate = useNavigate();


  // Fungsi logout
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("group_id");
      localStorage.removeItem("is_narasumber");
      localStorage.removeItem("user_id");
      localStorage.removeItem("adminGroup");
      navigate("/");
    }
  };

  return (
    <div className="bot-question-container">
      <header className="bot-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Informasi</h1>
        </div>
        <div className="logout-btn-qna">
          <img
            src={icon9}
            alt="icon logoff"
            onClick={handleLogout}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            title="Logout"
          />
        </div>
      </header>
      <div className="askquestion-container">
        <div className="formAskquestion">
            <div className="info">
            <h1>Cara Menggunakan QnA Apps untuk Anggota Group</h1>
                <strong><p style={{ textAlign: "center", color: "red" }}>-Daftar Aplikasi-</p></strong>
                <p>1. Didalam group whatsapp, lakukan verifikasi nomor whatsapp terlebih dahulu dengan mengirimkan bot chat dengan cara mengetik : <strong>!verifikasi</strong></p>
                <p>2. Request kepada admin group untuk dibuatkan link pendaftaran.</p>
                <p>3. Setelah link registrasi berhasil dibuatkan, selanjutnya klik link registrasinya untuk langsung diarahkan ke halaman pendaftaran aplikasi.</p>
                <p>4. Masukan data registrasi seperti username, nomor whatsapp yang tergabung dalam group, password dan konfirmasi password. </p>
                <p>5. Terakhir klik atau tekan tombol daftar.</p><br />
                <strong><p style={{ textAlign: "center", color: "red" }}>-Login Aplikasi-</p></strong>
                <p>1. Buka aplikasi QnA Apps di Browser.</p>
                <p>2. Pada halaman Login masukan data username/no.whatsapp dan password yang telah terdaftar di aplikasi QnA Apps.</p>
                <p>3. Klik atau tekan tombol login. </p>
                <p>4. Selesai.</p><br />
                <strong><p style={{ textAlign: "center", color: "red"}}>-Reset / Lupa Password-</p></strong>
                <p>1. Pada halaman Login klik atau pilih opsi "Lupa Password?".</p>
                <p>2. Pada halaman Reset Password masukan nomor whatsapp yang digunakan untuk login.</p>
                <p>3. Klik atau tekan tombol kirim token. </p>
                <p>4. Tunggu hingga muncul pesan bahwa token berhasil terkirim ke nomor whatsapp yang telah diisikan.</p>
                <p>5. Cek nomor token pada pesan masuk di whatsapp dan salin atau isikan kolom kode token dengan nomor token yang telah didapatkan pada pesan masuk.</p>
                <p>6. Lalu masukkan password baru untuk memperbarui kode password yang akan digunakan.</p>
                <p>7. Terakhir lakukan login aplikasi QnA Apps dengan username dan password yang telah dilakukan reset.</p>
            </div>
        </div>
      </div>
      <div className="askquestion-container">
        <div className="formAskquestion">
            <div className="info">
                <h1>Cara Menggunakan Chat Bot by WhatsApp</h1>
                <p>1. Pastikan sesi tanya jawab telah diaktifkan oleh admin group.</p>
                <p>2. Mengirim pertanyaan bisa dilakukan baik melalui pesan langsung kepada admin group atau group Whatsapp dengan cara mengetikan pesan bot : <strong>!question [pertanyaan]</strong></p>
                <p>- Contoh : !question Tolong sebutkan nama penemu Tesla ? </p>
                <p>3. Jika pertanyaan yang dikirimkan menggunkan keyword group, maka sistem bot akan menampilkan beberapa pertanyaan serupa, namun jika pertanyaan tidak memiliki keyword maka pertanyaan akan langsung diarahkan kepada narasumber.</p>
                <p>4. Jika pada pertanyaan serupa yang ditampilkan, anggota group masih tetap ingin melanjutkan pertanyaan maka pertanyaan bisa dilanjutkan dengan cara mengirimkan pesan "lanjut"</p>
                <p>5. Selanjutnya akan diberikan balasan berupa list narasumber yang akan ditunjuk untuk menjawab pertanyaan</p>
                <p>6. Pilih narasumber yang dituju dengan mengirimkan pesan dengan mengetikan nomor dari narasumber yang dipilih </p>
                <p>7. Pesan selanjutnya akan langsung diproses untuk selanjutnya dijawab oleh narasumber.</p>
                <p>8. Pesan yang sudah dijawab oleh narasumber akan otomatis dikirimkan hasilnya melalui nomor whatsapp anggota group.</p>
            </div>
        </div>
      </div>

      <footer>Developed By : Setiaone Corps.</footer>
    </div>
  );
};

export default Bot;
