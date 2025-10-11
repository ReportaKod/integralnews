"use client";

import { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "next-share";
import { MessageCircle } from "lucide-react";

const buttonMap = {
  facebook: FacebookShareButton,
  twitter: TwitterShareButton,
  linkedin: LinkedinShareButton,
  pinterest: PinterestShareButton,
  reddit: RedditShareButton,
  telegram: TelegramShareButton,
  whatsapp: WhatsappShareButton,
  email: EmailShareButton,
  bluesky: null, // Custom component
};

const iconMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  pinterest: PinterestIcon,
  reddit: RedditIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
  email: EmailIcon,
  bluesky: () => (
    <svg viewBox="0 0 640 640" width="24" height="24" className="text-[#0085ff]">
      <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
    </svg>
  ), // Custom SVG icon
};

type ShareType = keyof typeof buttonMap;

interface ShareItem {
  type: ShareType;
  label?: string; // For full style with text
}

export interface SocialShareProps {
  shares: ShareItem[];
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  media?: string;
  variant?: "icon" | "full"; // "icon" = small icon buttons, "full" = large buttons with text
}

export default function SocialShare({
  shares,
  url = "https://example.com",
  title = "Check out this awesome content!",
  description = "I found this amazing content and thought you might like it too.",
  hashtags = ["nextjs", "react", "webdev"],
  media = "https://example.com/image.jpg",
  variant = "icon",
}: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {shares.map((share, index) => {
        const ButtonComponent = buttonMap[share.type];
        const IconComponent = iconMap[share.type];

        // Skip null components except for custom Bluesky
        if (!ButtonComponent && share.type !== "bluesky") return null;
        if (!IconComponent) return null;

        const props: any = { url: currentUrl, title, hashtags, description, media };

        const shareLabels = {
          facebook: "Partager sur Facebook",
          twitter: "Partager sur Twitter", 
          linkedin: "Partager sur LinkedIn",
          whatsapp: "Partager sur WhatsApp",
          email: "Partager par email",
          reddit: "Partager sur Reddit",
          telegram: "Partager sur Telegram",
          pinterest: "Partager sur Pinterest",
          bluesky: "Partager sur Bluesky"
        };

        // Custom Bluesky sharing logic
        if (share.type === "bluesky") {
          const handleBlueskyShare = () => {
            // Bluesky has a 300 character limit, so we need to be concise
            const maxLength = 250; // Leave some room for the URL
            let text = title;
            
            // Add description if there's room
            if (description && (text.length + description.length + 3) < maxLength) {
              text += ` - ${description}`;
            }
            
            // Add the URL to the text
            text += ` ${currentUrl}`;
            
            // Truncate if still too long (but keep the URL)
            if (text.length > 300) {
              const urlLength = currentUrl.length + 1; // +1 for the space
              const availableForContent = 300 - urlLength;
              const contentOnly = text.replace(` ${currentUrl}`, '');
              text = contentOnly.substring(0, availableForContent - 3) + '...' + ` ${currentUrl}`;
            }
            
            // Note: Bluesky doesn't support image upload via URL parameters
            // The user will need to manually add the cover image in the Bluesky compose window
            const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
            window.open(blueskyUrl, '_blank', 'noopener,noreferrer');
          };

          return (
            <button
              key={index}
              onClick={handleBlueskyShare}
              aria-label={shareLabels.bluesky}
              className="flex items-center justify-center w-6 h-6 border-none p-0 font-inherit cursor-pointer outline-none"
            >
              {variant === "icon" ? (
                <svg viewBox="0 0 640 640" width="24" height="24" className="text-[#0085ff] hover:text-[#0066cc] transition-colors">
                  <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
                </svg>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 rounded-md text-white w-full transition-all bg-[#0085ff] hover:bg-[#0066cc]">
                  <svg viewBox="0 0 640 640" width="32" height="32" className="text-white">
                    <path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z" fill="currentColor"/>
                  </svg>
                  <span>Partager sur Bluesky</span>
                </div>
              )}
            </button>
          );
        }

        // Only render if ButtonComponent exists (not for Bluesky)
        if (!ButtonComponent) return null;

        return (
          <ButtonComponent key={index} {...props} aria-label={shareLabels[share.type] || `Partager sur ${share.type}`}>
            {variant === "icon" ? (
              <IconComponent size={24} round />
            ) : (
              <div className={`flex items-center gap-3 px-4 py-2 rounded-md text-white w-full transition-all
                ${share.type === "facebook" ? "bg-[#3b5998]" : ""}
                ${share.type === "twitter" ? "bg-[#1DA1F2]" : ""}
                ${share.type === "linkedin" ? "bg-[#0077b5]" : ""}
                ${share.type === "whatsapp" ? "bg-[#25D366]" : ""}
                ${share.type === "email" ? "bg-gray-600" : ""}
                ${share.type === "reddit" ? "bg-[#FF4500]" : ""}
                ${share.type === "telegram" ? "bg-[#0088cc]" : ""}
                ${share.type === "pinterest" ? "bg-[#E60023]" : ""}
              `}>
                <IconComponent size={32} round />
                <span>Share on {share.label || share.type}</span>
              </div>
            )}
          </ButtonComponent>
        );
      })}
    </div>
  );
}
