import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import FormModal from "./FormModal";
import "../styles/header.css";
import { MD } from "../common/icons";

const Header = ({ setData, keyword, setKeyword, setSorting, sortBy }) => {
  const [show, setShow] = useState(false);
  const sorting = [
    {
      value: "title",
      label: "Title",
    },
    {
      value: "createdAt",
      label: "Created At",
    },
    {
      value: "modifiedAt",
      label: "Modified At",
    },
  ];
  return (
    <>
      <header className="header">
        <h2 className="title container">React Application</h2>
      </header>
      <nav className="container">
        <ul>
          <li className="position-relative">
            Sort by {sortBy} <MD.MdKeyboardArrowDown />
            <div className="sorting-drop-down">
              {sorting.map((data, index) => (
                <a key={index} onClick={() => setSorting(data.value)}>
                  {data?.label}
                </a>
              ))}
            </div>
          </li>
          <li>
            <Input
              placeholder="search ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </li>
          <li>
            <Button onClick={() => setShow(true)} className="button">
              Add New Note
            </Button>
          </li>
        </ul>
      </nav>
      <FormModal open={show} close={() => setShow(false)} setData={setData} />
    </>
  );
};

export default Header;
