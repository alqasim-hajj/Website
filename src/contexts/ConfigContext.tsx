import React, { createContext, useContext, useEffect, useState } from 'react';
import siteConfig from '@/config/site-config.json';

type ConfigType = typeof siteConfig;

const getDynamicConfig = (baseConfig: ConfigType): ConfigType => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const config = JSON.parse(JSON.stringify(baseConfig)); // deep clone

    if (hostname === 'hajj2026.in') {
        config.general.seo.title = 'Hajj 2026';
    } else if (hostname === 'alqasimtours.in') {
        config.general.seo.title = 'Al Qasim Tours';
    }

    return config;
};

const ConfigContext = createContext<ConfigType | null>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<ConfigType>(() => getDynamicConfig(siteConfig));

    useEffect(() => {
        // Fetch external config on mount to support runtime updates in production
        const fetchConfig = async () => {
            try {
                const response = await fetch('/site-config.json');
                const contentType = response.headers.get("content-type");

                if (response.ok && contentType && contentType.includes("application/json")) {
                    const text = await response.text();
                    try {
                        const externalConfig = JSON.parse(text);
                        const dynamicConfig = getDynamicConfig(externalConfig);
                        setConfig(dynamicConfig);
                    } catch (parseError) {
                        console.error("Failed to parse siteConfig.json as JSON", parseError);
                        console.debug("Received content starting with:", text.substring(0, 50));
                    }
                } else {
                    console.warn(`External siteConfig.json not found or incorrect type (Status: ${response.status}, Type: ${contentType})`);
                }
            } catch (error) {
                console.error("Network error while fetching siteConfig.json", error);
            }
        };

        // In development, HMR handles updates via the direct 'import siteConfig'
        // In production, we can still fetch from /public if we want runtime overrides
        // Use window.__PROD__ or similar if env is not available, but let's assume env check is fine
        // @ts-ignore
        if (import.meta.env?.PROD) {
            fetchConfig();
        }
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }
    return context;
};
