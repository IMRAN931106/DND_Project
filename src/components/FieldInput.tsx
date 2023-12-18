  import React from "react";
  import { TMedia } from "../types/global";
  
  type FieldInputProps = {
    item:  TMedia;
    index?: number;
  };
  
  const FieldInput: React.FC<FieldInputProps> = ({
    item,
    ...props
  }) => {
    const MediaSwitch = () => {
      switch (item.type) {
        case "image":
          return (
            <img 
            src={item.assetUrl}
            alt="Loading..."
            {...props}
            style={{ borderRadius: '20px' ,height: '100%'}}
            />
          );
        case "video_yt":
          return (
          //   <iframe
          //   // width="560"
          //   // height="315"
          //   src={item.assetUrl}
          //   title="youtube video"
          //   allowFullScreen
          //   {...props}
          // ></iframe>
          <img 
          src={item.assetUrl}
          alt="Loading..."
          style={{ borderRadius: '20px' ,height: '100%'}}
          {...props}
          />
          );
        case "video_gcp":
          return (
          //   <video width="560" height="315" controls>
          //   <source 
          //   src={item.assetUrl} 
          //   type='video/mp4 , video/ogg , video/webm'
          //   {...props}
          //   />
          //   Your browser does not support the video tag.
          // </video>
          <img 
          src={item.assetUrl}
          alt="Loading..."
          {...props}
          style={{ borderRadius: '20px',height: '100%'}}
          />
          );
       
         default:
          break;
      }
    };
    return <>{MediaSwitch()}</>;
  };
  
  export default FieldInput;