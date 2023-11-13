import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleYoutube } from "@Store";

export const YoutubeVideo = () => {
  const defaultVideoId = "TYCBicKyVhs";
  const playlistText = "?listType=playlist";
  const { isYoutubeToggled, isYoutubeShown, setIsYoutubeToggled } = useToggleYoutube();
  const [inputText, setInputText] = useState("");
  const [videoId, setVideoId] = useState(defaultVideoId);
  const youtubeIdRegex = new RegExp(/(youtu.*be.*)\/(watch\?v=|\/shorts|)(.*?((?=[&#?])|$))/);
  const playlistRegex = new RegExp(/[&?]list=([^&]+)/i);

  const handleVideoChange = (youtubeUrl: string) => {
    const youtubeId = getYoutubeId(youtubeUrl);
    const playlistId = getPlaylistId(youtubeUrl);

    youtubeId && setVideoId(playlistId ? `${playlistText}${playlistId}` : youtubeId);
  };

  const getYoutubeId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(youtubeIdRegex);
    return match ? match[3] : null;
  };

  const getPlaylistId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(playlistRegex);
    return match ? match[0] : null;
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const url = e.target.value;
      handleVideoChange(url);
    }
  };

  return (
    <div className="w-full resize-x justify-between overflow-auto rounded-lg bg-white/50 py-2 text-black shadow-md dark:border-altWhite/20 dark:bg-altBlack/50 dark:text-altWhite backdrop-blur-sm sm:w-96">
      <div className="handle flex items-center justify-between p-1">
      <p className="py-2 font-bold">YouTube</p>
        <IoCloseSharp
          className="cursor-pointer text-red hover:bg-altRed rounded-full"
          onClick={() => setIsYoutubeToggled(false)}
        />
      </div>
      <div className="relative aspect-video justify-center">
        {isYoutubeShown && isYoutubeToggled && (
          <iframe
            className="left-0 h-full w-full"
            src={"https://www.youtube.com/embed/" + videoId}
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="cancelDrag flex items-center space-x-1 p-1">
        <input
          className="w-full border border-black/20 p-1 dark:border-altWhite/20 dark:bg-altBlack/50"
          type="text"
          value={inputText}
          placeholder="Paste video/playlist here..."
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-teal"
          onClick={() => {
            handleVideoChange(inputText);
          }}
        />
      </div>
    </div>
  );
};
