"use client";

import UploadLayout from "@/app/layouts/UploadLayout";
import { UploadError } from "@/app/types";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { PiKnifeLight } from "react-icons/pi";

export default function Upload() {
  const [fileDisplay, setFileDisplay] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading] = useState<boolean>(false);
  const [error] = useState<UploadError | null>(null);

  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const discard = () => {
    setFileDisplay("");
    setFile(null);
    setCaption("");
  };

  const createNewPost = () => {
    console.log("TODO");
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

                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                    <p className="text-[11px] pl-1 truncate text-ellipsis">
                      {file ? file.name : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => clearVideo()}
                    className="text-[11px] ml-2 font-semibold"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 mb-6">
              <div className="flex bg-[#F8F8F8] py-4 px-6">
                <div>
                  <PiKnifeLight className="mr-4" size="20" />
                </div>
                <div>
                  <div className="text-semibold text-[15px] mb-1.5">
                    Divide videos and edit
                  </div>
                  <div className="text-semibold text-[13px] text-gray-400">
                    You can quickly divide videos into multiple parts, remove
                    redundant parts and turn landscape videos into portrait
                    videos
                  </div>
                </div>
                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                  <button className="px-8 py-1.5 text-white text-[15px] bg-[#EC8523] rounded-sm">
                    Edit
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Caption</div>
                  <div className="text-gray-400 text-[12px]">
                    {caption.length}/150
                  </div>
                </div>
                <input
                  maxLength={150}
                  type="text"
                  className="
                        w-full
                        border
                        p-2.5
                        rounded-md
                        focus:outline-none
                    "
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div>

              {/* Discard Button */}
              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                >
                  Discard
                </button>

                {/* Post Button */}
                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#EC8523] rounded-sm"
                >
                  {isUploading ? (
                    <BiLoaderCircle
                      className="animate-spin"
                      color="#ffffff"
                      size={25}
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>

              {error ? (
                <div className="text-red-600 mt-4">{error.message}</div>
              ) : null}
            </div>
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
