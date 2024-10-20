"use client"

import { useEffect, useState } from "react";
import CategorySearch from "./_components/CategorySearch";
import ClinicList from "./_components/ClinicList";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";
import CityList from "./_components/CityList";

const Home = () => {

  const [clinicList, setClinicList] = useState<any | null>(null);

  const getClinicList = () => {
    GlobalApi.getClinicAll().then(resp => {
      setClinicList(resp.data.data)
    })
  }

  useEffect(() => {
    getClinicList()
  },[])


  return (
    <div>
      <Header />
      <Hero />
      <CategorySearch />
      <CityList />
      <ClinicList clinicList={clinicList} />
    </div>
  );
}

export default Home;