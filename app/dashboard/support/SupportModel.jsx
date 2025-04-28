import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import InputFiledLabel from "../(dashboard_Component)/InputFiledLabel";

function SupportModel({ isModalOpen, setIsModalOpen, user, setRender }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    subject: "",
    message: "",
  });

  const handleImageChange = async (event) => {
    setLoading(true);
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
              Authorization: `Bearer ${Cookies.get("auth_token_font")}`,
            },
          }
        );
        const fileUrls = response?.data?.file_urls;
        setUploadImages((prevFiles) => [...prevFiles, ...fileUrls]);
      } catch (error) {
        // console.error(error);
      }
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setUploadImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const newErrors = {};
    if (!subject?.trim()) newErrors.subject = "Subject is required";
    if (!message?.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("type", "Payment Gateway");
    formData.append("user_avatar", user?.avatar);
    formData.append("status", "open");

    formData.append("subject", subject);
    formData.append("message", message);
    if (uploadImages) {
      formData.append("image", JSON.stringify(uploadImages));
    }

    const token = Cookies.get("auth_token_font");

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/tickets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response?.status === 201) {
          setIsModalOpen(false);
          toast.success("Ticket Added  Successfully");
          setRender(true);
          setMessage("");
          setSubject("");
          setUploadImages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to Add Tacket");
        setLoading(false);
      });
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
          <div className="relative w-full max-w-2xl max-h-full  ">
            <div className="relative p-10 bg-white rounded-[4px] shadow">
              <div className="space-y-5 text-black text-size">
                <div className="absolute top-2 right-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="p-1 rounded-full text-2xl bg-red-500 cursor-pointer hover:bg-red-600 text-white"
                  >
                    <IoClose />
                  </button>
                </div>

                <InputFiledLabel
                  value={subject}
                  onChange={setSubject}
                  placeholder="Subject"
                  label="Subject"
                  errors={errors.subject}
                  required={true}
                  type="text"
                  id="subject"
                />
                <InputFiledLabel
                  value={message}
                  onChange={setMessage}
                  placeholder="Message"
                  label="Message"
                  errors={errors.message}
                  required={true}
                  type="textarea"
                  id="message"
                />
                <InputFiledLabel
                  onChange={handleImageChange}
                  placeholder="Upload Images"
                  label="Upload Images"
                  type="file"
                  id="image"
                />

                {Array.isArray(uploadImages) && uploadImages?.length > 0 && (
                  <div className="mt-1">
                    <div className="flex gap-2 flex-wrap mt-2">
                      {uploadImages?.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 border border-gray-300 p-3 rounded-md overflow-hidden"
                        >
                          <Image
                            src={file}
                            width={10000}
                            height={10000}
                            alt="Preview"
                            className="w-32  object-fill rounded"
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

                <div className="items-center">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className=" bg-gradient-2 cursor-pointer text-white w-full py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportModel;
