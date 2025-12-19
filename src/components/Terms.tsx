import { useState } from "react";
import { useConfig } from "@/contexts/ConfigContext";

const Terms = () => {
    const config = useConfig();
    const categories = config.terms?.categories || [];
    const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

    const activeCategory = categories.find((c) => c.id === activeTab);

    if (!config.terms) return null;

    return (
        <section id="terms" className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-all duration-300 border-2 ${activeTab === category.id
                                    ? "bg-emerald text-white border-emerald shadow-lg scale-110"
                                    : "bg-surface text-muted-foreground border-border hover:border-emerald/50 hover:text-emerald"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8 tracking-tight">
                        {config.terms.sectionTitle}
                    </h2>

                    <div className="mb-12">
                        <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
                            <span className="font-arabic font-bold block mb-4 text-5xl md:text-6xl">{config.terms.thankYou.arabic}</span>
                            <span className="text-muted-foreground text-xl md:text-2xl font-sans font-normal">{config.terms.thankYou.english}</span>
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2">
                        {activeCategory?.content.map((item: any, index: number) => (
                            <div key={index} className="bg-card p-6 rounded-2xl border border-border/50 hover:shadow-md transition-shadow">
                                <h4 className="text-lg font-serif font-semibold text-emerald mb-3">{item.title}</h4>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-muted-foreground mt-12 text-sm italic">
                        {config.terms.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Terms;
