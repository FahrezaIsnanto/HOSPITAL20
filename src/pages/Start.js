import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import Input from "../component/Input";
import DateInput from "../component/DateInput";
import ButtonPrimary from "../component/ButtonPrimary";
import "./Start.css";
import Gap from "../component/Gap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {format} from 'date-fns';
import { AuthContext } from "../context/AuthContext";

export default function Start() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)

  const navigate = useNavigate();
  const [rekamMedis, setRekamMedis] = useState("");
  const [tglLahirDate, setTglLahirDate] = useState("");
  const [tglLahir, setTglLahir] = useState("");

  const handleChangeRekamMedis = (e) => setRekamMedis(e.target.value);
  const handleChangeTglLahirDate = (date) => {
    const formattedDate = format(date, 'dd-MM-yyy');
    setTglLahirDate(date)
    setTglLahir(formattedDate);
  };
  const handleCheckPasien = async () => {
    try {
      const response = await axios.get(
        "https://hospital20-api-rtfpcq2a4a-et.a.run.app/pasien",
        {
          params: {
            no_rm_pasien: rekamMedis,
            tgl_lahir_pasien: tglLahir,
          },
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data[0]);
        navigate("/pendaftaran");
      } else {
        console.log("data pasien tidak ditemukan");
      }
    } catch (err) {
      console.log("Terjadi kesalahan pada server");
    }
  };

  useEffect(() => {
    function validatePage(){
      if(isLoggedIn){
        navigate('/pendaftaran');
      }
    }
    validatePage();
  },[]);

  return (
    <Layout>
      <div className="contentStart">
        <img
          src="/images/rocket.png"
          className="contentStartImg"
          alt="rocket"
        ></img>
        <Input
          label="Nomor Rekam Medis"
          onChange={handleChangeRekamMedis}
        />
        <Gap height={15} />
        <DateInput
          label="Tanggal Lahir"
          selected={tglLahirDate} 
          onChange={handleChangeTglLahirDate} 
          dateFormat="dd-MM-yyyy" 
        />
        <Gap height={30} />
        <ButtonPrimary text="Cek" onClick={handleCheckPasien} />
      </div>
    </Layout>
  );
}
