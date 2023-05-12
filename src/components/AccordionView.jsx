import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import FormModal from "./FormModal";
import { MD } from "../common/icons";

let initialState = {
  open: false,
  id: null,
  data: {},
};

const AccordionView = ({ data, setData, keyword }) => {
  const [open, setOpen] = useState("1");
  const [state, setState] = useState(initialState);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const handleDelete = (title, id) => {
    let temp = data.filter(
      (data, index) => data.title !== title && id !== index
    );
    setData(temp);
  };
  return (
    <>
      <Accordion open={open} toggle={toggle} className="mt-2">
        {data
          .filter((item) => {
            return (
              item.title.toLowerCase().includes(keyword.toLowerCase()) ||
              item.note.toLowerCase().includes(keyword.toLowerCase())
            );
          })
          ?.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader targetId={index}>
                <div className="accordion-title">
                  <h5>{item?.title}</h5>
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
                      onClick={() => handleDelete(data?.title, index)}
                    />
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody accordionId={index}>
                {item?.note}
                <div className="accordion-footer">
                  <br />
                  <small>
                    Created at : {new Date(item?.createdAt).toDateString()}{" "}
                  </small>
                  <br />
                  {item?.modifiedAt && (
                    <small className="ms-1">
                      Modified at : {new Date(item?.modifiedAt).toDateString()}{" "}
                    </small>
                  )}
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
      </Accordion>
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

export default AccordionView;
