import "./PasienCard.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";


export default function PasienCard({pasien}){
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        let text = "Apakah yakin Anda ingin keluar?.";
        if (window.confirm(text) == true) {
            setIsLoggedIn(false);
            navigate('/start');
        }
    };
   return ( <div className="pasienCard">
        <table border="0">
             <tr>
                <td>No RM</td>
                <td>:</td>
                <td>{pasien.no_rm_pasien}</td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{pasien.nama_pasien}</td>
            </tr>
            <tr>
                <td>Tanggal Lahir</td>
                <td>:</td>
                <td>{pasien.tgl_lahir_pasien}</td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{pasien.alamat_pasien}</td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>{pasien.jenis_kelamin_pasien}</td>
            </tr>
        </table>
        <div className="buttonLayout">
            <Link className="buttonPasienCard" to={'/riwayat_pendaftaran'}>Riwayat Pendaftaran</Link>
            <a onClick={handleLogout} className="buttonLogout">Logout</a>
        </div>
    </div>)
}