import { useConfig } from "@/contexts/ConfigContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/hooks/useContactForm";

interface ContactFormProps {
  onSubmit?: () => void;
  className?: string;
}

const ContactForm = ({ onSubmit, className }: ContactFormProps) => {
  const { formData, handleSubmit, handleChange, handleSelectChange } = useContactForm(onSubmit);
  const config = useConfig();
  const formConfig = config.contact.form;

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{formConfig.nameLabel}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={formConfig.namePlaceholder}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">{formConfig.phoneLabel}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={formConfig.phonePlaceholder}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="package">{formConfig.packageLabel}</Label>
        <Select value={formData.package} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder={formConfig.packagePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {formConfig.packages.map((pkg: any) => (
              <SelectItem key={pkg.value} value={pkg.value}>
                {pkg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">{formConfig.messageLabel}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={formConfig.messagePlaceholder}
        />
      </div>

      <Button type="submit" className="w-full">
        {formConfig.submitButton}
      </Button>
    </form>
  );
};

export default ContactForm;
