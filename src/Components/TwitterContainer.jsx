import React, { useEffect } from "react";

const TwitterContainer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-height="700"
          data-width="1000"
          data-theme="dark"
          href="https://twitter.com/readtldr/lists/1480169989697069061?ref_src=twsrc%5Etfw"
        >
          A Twitter List by readtldr
        </a>
      </div>
    </section>
  );
};

export default TwitterContainer;
