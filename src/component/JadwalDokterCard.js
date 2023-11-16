import "./JadwalDokterCard.css"
import { Link } from "react-router-dom";

export default function JadwalDokterCard({jadwal}){
   return ( <div className="jadwalDokterCard">
        <table border="0">
             <tr>
                <td>Nama Dokter</td>
                <td>:</td>
                <td>{jadwal.nama}</td>
            </tr>
            <tr>
                <td>Hari</td>
                <td>:</td>
                <td>{jadwal.hari}</td>
            </tr>
            <tr>
                <td>Jam Pelayanan</td>
                <td>:</td>
                <td>{jadwal.waktu}</td>
            </tr>
        </table>
        <Link className="buttonJadwalDokterCard" to={'/detail_jadwal_dokter/'+jadwal.id}>Detail Jadwal Dokter</Link>
    </div>)
}