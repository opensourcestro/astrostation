import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleTwitch } from "@Store";

export const TwitchStream = () => {
  const { isTwitchToggled, isTwitchShown, setIsTwitchToggled } = useToggleTwitch();
  const [inputText, setInputText] = useState("");
  const [twitchStreamer, setTwitchStreamer] = useState("melkey");
  const [parentHostName, setParentHostName] = useState("astrostation.me");

  // doing this for convenience (we don't have a real staging env)
  // don't ever mix prod and dev code, can cause major security flaws (not here, but you know)
  useEffect(() => {
    if (window.location.hostname === "localhost") {
      setParentHostName("localhost");
    }
  }, []);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleStreamerChange(e.target.value);
    }
  };

  const handleStreamerChange = streamName => {
    if (streamName.length > 0) {
      setTwitchStreamer(streamName);
    }
  };

  // The following resize fix is a thanks to adamdotjs.
  // https://play.tailwindcss.com/jp2JnWgRoW -> his solution
  return (
    <div className="w-full resize-x justify-between overflow-auto rounded-lg bg-white/50 py-4 px-4 text-altBlack shadow-md dark:border-altWhite/20 dark:bg-black/50 dark:text-altWhite backdrop-blur-sm sm:w-96">
     <div className="handle flex cursor-move items-center justify-between p-1">
      <p className="py-2 font-bold">Twitch</p>
        <IoCloseSharp
          className="cursor-pointer text-altBlack dark:text-white hover:bg-altRed rounded-full"
          onClick={() => setIsTwitchToggled(false)}
        />
      </div>
      <div className="relative aspect-video justify-center">
        {isTwitchShown && isTwitchToggled && (
          <iframe
            className="left-0 h-full w-full"
            src={"https://player.twitch.tv/?channel=" + twitchStreamer + "&parent=" + parentHostName}
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="mt-2 flex items-center space-x-1 p-1">
        <input
          className="cancelDrag w-full rounded-lg border border-black/20 p-1  bg-white/60 placeholder-altBlack/50 dark:border-altWhite/20 dark:bg-altBlack/50 dark:placeholder-altWhite/50"
          type="text"
          value={inputText}
          placeholder="Search stream"
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-teal"
          onClick={() => {
            handleStreamerChange(inputText);
          }}
        />
      </div>
    </div>
  );
};
