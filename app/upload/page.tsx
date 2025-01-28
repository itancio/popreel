"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UploadError } from "@/app/types";
import UploadLayout from "@/app/layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";

export default function Upload() {
  const clearVideo = () => {
    console.log("clearVideo");
  };

  const [fileDisplay, setFileDisplay] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          {/* Title */}
          <div>
            <h1 className="text-[23px] font-semibold">Upload video</h1>
            <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
          </div>

          {/* Video Upload */}
          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="
                    md:mx-0
                    mx-auto
                    mt-4
                    mb-6
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    w-full 
                    max-w-[260px] 
                    h-[470px] 
                    text-center 
                    p-3 
                    border-2 
                    border-dashed 
                    border-gray-300 
                    rounded-lg 
                    hover:bg-gray-100 
                    cursor-pointer
                "
              >
                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                <p className="mt-4 text-[17px]">Select video to upload</p>
                <p className="mt-1.5 text-gray-500 text-[13px]">
                  Or drag and drop a file
                </p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </p>
                <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#EC8523] rounded-sm cursor-pointer"
                >
                  Select file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={uploadHandler}
                  hidden
                  accept=".mp4"
                />
              </label>
            ) : (
              <div
                className="
                    md:mx-0
                    mx-auto
                    mt-4
                    md:mb-12
                    mb-16
                    flex 
                    items-center 
                    justify-center 
                    w-full 
                    max-w-[260px] 
                    h-[540px] 
                    p-3 
                    rounded-2xl
                    cursor-pointer
                    relative
                "
              >
                {!isUploading ? (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#EC8523"
                        size={30}
                      />
                      <div className="text-white font-bold">Uploading...</div>
                    </div>
                  </div>
                ) : null}

                <Image
                  alt="upload video"
                  className="absolute z-20 pointer-events-none"
                  src="/images/mobile-case.png"
                  width={540}
                  height={540}
                />
                <Image
                  alt="upload video"
                  className="absolute right-4 bottom-6 z-20"
                  width={96}
                  height={96}
                  src="/images/popreel-logo.gif"
                />
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                  src={fileDisplay}
                />
              </div>
            )}
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
