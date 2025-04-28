
import InputField from "@/app/ui/InputField";
import ModalHeader from "@/app/ui/ModalHeader";
import { useState } from "react";

import { toast } from "react-toastify";

export function ResetPasswordToast({ open, setOpen }) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      toast.success("Password reset email sent!", { autoClose: 1000 });
      setEmail("");
      setOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div className="relative w-full max-w-2xl max-h-full  ">
        <div className="relative bg-white rounded shadow">
          <ModalHeader
            title="Forget Password?"
            action={() => setOpen(!open)} 
          />
          <ResetPasswordForm
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}

function ResetPasswordForm({ email, setEmail, handleSubmit, className }) {
  return (
      <div className={`${className} p-6`}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            required={true}
          />
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-gradient-2 p-2 rounded-lg mt-4 text-white outline-none border border-[#7073F3]"
          type="submit"
        >
          Submit
        </button>
      </div>
  );
}
