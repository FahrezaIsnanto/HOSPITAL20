import axios from "axios";
import { useEffect, useState } from "react";
import Gap from "../component/Gap";
import JadwalDokterCard from "../component/JadwalDokterCard";
import Layout from "../component/Layout";
import "./JadwalDokter.css";

export default function JadwalDokter() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJadwalDokter() {
      try {
        const response = await axios.get(
          "http://localhost:8021/jadwalDokter"
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    async function fetchData() {
      setIsLoading(true);
      await fetchJadwalDokter();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="contentJadwalDokter">
        <img
          src="/images/rocket.png"
          className="contentJadwalDokterImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          data.map(function (item, index) {
            return (
              <div key={index}>
                <Gap height={15} />
                <JadwalDokterCard jadwal={item} />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
