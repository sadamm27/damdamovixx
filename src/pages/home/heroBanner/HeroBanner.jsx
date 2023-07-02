import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchQueryHandler();
    }
  };

  return (
    <div>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="wrapper">
            <div className="heroBannerContent">
              <span className="title">Welcome</span>
              <span className="subTitle">
              Unleash Your Movie Obsession with Damdamovix Your Digital Heaven for Film Enthusiasts.
              </span>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for movie or a tv show..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={searchQueryHandler}>Search</button>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default HeroBanner;
