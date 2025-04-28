"use client";
import Button from "@/app/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card";
import InputField from "@/app/ui/InputField";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CardWithForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (!address) newErrors.address = "Address is required";
    if (!message) newErrors.message = "Message is required";

    // Validate phone number (only digits, 10-15 characters)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number. Must be 10-15 digits.";
    }

    // Validate email format
    if (email && !validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    const formData = {
      name,
      email,
      phone,
      address,
      message,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/contact`,
        formData
      );
      toast.success("Form submitted successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit form.");
    }
    setLoading(false);
  };

  const cancel = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setMessage("");
  };

  return (
    <Card className="w-full mx-auto transition duration-300 hover:shadow-lg border border-gray-200 hover:bg-gray-50">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4 ">
          <InputField
            id="name"
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Full Name"
          />
          <InputField
            id="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Email Address"
            type="email"
            required={true}
            error={errors.email}
          />
          <InputField
            id="phone"
            label="Phone"
            value={phone}
            onChange={setPhone}
            placeholder="Active Phone Number"
            required={true}
            error={errors.phone}
          />
          <InputField
            id="address"
            label="Address"
            value={address}
            onChange={setAddress}
            placeholder="Specific Address"
          />
          <InputField
            type="textarea"
            id="message"
            label="Message"
            value={message}
            onChange={setMessage}
            placeholder="Your Message"
            required={true}
            error={errors.message}
          />
        </div>
        <CardFooter className="flex items-center gap-2 mt-5 w-full pb-0 px-0">
          <Button
            cssClass="cursor-pointer bg-red-500 w-full"
            text="Cancel"
            onclickFunction={cancel}
          />
          <Button
            cssClass="cursor-pointer bg-gradient-2 w-full"
            text="Send"
            onclickFunction={handleSubmit}
            loading={loading}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
