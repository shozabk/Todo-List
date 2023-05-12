import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  Label,
  Button,
} from "reactstrap";
import "../styles/accordian.css";

let initialState = {
  title: "",
  note: "",
  createdAt: {},
  modifiedAt: {},
};

const FormModal = ({ open, close, setData, data, index, stateData }) => {
  const [formData, setFormData] = useState(
    data ? { title: data?.title, note: data?.note } : initialState
  );
  const { title, note } = formData;
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    setFormData({ title: data?.title, note: data?.note });
  }, [data]);

  const handleSubmit = () => {
    if(title === '' || note===''){
     return window.alert("Please fill out both fields")
    }
    if (data) {
      let data = stateData;
      data[index].title = title;
      data[index].note = note;
      data[index].modifiedAt = new Date();
      setData(data);
    } else {
      let temp = { ...formData, ["createdAt"]: new Date() };
      setData((prev) => [...prev, temp]);
    }
    setFormData(initialState);
    close();
  };
  useEffect(() => {
    
  }, [])
  
  return (
    <Modal isOpen={open} toggle={close}>
      <ModalHeader toggle={close}>Add New Note</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={onChangeHandler}
              name="title"
            />
          </FormGroup>
          <FormGroup>
            <Label>Note</Label>
            <Input
              type="textarea"
              value={note}
              onChange={onChangeHandler}
              name="note"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" type="submit" onClick={handleSubmit}>
          Add new note
        </Button>{" "}
        <Button color="danger" onClick={close}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormModal;
