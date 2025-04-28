"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SupportView({ supportReplyMessage, setSupportReplyMessage }) {
  const [loading, setLoading] = useState(false);

  const [replayMessage, setReplayMessage] = useState("");

  const [uploadImages, setUploadImages] = useState([]);

  const token = Cookies.get("auth_token_font");
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      const formData = new FormData();
      if (files) {
        files.forEach((file) => {
          formData.append("files[]", file);
        });
      }
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fileUrls = response.data.file_urls;
        setUploadImages((prevFiles) => [...prevFiles, ...fileUrls]);
      } catch (error) {
        // console.error(error);
      }
    }
  };
  const removeFile = (index) => {
    setUploadImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  // handel added reply post
  const handleSupportReplyMessage = (item) => {
    // Validation
    const newErrors = {};
    if (!replayMessage.trim()) {
      newErrors.replayMessage = "Message is required";
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("ticket_id", item.track_id);
    formData.append("user_id", item.user_id);
    formData.append("message", replayMessage);
    if (uploadImages) {
      formData.append("attachment_image", JSON.stringify(uploadImages));
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/add_reply/${item.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response?.status === 201) {
          setReplayMessage("");
          fetchData();
          setLoading(false);
          setErrors({});
          toast.success("Replay Message Added success");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to add replay message");
      });
  };

  // handle get reply

  const [replyMessage, setReplyMessage] = useState([]);

  useEffect(() => {
    if (!supportReplyMessage?.id) return;
    fetchData();
  }, [supportReplyMessage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/tickets/${supportReplyMessage?.id}/replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        setReplyMessage(response?.data);
      }
    } catch (error) {}
  };

  const [errors, setErrors] = useState({
    replayMessage: "",
  });
  return (
    <>
      {supportReplyMessage && (
        <div
          id="popup-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/30 bg-opacity-50 "
        >
          <div className="relative md:p-4 w-full max-w-3xl  overflow-y-scroll  max-h-[80vh]   md:max-h-[90vh]  bg-white  rounded-[4px] shadow mb-10 md:mb-0">
            <div className="relative">
              <div className="p-4 pr-10 md:p-5 ">
                <div className="flex gap-3">
                  <div className="w-8 lg:w-[5%] h-8 border border-gray-200  rounded-full overflow-hidden  flex items-center justify-center">
                    {supportReplyMessage?.user?.user_avatar ? (
                      <Image
                        key={supportReplyMessage?.user?.user_avatar}
                        width={10000}
                        height={10000}
                        src={supportReplyMessage?.user?.user_avatar}
                        alt={`attachment`}
                        className="w-full  object-fill "
                        priority={100}
                        loading="lazy"
                      />
                    ) : (
                      <h2 className="text-lg font-bold">
                        {supportReplyMessage?.user?.name
                          .slice(0, 1)
                          .toUpperCase()}
                      </h2>
                    )}
                  </div>
                  <div className="w-[95%]">
                    <h2>{supportReplyMessage?.name}</h2>
                    <h2>Subject : {supportReplyMessage?.subject}</h2>
                    <h2 className="mb-5">
                      Message : {supportReplyMessage?.message}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {supportReplyMessage?.image &&
                        JSON.parse(supportReplyMessage?.image)?.map(
                          (imageUrl, imageIndex) => (
                            <div
                              key={imageIndex}
                              className="w-full p-2 border border-gray-300 rounded"
                            >
                              <Image
                                width={10000}
                                height={10000}
                                src={imageUrl}
                                alt={`attachment`}
                                className="w-full object-fill"
                                loading="lazy" // only keep this
                              />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
                {Array.isArray(replyMessage) &&
                  replyMessage?.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 mt-3 bg-slate-50 p-3 rounded-[4px]"
                    >
                      <div className="w-8  h-8 border border-gray-200  rounded-full  overflow-hidden flex items-center justify-center">
                        {item?.user?.avatar ? (
                          <Image
                            width={10000}
                            height={10000}
                            src={item?.user?.avatar}
                            alt='attachment'
                            className="w-full object-fill"
                            loading="lazy"
                          />
                        ) : (
                          <h2 className="text-lg font-bold">
                            {item?.user?.name.slice(0, 1)}
                          </h2>
                        )}
                      </div>
                      <div className="w-full">
                        <h2>{item?.user?.name}</h2>
                        <h2>{item?.message}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {item?.attachment_image &&
                            JSON.parse(item?.attachment_image)?.map(
                              (imageUrl, imageIndex) => (
                                <div
                                  key={imageIndex}
                                  className="w-full p-2 border border-gray-300 rounded"
                                >
                                  <Image
                                    width={10000}
                                    height={10000}
                                    src={imageUrl}
                                    alt={`attachment`}
                                    className="w-full object-fill"
                                    loading="lazy" // only keep this
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="mt-3">
                  <label htmlFor="message" className="block my-1">
                    Replay Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    onChange={(e) => {
                      setReplayMessage(e.target.value);
                      setErrors((prev) => ({ ...prev, replayMessage: "" }));
                    }}
                    value={replayMessage}
                    id="message"
                    rows="8"
                    name="description"
                    className={`block p-2.5 w-full text-size text-gray-900 rounded-[4px] border ${
                      errors.replayMessage
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Write your message..."
                  ></textarea>
                  {errors.replayMessage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.replayMessage}
                    </p>
                  )}
                </div>
                <h2 className="block my-1 mt-3">Choose File</h2>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="block w-full text-size text-gray-900 border border-gray-300 rounded-[4px] cursor-pointer bg-gray-50 focus:outline-none "
                  type="file"
                  multiple
                />
                {Array.isArray(uploadImages) && uploadImages?.length > 0 && (
                  <div className="mt-1">
                    <div className="flex gap-2 flex-wrap mt-2">
                      {uploadImages?.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 border rounded-md overflow-hidden"
                        >
                          <Image
                            src={file}
                            width={10000}
                            height={10000}
                            alt="Preview"
                            className="w-32  object-fill rounded shadow"
                            loading="lazy"
                          />
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-5">
                  <button
                    onClick={() =>
                      handleSupportReplyMessage(supportReplyMessage)
                    }
                    type="button"
                    className="text-white bg-gradient-to-r from-[#395BEF] to-[#5C28D5] focus:outline-none font-medium rounded-[4px] text-size  inline-flex items-center px-5 py-2.5 text-center"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : <>Send</>}
                  </button>
                  <button
                    onClick={() => setSupportReplyMessage("")}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-size  font-medium focus:outline-none  rounded-[4px] border bg-red-500 hover:bg-red-600 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SupportView;
