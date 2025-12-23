import { useState } from "react";
import { useConfig } from "@/contexts/ConfigContext";
import { X, ZoomIn } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const Gallery = () => {
  const config = useConfig();
  // Ensure categories exist, fallback to empty array if config is loading or malformed
  const categories = config.gallery.categories || [];
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string; type?: string } | null>(null);

  const activeCategory = categories.find((c) => c.id === activeTab);
  const items = activeCategory?.items || activeCategory?.images || []; // Fallback for transition compatibility

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-sand-light relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-accent font-medium text-sm tracking-widest uppercase mb-4">
            {config.gallery.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            {config.gallery.mainHeading.pre} <span className="text-emerald">{config.gallery.mainHeading.highlight}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {config.gallery.description}
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

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {items.map((item: any, index: number) => {
            // Determine type if not explicitly set (fallback for old config style)
            const isVideo = item.type === 'video' || (item.src && (item.src.includes('youtube') || item.src.includes('facebook') || item.src.includes('googlevideo')));
            const isImage = !isVideo;

            if (isVideo) {
              return (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-black shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <VideoPlayer
                    src={item.src}
                    title={item.title}
                    className="absolute inset-0"
                  />
                </div>
              );
            }

            return (
              <div
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-8 h-8 text-white mx-auto mb-2 opacity-80" />
                    <p className="text-white font-serif text-lg font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
              <h3 className="text-2xl font-serif font-medium mb-1">{selectedImage.title}</h3>
              <p className="text-white/80 text-sm">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
