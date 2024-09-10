import React, { useEffect, useRef } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
import "./ShareContent.css";
import cross from "../../assests/cross.png";

const ShareContent = ({ url, title, setShareit, shareit }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShareit(false);
      }
    };

    if (shareit) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareit, setShareit]);
  return (
    <div className="share-overlay">
      <div className="share-container" ref={popupRef}>
        <h3>Share</h3>
        <div className="share-content">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={36} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>
          <EmailShareButton url={url} title={title}>
            <EmailIcon size={36} round />
          </EmailShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={36} round />
          </TelegramShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={36} round />
          </RedditShareButton>
          <img
            src={cross}
            alt="Close"
            className="close-icon"
            onClick={() => setShareit(false)}
          />
        </div>
        <div className="share-close">
          <button onClick={() => setShareit(false)}>close</button>
        </div>
      </div>
    </div>
  );
};

export default ShareContent;
