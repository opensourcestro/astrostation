import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useToggleQuote } from "@Store";

import quoteData from "./QuoteData.json";

export const Quotes = () => {
  let [quoteNumber, setQuoteNumber] = useState(0);
  const { setIsQuoteToggled } = useToggleQuote();

  useEffect(() => {
    setQuoteNumber(Math.floor(Math.random() * quoteData.length));
  }, []);

  return (
    <div className="rounded-lg border border-altWhite/20 bg-white/50 dark:border-altWhite/20 dark:bg-black/50 dark:text-altWhite backdrop-blur-sm sm:w-96">
      <div className="handle flex w-full cursor-move justify-end p-2">
        <IoCloseSharp
          className="cursor-pointer text-altBlack dark:text-white hover:bg-altRed rounded-full"
          onClick={() => setIsQuoteToggled(false)}
        />
      </div>
      <div className="cancelDrag max-w-sm text-center">
        <div className="relative items-center justify-center pb-2 pr-2 pl-2 font-radio-canada text-xl text-altBlack dark:text-altWhite">
          {quoteData[quoteNumber].q}
          <br />-{quoteData[quoteNumber].a}
        </div>
      </div>
      <div className="flex w-full justify-end pb-2 pr-2 pl-2 text-base cursor-pointer hover:text-teal">
        <AiOutlineReload onClick={() => setQuoteNumber(Math.floor(Math.random() * quoteData.length))} />
      </div>
    </div>
  );
};
