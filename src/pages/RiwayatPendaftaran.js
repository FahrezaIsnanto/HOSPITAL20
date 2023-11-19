import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gap from "../component/Gap";
import Layout from "../component/Layout";
import RiwayatCard from "../component/RiwayatCard";
import "./RiwayatPendaftaran.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadSessFromStorage } from "../helper/LoadSessFromStorage";

export default function RiwayatPendaftaran() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchRiwayatPendaftaran() {
      try {
        setIsLoading(true);
        if(user.no_rm_pasien){
          const response = await axios.get(
            "https://hospital20-api-rtfpcq2a4a-et.a.run.app/pendaftaran",
            {
              params: {
                no_rm_pasien: user.no_rm_pasien,
              },
            }
          );
          if (response.status === 200) {
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchRiwayatPendaftaran();
  }, [isLoggedIn]);

  useEffect(function(){
    function validatePage(){
        const sessionStorage = LoadSessFromStorage();
        var isStorageExists = false;
        var pathName = window.location.pathname;

        if (!isLoggedIn) {
          if(sessionStorage){
            setIsLoggedIn(sessionStorage.isLoggedIn);
            setUser(JSON.parse(sessionStorage.user));
            isStorageExists = true;
          }
        }
      
        if (pathName != "/" && pathName != "/start") {
          if (!isLoggedIn && !isStorageExists) {
            window.location.href = "/start";
          }
        } else {
          if (isLoggedIn || isStorageExists) {
            window.location.href = "/pendaftaran";
          }
      }
    }
    validatePage();
},[]);

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
