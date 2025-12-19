import { useState } from "react";
import { Check } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";
import { useConfig } from "@/contexts/ConfigContext";

const Packages = () => {
  const config = useConfig();
  const categories = config.packages.categories || [];
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

  const activeCategory = categories.find((c) => c.id === activeTab);
  const items = activeCategory?.items || [];

  const handleBookNow = (message: string) => {
    openWhatsApp(message);
  };

  return (
    <section id="packages" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-accent font-medium text-sm tracking-widest uppercase mb-4">
            {config.packages.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            {config.packages.mainHeading.pre} <span className="text-emerald">{config.packages.mainHeading.highlight}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {config.packages.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === category.id
                ? "bg-emerald text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-emerald/10 hover:text-emerald border border-gray-100"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((pkg: any, index: number) => (
            <div
              key={`${pkg.name}-${index}`}
              className={`relative bg-card rounded-3xl p-8 border border-border/50 hover:border-emerald/30 transition-all duration-300 hover:shadow-elevated flex flex-col ${pkg.featured ? "shadow-gold" : ""
                }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-md whitespace-nowrap">
                  Most Popular Choice
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg text-muted-foreground">From</span>
                  <span className="text-3xl font-bold text-emerald">{pkg.price}</span>
                </div>
                <div className="space-y-2 text-sm text-foreground/80 bg-background/50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure:</span>
                    <span className="font-medium">{pkg.departure}</span>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{pkg.zone}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-emerald flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBookNow(pkg.whatsappMessage)}
                className="w-full py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] bg-emerald text-white hover:bg-emerald-dark shadow-gold"
              >
                Book This Package
              </button>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">{config.packages.customPackage.text}</p>
          <button
            onClick={() => handleBookNow(config.general.whatsapp.defaultMessage)}
            className="text-emerald hover:text-emerald-dark font-medium underline underline-offset-4 decoration-2 transition-colors"
          >
            {config.packages.customPackage.linkText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
