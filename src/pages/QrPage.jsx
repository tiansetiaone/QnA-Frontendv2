import React, { useEffect, useState, useCallback } from 'react';  
import axios from 'axios';  
import axiosInstance from "../services/axiosConfig"; // Pastikan import dari file axiosConfig.js
import { useNavigate } from 'react-router-dom';  
import { QRCodeCanvas } from 'qrcode.react';  

function QrPage() {  
  const [qrCode, setQrCode] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [connected, setConnected] = useState(false);  
  const [botReady, setBotReady] = useState(false);  
  const [notification, setNotification] = useState('');  
  const [backendStatus, setBackendStatus] = useState(true);
  const navigate = useNavigate();  

  // Fetch QR Code from the server  
  const fetchQrCode = useCallback(async () => {  
    setLoading(true);  
    try {  
      const response = await axiosInstance.get('/get-qr'); // Pakai axiosInstance  
      console.log("API Response:", response.data);  
  
      setBackendStatus(true);  
      if (response.data.connected) {  
        setConnected(true);  
        setNotification('Bot WhatsApp sedang terhubung, mengalihkan ke halaman login...');  
        setQrCode(null);  
      } else if (response.data.notAdmin) {  
        setNotification('Nomor yang digunakan bukan admin. Silakan hubungi admin untuk akses.');  
        setQrCode(null);  
      } else if (response.data.currentQRCode) {  
        console.log("QR Code Received:", response.data.currentQRCode); // Debugging
        setQrCode(response.data.currentQRCode);  
        setNotification('');  
        setConnected(false);  
      } else {  
        setQrCode(null);  
        setError('QR Code belum tersedia di server, coba lakukan refresh halaman.');  
      }  
    } catch (err) {  
      console.error('Error fetching QR Code:', err.message);  
      setBackendStatus(false);  
      setError('Backend tidak aktif, coba lagi nanti.');  
    } finally {  
      setLoading(false);  
    }  
  }, []);  

  // Check Bot status and connection  
  const checkBotStatus = useCallback(async () => {  
    try {  
      const response = await axios.get('/api/bot-status');  
      setBackendStatus(true);  
      const { ready, connected } = response.data;  
      setBotReady(!!ready);  
      setConnected(!!connected);  

      if (ready && connected) {  
        setNotification('Bot WhatsApp sedang terhubung, mengalihkan ke halaman login...');  
        setTimeout(() => {  
          navigate('/admin');  
        }, 2000);  
      }  
    } catch (err) {  
      console.error('Error checking bot status:', err.message);  
      setBackendStatus(false);  
    }  
  }, [navigate]);  

  // Polling for QR Code and Bot Status  
  useEffect(() => {
    console.log("Checking bot status...");
    fetchQrCode();
    checkBotStatus();
  
    const interval = setInterval(() => {
      console.log("Refreshing QR status...");
      fetchQrCode();
      checkBotStatus();
    }, 10000);
  
    return () => clearInterval(interval);
  }, [fetchQrCode, checkBotStatus]);
  

    // Tambahkan delay sebelum navigasi ke halaman login
    useEffect(() => {
      if (connected) {
          console.log("✅ Bot terhubung, mengalihkan ke halaman login...");

          // Tunggu 5 detik sebelum navigasi ke halaman login
          const timeout = setTimeout(() => {
              navigate("/"); // Sesuaikan dengan path login
          }, 2000);

          return () => clearTimeout(timeout);
      }
  }, [connected, navigate]);

  return (  
    <div style={{ textAlign: 'center', marginTop: '50px' }}>  
      <h1>WhatsApp QR Code</h1>  
      {!backendStatus ? (  
        <p style={{ color: 'red' }}>Backend tidak terhubung. Menunggu koneksi...</p>  
      ) : loading ? (  
        <p>Memuat QR Code...</p>  
      ) : error ? (  
        <p style={{ color: 'red' }}>{error}</p>  
      ) : notification ? (  
        <p style={{ color: 'green' }}>{notification}</p>  
      ) : connected ? (  
        <p style={{ color: 'green' }}>  
          WhatsApp sudah terhubung. Mengarahkan ke dashboard...  
        </p>  
      ) : botReady ? (  
        <p style={{ color: 'green' }}>  
          Bot sudah siap. Mengarahkan ke dashboard...  
        </p>  
      ) : qrCode ? (  
        <div>  
          <QRCodeCanvas  
            value={qrCode}  
            size={256}  
            level="M"  
            includeMargin={true}  
          />  
          <h4>Jika QR Code berhasil masuk di WhatsApp, tunggu 5 menit untuk waktu autentikasi akun.</h4>  
        </div>  
      ) : (  
        <p>QR Code tidak tersedia, tunggu beberapa saat atau muat ulang halaman!</p>  
      )}  
    </div>  
  );  
}  

export default QrPage;