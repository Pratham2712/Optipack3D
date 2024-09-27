import React, { useEffect, useRef, useState } from "react";
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

const ShareContent = ({
  url,
  title,
  setShareit,
  shareit,
  tableData,
  filled,
}) => {
  const popupRef = useRef(null);
  const [image, setImage] = useState(localStorage.getItem("screenshot"));

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

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
  useEffect(() => {
    console.log(URL.createObjectURL(base64ToBlob(image)));
  }, []);
  return (
    <div className="share-overlay">
      <div className="share-container" ref={popupRef}>
        <h3>Share</h3>
        <div className="preview">
          <div className="share-image">
            <img src={image} alt="share-image" />
          </div>
          {/* <div className="table" style={{ display: "flex", overflow: "auto" }}>
            <div
              className="table_detail"
              dangerouslySetInnerHTML={{ __html: tableData }}
            ></div>
            <div>
              <table className="table_detail filled-table">
                <tr>
                  <th>Filled cases</th>
                </tr>
                {filled?.map((ele) => (
                  <tr style={{ padding: "0px", fontSize: "0.8rem" }}>{ele}</tr>
                ))}
                <tbody></tbody>
              </table>
            </div>
          </div> */}
        </div>
        <div className="share-content">
          <FacebookShareButton url={image} quote={title}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
          <TwitterShareButton url={image} title={title}>
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <LinkedinShareButton url={image} title={title}>
            <LinkedinIcon size={36} round />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={url}
            title={title}
            summary={` - Here's an image: ${image}`}
          >
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>
          <EmailShareButton url={url} title={title}>
            <EmailIcon size={36} round />
          </EmailShareButton>
          <TelegramShareButton
            url={url}
            title={` - Here's an image: ${image}`}
            summary={` - Here's an image: ${image}`}
          >
            <TelegramIcon size={36} round />
          </TelegramShareButton>
          <RedditShareButton
            url={url}
            title={` - Here's an image: ${image}`}
            summary={` - Here's an image: ${image}`}
          >
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
