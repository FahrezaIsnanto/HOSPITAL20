import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gap from "../component/Gap";
import Layout from "../component/Layout";
import RiwayatCard from "../component/RiwayatCard";
import "./RiwayatPendaftaran.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RiwayatPendaftaran() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    function validatePage(){
      if(!isLoggedIn){
        navigate('/start');
      }
    }
    validatePage();
    async function fetchRiwayatPendaftaran() {
      try {
        const response = await axios.get(
          "http://localhost:8021/pendaftaran",
          {
            params: {
              no_rm_pasien: user.no_rm_pasien,
            },
          }
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
      await fetchRiwayatPendaftaran();
      setIsLoading(false);
    }
    validatePage();
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="contentRiwayatPendaftaran">
        <img
          src="/images/rocket.png"
          className="contentRiwayatPendaftaranImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          data.map(function (item, index) {
            return (
              <div key={index}>
                <Gap height={15} />
                <RiwayatCard riwayat={item} />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
