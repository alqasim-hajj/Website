import React from "react";

interface VideoPlayerProps {
    src: string;
    title?: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title = "Video Player", className = "" }) => {
    // Logic to parse different video sources
    const getEmbedUrl = (url: string) => {
        if (!url) return "";

        // YouTube
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const ytShortsMatch = url.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/);

        if (ytShortsMatch) {
            return `https://www.youtube.com/embed/${ytShortsMatch[1]}?autoplay=0&rel=0`;
        }
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
        }

        // Facebook
        if (url.includes("facebook.com")) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
        }

        return "";
    };

    const embedUrl = getEmbedUrl(src);

    // If it's a direct video link (MP4 or containing googlevideo)
    const isDirectLink = src.includes("googlevideo.com") || src.match(/\.(mp4|webm|ogg)(\?.*)?$/i);

    if (embedUrl) {
        return (
            <iframe
                src={embedUrl}
                title={title}
                className={`w-full h-full border-0 ${className}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        );
    }

    if (isDirectLink) {
        return (
            <video
                controls
                className={`w-full h-full object-cover ${className}`}
                title={title}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    // Fallback to generic iframe if source is unknown but marked as video
    return (
        <iframe
            src={src}
            title={title}
            className={`w-full h-full border-0 ${className}`}
            allowFullScreen
        />
    );
};

export default VideoPlayer;
