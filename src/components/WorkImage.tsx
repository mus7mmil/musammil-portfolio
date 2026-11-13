import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => props.video && setIsVideo(true)}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor="disable"
          aria-label={props.alt || "View Project"}
        >
          <div className="work-link">
            <MdArrowOutward />
          </div>
          <img
            src={props.image}
            alt={props.alt || "Project preview"}
            loading="lazy"
          />
          {isVideo && props.video && (
            <video src={props.video} autoPlay muted playsInline loop></video>
          )}
        </a>
      ) : (
        <div className="work-image-in work-image-static">
          <img
            src={props.image}
            alt={props.alt || "Project preview"}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default WorkImage;
