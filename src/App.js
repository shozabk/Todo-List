import Header from "./components/Header";
import AccordionView from "./components/AccordionView";
import GridView from "./components/GridView";
import "./styles/Home.css";
import { useState, useEffect } from "react";
import { MD } from "./common/icons";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [grid, setGrid] = useState(false);
  const [sorting, setSorting] = useState();
  const [keyword, setKeyword] = useState("");

  const handleSetData = (newData) => {
    console.log(newData)
    setData(newData);
  };

  

  useEffect(() => {
    let temp = keyword === "" && filteredData.length === 0 ? data : filteredData;
    temp = temp?.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.note.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredData([...temp]);
  }, [keyword]);

  console.log({filteredData})

  useEffect(() => {
    let temp = data;
    if (sorting === "createdAt" || sorting === "modifiedAt") {
      temp = temp.sort((a, b) => {
        const dateA = new Date(a[sorting]);
        const dateB = new Date(b[sorting]);
        return dateB - dateA;
      });
    } else {
      temp = temp.sort(function (a, b) {
        if (a[sorting] < b[sorting]) {
          return -1;
        }
        if (a[sorting] > b[sorting]) {
          return 1;
        }
        return 0;
      });
    }

    setData([...temp]);
  }, [sorting]);

  

  return (
    <>
      <Header
        setData={(data) => handleSetData(data)}
        keyword={keyword}
        setKeyword={setKeyword}
        setGrid={setGrid}
        setSorting={setSorting}
        sortBy={sorting}
      />
      <div className="container home">
        <div className="d-flex justify-content-end align-item-center margin-bottom">
          <span style={{ fontSize: "20px" }}>Layout:</span>
          {grid ? (
            <MD.MdList
              size={30}
              className="cursor-pointer on-hover ms-1"
              onClick={() => setGrid(!grid)}
            />
          ) : (
            <MD.MdGridView
              size={30}
              className="cursor-pointer on-hover ms-1"
              onClick={() => setGrid(!grid)}
            />
          )}
        </div>
        {grid ? (
          <GridView data={data} keyword={keyword} setData={(data) => handleSetData(data)} />
        ) : (
          <AccordionView data={data} keyword={keyword} setData={(data) => handleSetData(data)} />
        )}
      </div>
    </>
  );
}

export default App;
