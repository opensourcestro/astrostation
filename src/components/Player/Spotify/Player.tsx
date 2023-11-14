import { useDarkToggleStore, useSpotifyMusic } from "@Store";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { WithTooltip } from "../../Tooltip";
import { failureToast } from "@Root/src/utils/toast";

export const Spotify = () => {
  const { setIsSpotifyToggled } = useSpotifyMusic();
  const { isDark } = useDarkToggleStore();

  const [text, setText] = useState("");
  const [playlist, setPlaylist] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn");

  function changePlaylist() {
    if (!text.includes("https://open.spotify.com/playlist/")) {
      failureToast("Invalid spotify URL", false);
      return;
    }
    const splitOn = (slicable: string, ...indices: number[]) =>
      [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));
    const stitchUrl = splitOn(text, 24)[0] + "/embed" + splitOn(text, 24)[1];
    setPlaylist(stitchUrl);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      changePlaylist();
    }
  }

  return (
    <div className="mb-2 w-72 max-w-sm justify-between rounded-lg border border-altWhite/20 bg-white/50 py-4 px-4 text-altBlack shadow-md dark:border-altWhite/20 dark:bg-black/50 dark:text-altWhite backdrop-blur-sm sm:w-96">
      <WithTooltip text="Make sure to refresh after logging in">
        <div className="handle flex cursor-move items-center justify-between p-1">
          <p className="py-2 font-bold">Spotify</p>
          <IoCloseSharp
            className="cursor-pointer text-altBlack dark:text-white hover:bg-altRed rounded-full"
            onClick={() => setIsSpotifyToggled(false)}
          />
        </div>
      </WithTooltip>

      <div className="cancelDrag justify-center">
        <iframe
          src={`${playlist}?utm_source=generator&theme=${isDark ? 0 : 1}`}
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div className="mt-2 flex items-center space-x-1 p-1">
        <input
          className="cancelDrag w-full rounded-lg border border-black/20 p-1  bg-white/60 placeholder-altBlack/50 dark:border-altWhite/20 dark:bg-altBlack/50 dark:placeholder-altWhite/50"
          type="text"
          value={text}
          placeholder="Paste Spotify URL here"
          onChange={e => {
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload className="w-5 cursor-pointer hover:text-teal" onClick={changePlaylist} />
      </div>
    </div>
  );
};

