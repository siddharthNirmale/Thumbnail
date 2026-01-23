import { useSearchParams } from "react-router-dom";
import { yt_html } from "../assets/assets";

const YtPreview = () => {
  const [searchParams] = useSearchParams();

  const thumbnail_url = searchParams.get("thumbnail_url");
  const title = searchParams.get("title");

  if (!thumbnail_url || !title) {
    return <div className="text-white p-4">Invalid preview data</div>;
  }

 
  const decodedThumb = decodeURIComponent(thumbnail_url);
  const absoluteThumbnailUrl = decodedThumb.startsWith("http")
    ? decodedThumb
    : `${window.location.origin}${decodedThumb}`;

  const new_html = yt_html
    .replace("%%THUMBNAIL_URL%%", absoluteThumbnailUrl)
    .replace("%%TITLE%%", decodeURIComponent(title));

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <iframe
        srcDoc={new_html}
        width="100%"
        height="100%"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default YtPreview;
