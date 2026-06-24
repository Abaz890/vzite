import { useEffect, useState } from "react"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import GooglePlayBadge from '@/assets/googleplay.png';
import AppStoreBadge from '@/assets/appstore.png';


export default function DownloadAppBanner() {

    const [isVisible, setIsVisible] = useState(true)
    const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop")

    useEffect(() => {
        // Detect device type
        const userAgent = navigator.userAgent || navigator.vendor

        if (/iPad|iPhone|iPod/.test(userAgent)) {
            setDeviceType("ios")
        } else if (/android/i.test(userAgent)) {
            setDeviceType("android")
        } else {
            setDeviceType("desktop")
        }
    }, [])

    const handleDismiss = () => {
         setIsVisible(false)
    }

    if (!isVisible) {
        return null
    }

    const appStoreUrl = import.meta.env.VITE_APPSTORE_APP_URL;
    const playStoreUrl = import.meta.env.VITE_GOOGLE_PLAY_APP_URL;

    return (
        <div className="sm:hidden bg-white-50 text-black py-3 px-4 relative z-50">
            <div className="flex items-center justify-between gap-4 mx-auto">
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                        <Download className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm sm:text-base">Get our mobile app</p>
                        <p className="text-xs sm:text-sm text-black/90">Download now for the best experience</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {deviceType === "ios" ? (
                        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <img src={AppStoreBadge} alt="Download on the App Store" className="h-10 w-auto" />
                        </a>
                    ) : deviceType === "android" ? (
                        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <img src={GooglePlayBadge} alt="Get it on Google Play" className="h-10 w-auto" />
                        </a>
                    ) : (
                        <div className="flex gap-2">
                            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                                <img src={AppStoreBadge} alt="Download on the App Store" className="h-10 w-auto" />
                            </a>
                            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                                <img src={GooglePlayBadge} alt="Get it on Google Play" className="h-10 w-auto" />
                            </a>
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDismiss}
                        className="text-black hover:bg-black/20 h-8 w-8 flex-shrink-0"
                        aria-label="Dismiss banner"
                    >
                        <X className="h-4 w-4 " />
                    </Button>
                </div>
            </div>
        </div>
    )




}