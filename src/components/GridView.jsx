import React, { useState } from "react";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap";
import FormModal from "./FormModal";
import { MD } from "../common/icons";
import "../styles/accordian.css";

let initialState = {
  open: false,
  id: null,
  data: {},
};

const GridView = ({ data, setData , keyword}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const buttonText = isExpanded ? "Read less" : "Read more";

  const [state, setState] = useState(initialState);

  const handleDelete = (title, id) => {
    let temp = data.filter(
      (data, index) => data.title !== title && id !== index
    );
    setData(temp);
  };

  return (
    <>
      <Row className="mt-2">
        {data
          .filter((item) => {
            return (
              item.title.toLowerCase().includes(keyword.toLowerCase()) ||
              item.note.toLowerCase().includes(keyword.toLowerCase())
            );
          })
          .map((item, index) => (
          <Col lg={6} md={6} key={index}>
            <Card>
              <CardTitle>
                <h2 className="p-2">{item?.title}</h2>
                <hr />
              </CardTitle>
              <CardBody>
                {isExpanded ? item?.note : item?.note.substring(0, 300)}
                {item?.note?.length > 3000 ? (
                  <p onClick={toggleExpansion} className="text-danger">
                    {buttonText}
                  </p>
                ) : null}
                <br />

                <hr />

                <div className="d-flex justify-content-between">
                  <div>
                    <small>
                      Created at : {new Date(item?.createdAt).toDateString()}{" "}
                    </small>
                    {item?.modifiedAt && (
                      <small className="ms-1">
                        Modified at :{" "}
                        {new Date(item?.modifiedAt).toDateString()}{" "}
                      </small>
                    )}
                  </div>
                  <div>
                    <MD.MdBorderColor
                      size={30}
                      className="cursor-pointer on-hover me-1"
                      onClick={() =>
                        setState({
                          open: true,
                          data: item,
                          id: index,
                        })
                      }
                      color="warning text-white"
                    />

                    <MD.MdDelete
                      size={30}
                      className="cursor-pointer on-hover text-danger"
                      onClick={() => handleDelete(data.title, index)}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <FormModal
        open={state.open}
        close={() => setState(initialState)}
        setData={setData}
        data={state?.data}
        index={state.id}
        stateData={data}
      />
    </>
  );
};

export default GridView;
