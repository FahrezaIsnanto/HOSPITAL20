import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Layout from "../component/Layout";
import PasienCard from "../component/PasienCard";
import Select from "../component/Select";
import Input from "../component/Input";
import DateInput from "../component/DateInput";
import Gap from "../component/Gap";
import ButtonPrimary from "../component/ButtonPrimary";
import "./Pendaftaran.css";
import axios from "axios";
import {format} from 'date-fns';
import { AuthContext } from "../context/AuthContext";

export default function Pendaftaran() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [dataPasien, setDataPasien] = useState(null);
  const [dataPoli, setDataPoli] = useState(null);
  const [dataJadwalDokter, setDataJadwalDokter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // form
  const [poli, setPoli] = useState("");
  const [tglPeriksaDate, setTglPeriksaDate] = useState("");
  const [dokter, setDokter] = useState("");

  const handleChangePoli = (e) => setPoli(e.target.value);
  const handleChangeTglPeriksaDate = async (date) => {
    setTglPeriksaDate(date);
    const dateVal = format(date, 'dd-MM-yyyy');
    const sqlDateFormat = dateVal.split("-").reverse().join("-");
    if (sqlDateFormat.length === 10 && poli) {
      const dateNum = new Date(sqlDateFormat).getDay();
      await fetchJadwalDokter(poli, dateNum);
    }
  };
  const handleChangeDokter = (e) => setDokter(e.target.value);
  const handleDaftar = async () => {
    const id = nanoid();
    const nama_pasien = dataPasien.nama_pasien;
    try {
      const response = await axios.post(
        "https://hospital20-api-rtfpcq2a4a-et.a.run.app/pendaftaran",
        {
          id,
          no_rm_pasien: user.no_rm_pasien,
          nama_pasien,
          poli,
          tglPeriksa : format(tglPeriksaDate, 'dd-MM-yyyy'),
          dokter,
        }
      );
      if (response.status === 201) {
        console.log("status pendaftaran", response.data);
        navigate("/finish/" + id);
      }
    } catch (err) {
      console.log("err", err.response.data);
    }
  };

  const fetchJadwalDokter = async (nama_poli, id_hari) => {
    try {
      const response = await axios.get(
        "https://hospital20-api-rtfpcq2a4a-et.a.run.app/jadwalDokter",
        {
          params: {
            nama_poli,
            id_hari,
          },
        }
      );
      if (response.status === 200) {
        setDataJadwalDokter(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    function validatePage(){
      if(!isLoggedIn){
        navigate('/start');
      }
    }
    function fetchPasien() {
      setDataPasien(user);
    }

    async function fetchPoli() {
      try {
        const response = await axios.get(
          "https://hospital20-api-rtfpcq2a4a-et.a.run.app/poli"
        );
        if (response.status === 200) {
          setDataPoli(response.data);
        }
      } catch (err) {
        console.log("err", err);
      }
    }

    async function fetchData() {
      setIsLoading(true);
      fetchPasien();
      await fetchPoli();
      setIsLoading(false);
    }
    validatePage();
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="contentPendaftaran">
        <img
          src="/images/rocket.png"
          className="contentPendaftaranImg"
          alt="rocket"
        ></img>
        {isLoading ? (
          <p>Harap Tunggu..</p>
        ) : (
          <>
            <PasienCard pasien={dataPasien} />
            <Gap height={25} />
            <Select
              label="Poli"
              option={dataPoli}
              onChange={handleChangePoli}
            />
            <Gap height={15} />
            <DateInput
              label="Tanggal Periksa"
              selected={tglPeriksaDate} 
              onChange={handleChangeTglPeriksaDate} 
              dateFormat="dd-MM-yyyy" 
            />
            <Gap height={15} />
            <Select
              label="Dokter"
              option={dataJadwalDokter}
              onChange={handleChangeDokter}
            />
            <Gap height={15} />
            <ButtonPrimary text="Daftar" onClick={handleDaftar} />
            <Gap height={50} />
          </>
        )}
      </div>
    </Layout>
  );
}
