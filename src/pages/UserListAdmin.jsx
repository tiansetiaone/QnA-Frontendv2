import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig";

const UserListAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Ambil daftar user saat komponen dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data user.");
      }
    };
    fetchUsers();
  }, []);

  // Fungsi untuk mengirim OTP
  const sendOtp = async (whatsappNumber) => {
    try {
      const response = await axios.post("/otp/send", { whatsappNumber });
      setSuccessMessage(`OTP berhasil dikirim ke ${whatsappNumber}`);
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim OTP.");
    }
  };

  return (
    <div>
      <h1>Daftar User</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>WhatsApp</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.whatsapp_number}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => sendOtp(user.whatsapp_number)}>
                  Kirim OTP
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListAdmin;
