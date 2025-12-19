import { useState } from "react";
import { openWhatsApp } from "@/lib/utils";

export const useContactForm = (onSubmit?: () => void) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    package: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate WhatsApp message
    let interest = "Hajj and Umrah packages";
    if (formData.package === 'hajj') interest = "Hajj packages";
    if (formData.package === 'umrah') interest = "Umrah packages";
    if (formData.package === 'custom') interest = "a customized package";

    let message = `Assalamu Alaikum,\n\nI would like to inquire about your ${interest}.\n\n📋 *Contact Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nInterest: ${formData.package.charAt(0).toUpperCase() + formData.package.slice(1)}`;
    if (formData.message.trim()) {
      message += `\n\n💬 *Additional Message:*\n${formData.message}`;
    }
    message += `\n\nJazakAllah Khair for your assistance. Looking forward to your response.`;
    openWhatsApp(message);
    // Reset form
    setFormData({ name: "", phone: "", package: "", message: "" });
    // Call optional callback
    if (onSubmit) onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      package: value
    }));
  };

  return {
    formData,
    handleSubmit,
    handleChange,
    handleSelectChange,
  };
};