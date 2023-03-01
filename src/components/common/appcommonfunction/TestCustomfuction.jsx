import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { testAxios, t_data } from "../../../Redux/commonSlice";

import { useQuery } from "react-query";

import {
  useAnimation,
  useDebounce,
  useLockBodyScroll,
  useMedia,
  useOnClickOutside,
  useTheme,
} from "./Fuctions";

import "./style.scss";
import axios from "axios";

const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 100,
      height: 100,
      marginRight: "40px",
      borderRadius: "50px",
      backgroundColor: "#4dd5fa",
      ...innerStyle,
    }}
  />
);

const data = [
  // {
  //   image: "https://source.unsplash.com/lxuB4abGzXc/800x1000",
  //   width: 800,
  //   height: 1000,
  // },
  // {
  //   image: "https://source.unsplash.com/d30sszrW7Vw/800x800",
  //   width: 800,
  //   height: 800,
  // },
  // {
  //   image: "https://source.unsplash.com/mDuluxr50Ew/800x500",
  //   width: 800,
  //   height: 500,
  // },
  // {
  //   image: "https://source.unsplash.com/KX2mdxPYOtA/800x1100",
  //   width: 800,
  //   height: 1100,
  // },
  // {
  //   image: "https://source.unsplash.com/oNoctqY9Oso/800x1200",
  //   width: 800,
  //   height: 1200,
  // },
  // {
  //   image: "https://source.unsplash.com/-SFhuMwFClk/800x900",
  //   width: 800,
  //   height: 900,
  // },
  // {
  //   image: "https://source.unsplash.com/hDqLoCCGOdU/800x1000",
  //   width: 800,
  //   height: 1000,
  // },
  // {
  //   image: "https://source.unsplash.com/UZ3V6AV5y4o/800x500",
  //   width: 800,
  //   height: 500,
  // },
  // {
  //   image: "https://source.unsplash.com/vlLH_kn-_h8/800x1200",
  //   width: 800,
  //   height: 1200,
  // },
  // {
  //   image: "https://source.unsplash.com/TGvIuQG0AXw/800x1100",
  //   width: 800,
  //   height: 1100,
  // },
  // {
  //   image: "https://source.unsplash.com/pBLJBHbtv0c/800x1000",
  //   width: 800,
  //   height: 1000,
  // },
];

const Content = () => {
  const terms = [
    // "stars",
    // "birds",
    // "puppy",
    // "nature",
    // "snow",
    // "cafe",
    // "hipster",
    // "startup",
    // "salad",
    // "funny",
  ];

  const images = terms.map((term, i) => (
    <img
      key={i}
      src={`https://source.unsplash.com/random/800x200?${term}`}
      alt=""
    />
  ));

  return <div className="images">{images}</div>;
};

export default function TestCustomfuction() {
  const dispatch = useDispatch();

  const response = useSelector(t_data);

  const [isFeching, setIsFeching] = useState(true);

  React.useEffect(() => {
    setIsFeching(true);
    dispatch(testAxios());
  }, [dispatch]);

  React.useEffect(() => {
    if (isFeching && response.length < 0) {
      console.log("Loading Your Post");
    } else if (response.length) {
      //await delay();
      console.log("TestCustomfuction", response);
    }
  }, [response, isFeching]);

  // const {
  //   isLoading,
  //   isSuccess,
  //   error,
  //   data: res,
  // } = useQuery("repoData", () =>
  //   axios({
  //     url: "https://jsonplaceholder.typicode.com/posts",
  //     method: "get",
  //   })
  // );

  // React.useEffect(() => {
  //   if (isLoading) {
  //     console.log("'Loading...'");
  //   } else if (error) {
  //     console.log("An error has occurred: " + error.message);
  //   } else if (isSuccess) {
  //     console.log(res);
  //   }
  // }, [error, isLoading, isSuccess, res]);

  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isModalOpen1, setModalOpen1] = useState(false);

  function Modal({ title, content, onClose }) {
    // Call hook to lock body scroll
    useLockBodyScroll();
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    );
  }

  const theme = {
    "button-padding": "16px",
    "button-font-size": "14px",
    "button-border-radius": "4px",
    "button-border": "none",
    "button-color": "#FFF",
    "button-background": "#6772e5",
    "button-hover-border": "none",
    "button-hover-color": "#FFF",
  };

  useTheme(theme);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));

  // Call hook multiple times to get animated values with different start delays
  const animation1 = useAnimation("elastic", 600, 0);
  const animation2 = useAnimation("elastic", 600, 150);
  const animation3 = useAnimation("elastic", 600, 300);

  // const [data, setData] = useState([]);
  // setData([]);

  const columnCount = useMedia(
    // Media queries
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );

  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);

  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []);

  data.forEach((item) => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });

  return (
    <>
      <div className="bg-slate-200 m-2 border-2 rounded-md w-full p-2">
        <input
          placeholder="Search Marvel Comics"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSearching && <div>Searching ...</div>}
        {results.map((result) => (
          <div key={result.id}>
            <h4>{result.title}</h4>
            <img
              src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
              alt=""
            />
          </div>
        ))}
      </div>

      <div>
        <button className="button">Button</button>
      </div>
      <div>
        {isModalOpen ? (
          <div
            ref={ref}
            className="bg-slate-200 m-2 border-2 rounded-md w-full p-2"
          >
            👋 Hey, I'm a modal. Click anywhere outside of me to close.
          </div>
        ) : (
          <button
            className="bg-slate-400 m-2 border-2 rounded-md w-full p-2"
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </button>
        )}
      </div>
      <div
        className="bg-slate-200 m-2 border-2 rounded-md w-full p-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Ball
          innerStyle={{
            marginTop: animation1 * 200 - 100,
          }}
        />
        <Ball
          innerStyle={{
            marginTop: animation2 * 200 - 100,
          }}
        />
        <Ball
          innerStyle={{
            marginTop: animation3 * 200 - 100,
          }}
        />
      </div>

      <div>
        <div className="bar">
          <button
            className="bg-neutral-600"
            onClick={() => setModalOpen1(true)}
          >
            Show Modal
          </button>
        </div>

        <Content />

        {isModalOpen1 && (
          <Modal
            title="Try scrolling"
            content="I bet you you can't! Muahahaha 😈"
            onClose={() => setModalOpen1(false)}
          />
        )}
      </div>

      <div className="App">
        <div className="columns is-mobile">
          {columns.map((column, i) => (
            <div className="column" key={i}>
              {column.map((item, a) => (
                <div
                  className="image-container"
                  style={{
                    // Size image container to aspect ratio of image
                    paddingTop: (item.height / item.width) * 100 + "%",
                  }}
                  key={a}
                >
                  <img src={item.image} alt="" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
// API search function
async function searchCharacters(search) {
  const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
  return await fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: "GET",
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
