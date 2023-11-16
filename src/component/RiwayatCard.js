import "./RiwayatCard.css"
import { Link } from "react-router-dom";
export default function RiwayatCard({riwayat}){
   return ( <div className="riwayatCard">
        <table border="0">
             <tr>
                <td>Tanggal Periksa</td>
                <td>:</td>
                <td>{riwayat.tglPeriksa}</td>
            </tr>
            <tr>
                <td>Poli</td>
                <td>:</td>
                <td>{riwayat.poli}</td>
            </tr>
            <tr>
                <td>Dokter</td>
                <td>:</td>
                <td>{riwayat.dokter}</td>
            </tr>
        </table>
        <Link className="buttonRiwayatCard" to={'/finish/'+riwayat.id}>Lihat Bukti</Link>
    </div>)
}