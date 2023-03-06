import Image from "next/image";
import { useState } from "react";
import useGetOwnersByAsset from "../hooks/useGetOwnersByAsset";

const resizeImage =
  "https://res.cloudinary.com/marcba/image/fetch/f_webp,q_60,w_640,h_427";

const notFoundImage =
  "https://res.cloudinary.com/ddv6amwz9/image/upload/v1678138109/b6hjzxtm6ngurl7lvdxp.png";

const openseaURL = "https://opensea.io/assets";

type ModalComponetProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  description: string;
  image_url: string;
  username?: string;
  address?: string;
  total_price?: string;
  tokenId: string;
  assetContractAddress: string;
};

const ModalComponet: React.FC<ModalComponetProps> = ({
  setIsShow,
  name,
  description,
  image_url,
  username,
  address,
  tokenId,
  assetContractAddress,
}) => {
  const [isImageError, setIsImageError] = useState(false);
  const imgSrc = `${resizeImage}/${isImageError ? notFoundImage : image_url}`;
  const { owners, isLoading } = useGetOwnersByAsset(
    tokenId,
    assetContractAddress
  );
  const openseaLink = `${openseaURL}/${assetContractAddress}/${tokenId}`;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto mt-auto mb-12 mx-auto max-w-lg">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-700 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{name}</h3>
              <button onClick={() => setIsShow(false)}>
                <span className="text-white text-3xl hover:text-red-500">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <Image
                onError={() => setIsImageError(true)}
                width={640}
                height={427}
                src={imgSrc}
                alt="NTF Image"
              />
              {isLoading && owners ? (
                <div className="flex justify-center items-center my-4">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white" />
                </div>
              ) : (
                <div>
                  <h4 className="text-white font-bold text-2xl mt-3">
                    {owners[0]?.owner.user.username}
                  </h4>
                  <h5 className="text-slate-300 font-bold text-lg">
                    {owners[0]?.owner.address}
                  </h5>
                </div>
              )}

              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {description}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-700 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setIsShow(false)}
              >
                Close
              </button>
              <a
                href={openseaLink}
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => setIsShow(false)}
              >
                Purchase
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalComponet;
