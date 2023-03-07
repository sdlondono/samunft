import CardComponent from "@/modules/home/components/Card.component";
import SearchComponent from "@/modules/home/components/Search.component";
import useGetAssets from "@/modules/home/hooks/useGetAssets";
import Head from "next/head";
import { useState } from "react";

function Home() {
  const { assets, getAssets, isLoading, error } = useGetAssets();
  return (
    <>
      <Head>
        <title>SamuNFT</title>
      </Head>
      <div className="md:flex flex-1 flex-col grid px-0 lg:px-60 py-4">
        <SearchComponent getAssets={getAssets} />
        {isLoading && (
          <div className="flex h-screen justify-center items-center my-4">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white" />
          </div>
        )}
        {Boolean(error.message) && (
          <div className="flex h-screen justify-center items-center my-4">
            <h1 className="text-2xl font-bold text-white">{error.message}</h1>
          </div>
        )}
        {!isLoading && !Boolean(error.message) && (
          <div className="grid sm:grid-cols-2 gap-5 mt-5 ">
            {assets.map((asset) => (
              <div key={asset.id}>
                <CardComponent {...asset} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
