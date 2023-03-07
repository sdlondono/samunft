import Image from "next/image";
import { useState } from "react";
import { notFoundImage, resizeImage } from "../constants";
import { Asset } from "../types";
import ModalComponet from "./Modal.component";

type CardComponentProps = Asset;

const CardComponent: React.FC<CardComponentProps> = ({
  image_url,
  name,
  description,
  token_id,
  asset_contract,
}) => {
  const [isImageError, setIsImageError] = useState(false);
  const imgSrc = `${resizeImage}/${isImageError ? notFoundImage : image_url}`;
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <div className="max-w-lg p-6 border rounded-lg hover:border-green-500 hover:scale-105 transation duration-150 shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image
            className="rounded-t-lg"
            src={imgSrc}
            onError={() => setIsImageError(true)}
            alt="Nft image"
            height={200}
            width={500}
          />
        </a>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight overflow-hidden whitespace-nowrap text-ellipsis my-3 text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal overflow-hidden whitespace-nowrap text-ellipsis text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <button
          onClick={() => setIsShowModal(true)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      {isShowModal && (
        <ModalComponet
          setIsShow={setIsShowModal}
          name={name}
          description={description}
          image_url={image_url}
          tokenId={token_id}
          assetContractAddress={asset_contract.address}
        />
      )}
    </>
  );
};

export default CardComponent;
