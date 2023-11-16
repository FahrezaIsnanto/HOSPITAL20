import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../component/Layout";
import "./DetailJadwalDokter.css";

export default function DetailJadwalDokter() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDetailJadwalDokter() {
      try {
        const response = await axios.get(
          "http://localhost:8021/jadwalDokter",
          {
            params: {
              id,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data[0]);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    async function fetchData() {
      setIsLoading(true);
      await fetchDetailJadwalDokter();
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="contentDetailJadwalDokter">
        <img
          src="/images/rocket.png"
          className="contentDetailJadwalDokterImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          <>
            <h1>Detail Jadwal Dokter</h1>
            <div className="cardDetailJadwalDokter">
              <table border="0" width="100%">
                <tr>
                  <td>Nama Dokter</td>
                  <td>:</td>
                  <td>{data.nama}</td>
                </tr>
                <tr>
                  <td>Poli</td>
                  <td>:</td>
                  <td>{data.nama_poli}</td>
                </tr>
                <tr>
                  <td>Hari</td>
                  <td>:</td>
                  <td>{data.hari}</td>
                </tr>
                <tr>
                  <td>Jam Pelayanan</td>
                  <td>:</td>
                  <td>{data.waktu}</td>
                </tr>
              </table>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
