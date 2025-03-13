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
      localStorage.removeItem("adminId");
      localStorage.removeItem("user");
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
            <h1>Cara Menggunakan QnA Apps untuk Super Admin</h1>
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
                <p>7. Terakhir lakukan login aplikasi QnA Apps dengan username dan password yang telah dilakukan reset.</p><br />
                <strong><p style={{ textAlign: "center", color: "red" }}>-Menghubungkan Bot Chat-</p></strong>
                <p>1. Buka aplikasi QnA Apps di Browser.</p>
                <p>2. Login aplikasi dengan akun yang sudah terdaftar sebagai Super Admin.</p>
                <p>3. Pada halaman dashboard pilih menu "Hubungkan Perangkat Bot Chat". </p>
                <p>4. Pada halaman scan QR lakukan scan QR pada QR Code yang muncul dengan perangkat samrtphone melalui aplikasi whatsapp pada opsi perangkat tertaut. </p>
                <p>5. Tunggu hingga muncul pesan jika whatsapp telah terhubung.</p>
            </div>
        </div>
      </div>
      <div className="askquestion-container">
        <div className="formAskquestion">
            <div className="info">
                <h1>Cara Menggunakan QnA Apps untuk Admin Group</h1>
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
                <h1>Cara Menggunakan Chat Bot by WhatsApp Admin Group</h1>
                <strong><p style={{ textAlign: "center", color: "red"}}>-Membuat Link Pendaftaran untuk User-</p></strong>
                <p>1. Menginstruksikan kepada user untuk melakukan verifikasi nomor whatsapp terlebih dahulu dengan mengirim bot chat dengan cara mengetik : <strong>!verifikasi</strong></p>
                <p>2. Admin group mengirim bot chat dengan cara mengetik :          <strong>!buatlink</strong></p>
                <p>3. Setelah itu link pendaftaran akan dibuat oleh sistem untuk digunakan oleh user.</p><br />

                <strong><p style={{ textAlign: "center", color: "red"}}>-Mengaktifkan Sesi Tanya Jawab-</p></strong>
                <p>1. Untuk membuka sesi  tanya jawab admin bisa mengaktifkan sesi tanya jawabnya dengan mengirim bot chat dengan cara mengetik : <strong>!setSession aktif [durasi]</strong></p>
                <p>- Contoh : !setSession aktif 10 (artinya untuk durasi 10 menit). </p>
                <p>2. Sistem akan memberikan balasan jika sesi tanya jawab telah diaktifkan.</p><br />

                <strong><p style={{ textAlign: "center", color: "red"}}>-Nonaktifkan Sesi Tanya Jawab-</p></strong>
                <p>1. Untuk mengakhiri sesi  tanya jawab admin bisa menonaktifkan sesi tanya jawabnya dengan mengirim bot chat dengan cara mengetik : <strong>!setSession nonaktif</strong></p>
                <p>2. Sistem akan memberikan balasan jika sesi tanya jawab telah dinonaktifkan.</p><br />

                <strong><p style={{ textAlign: "center", color: "red"}}>-Memilih Narasumber dari Anggota Group-</p></strong>
                <p>1. Admin dapat memilih atau mengangkat anggota group menjadi narasumber dengan mengirim bot chat dengan cara mengetik : <strong>!setNarasumber @user</strong></p>
                <p>- Contoh : 1. !setNarasumber @(mention nama akun anggota group). </p>
                <p>- Contoh : 2. !setNarasumber @628xxxxxx. </p>
                <p>2. Sistem akan memberikan balasan jika narasumber berhasil ditambahkan.</p><br />

                <strong><p style={{ textAlign: "center", color: "red"}}>-Menghapus Narasumber dari Anggota Group-</p></strong>
                <p>1. Admin dapat menghapus status narasumber pada anggota group dengan mengirim bot chat dengan cara mengetik : <strong>!hapusNarasumber @user</strong></p>
                <p>- Contoh : 1. !hapusNarasumber @(mention nama akun anggota group). </p>
                <p>- Contoh : 2. !hapusNarasumber @628xxxxxx. </p>
                <p>2. Sistem akan memberikan balasan jika narasumber berhasil dihapus.</p><br />

                <strong><p style={{ textAlign: "center", color: "red"}}>-Menangani Pertanyaan Anggota Group pada Direct Message-</p></strong>
                <p>1. Admin dapat menangani pertanyaan yang dikirimkan langsung oleh anggota group melalui pesan langsung/japri dengan meneruskan pertanyaan kepada nomor Superadmin dengan mengirimkan pesan bot  : <strong>!forward @user [pertanyaan user]</strong></p>
                <p>- Contoh : 1. !hapusNarasumber @(mention nama akun anggota group) izin bertanya min boleh?. </p>
                <p>- Contoh : 2. !hapusNarasumber @628xxxxxx izin bertanya min boleh?. </p>
                <p>2. Admin group memilihkan narasumber yang dipilih oleh anggota group dengan mengetikan nomor narasumber yang dipilih</p>
                <p>3. Sistem akan memberikan balasan jika pertanyaan sedang diproses.</p>
            </div>
        </div>
      </div>

      <footer>Developed By : Setiaone Corps.</footer>
    </div>
  );
};

export default Bot;
