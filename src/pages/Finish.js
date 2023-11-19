import "./Finish.css";
import Layout from "../component/Layout";
import BuktiCard from "../component/BuktiCard";
import LinkPrimary from "../component/LinkPrimary";
import Gap from "../component/Gap";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../component/ButtonPrimary";

export default function Finish() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = () => {
    let text = "Apakah yakin Anda ingin keluar?.";
    if (window.confirm(text) == true) {
        setIsLoggedIn(false);
        navigate('/start');
    }
};
  useEffect(() => {
    function validatePage(){
      if(!isLoggedIn){
        navigate('/start');
      }
    }
    async function fetchPendaftaran() {
      try {
        const response = await axios.get(
          "https://hospital20-api-rtfpcq2a4a-et.a.run.app/pendaftaran",
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
      await fetchPendaftaran();
      setIsLoading(false);
    }
    validatePage();
    fetchData();
  }, [id]);
  return (
    <Layout>
      <div className="contentFinish">
        <img
          src="/images/rocket.png"
          className="contentFinishImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          <>
            <BuktiCard data={data} />
            <Gap height={20} />
            <p className="contentFinishBody">
              Simpan hasil bukti pendaftaran tersebut untuk melakukan check-in
              pada zahospital sesuai dengan tanggal periksa yang sudah
              ditentukan
            </p>
            <ButtonPrimary text="Halaman Utama" onClick={handleLogout}/>
            <Gap height={30} />
          </>
        )}
      </div>
    </Layout>
  );
}
