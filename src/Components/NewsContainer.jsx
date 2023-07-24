import { useEffect, useState } from "react";

function NewsContainer({ gameNews }) {
  const [newsArticles, setNewsArticles] = useState("");

  useEffect(() => {
    console.log(gameNews);
    if (gameNews.length > 0) {
      const articlesArr = gameNews.map((newsItem, i) => {
        return (
          <div key={i}>
            <a href={newsItem.url}>
              <div className="newsTitle">{newsItem.title}</div>
            </a>

            <div
              dangerouslySetInnerHTML={{ __html: newsItem.contents }}
              className={`newsContent ${"content" + i}`}
            ></div>
          </div>
        );
      });

      setNewsArticles(articlesArr);
    }
  }, [gameNews]);

  return (
    <div className="newsContainer">
      <div className="news">
        <div className="newsHeader">Latest Counter-Strike News</div>
        <div>{newsArticles}</div>
      </div>
      {/* <div className="tournaments">
        asdasj;lj asldjf;lasdf a;ldskjas al;kdsja;sl asldjf;alsdj l;aksdjl;kasj
        la;ksdjas;l{" "}
      </div> */}
    </div>
  );
}

export default NewsContainer;
