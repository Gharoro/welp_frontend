import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {  updateListing } from "../../utils/apiMethods";
import { alertSuccess, alertError } from "../../utils/alerts";

export default function EditListingModal({ show, handleClose, data }) {
  const [loading_submit, setLoadingSubmit] = useState(false);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyData = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      location: e.target.location.value,
      address: e.target.address.value,
      contact: e.target.contact.value,
      open_time: e.target.open.value,
      close_time: e.target.close.value,
      working_hours: e.target.working_hours.value,
    };
    setLoadingSubmit(true);
    updateListing(bodyData, images, data.id)
      .then((res) => {
        setLoadingSubmit(false);
        alertSuccess(res.data.message);
      })
      .catch((error) => {
        alertError(error.response.data.error);
        setLoadingSubmit(false);
      });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        size="lg"
      
      >
        <Modal.Header closeButton>
          <Modal.Title>{data !== null && data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="title" className="form-label">
                Business Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                defaultValue={data !== null && data.title}
              />
            </div>
            <div className="mb-3">
              <label for="category" className="form-label">
                Industry
              </label>
              <select
                className="form-select"
                name="category"
                aria-label="Default select example"
              >
                <option>Open this select menu</option>
                <option selected={data !== null && data.category === "Restaurant" ? "selected" : ""}  value="Restaurant">Restaurant</option>
                <option selected={data !== null && data.category === "Health" ? "selected" : ""} value="Health">Health</option>
                <option selected={data !== null && data.category === "Beauty" ? "selected" : ""} value="Beauty">Beauty</option>
                <option selected={data !== null && data.category === "Information Technology" ? "selected" : ""} value="Information Technology">
                  Information Technology
                </option>
                <option selected={data !== null && data.category === "Clubs & Bars" ? "selected" : ""} value="Clubs & Bars">Clubs & Bars</option>
                <option selected={data !== null && data.category === "Others" ? "selected" : ""} value="Others">Others</option>
              </select>
            </div>
            <div className="mb-3">
              <label for="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                name="description"
                defaultValue={data !== null && data.description}
              ></textarea>
            </div>
            <div className="mb-3">
              <label for="working_hours" className="form-label">
                Working Hours
              </label>
              <textarea
                className="form-control"
                id="working_hours"
                rows="3"
                name="working_hours"
                defaultValue={data !== null && data.working_hours}
              ></textarea>
            </div>
            <div className="mb-3">
              <label for="open_time" className="form-label">
                Open Time
              </label>
              <input
                type="text"
                className="form-control"
                id="open_time"
                name="open"
                defaultValue={data !== null && data.open_time}
              />
            </div>
            <div className="mb-3">
              <label for="close_time" className="form-label">
                Close Time
              </label>
              <input
                type="text"
                className="form-control"
                id="close_time"
                name="close"
                defaultValue={data !== null && data.close_time}
              />
            </div>
            <div className="mb-3">
              <label for="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="location"
                defaultValue={data !== null && data.location}
              />
            </div>
            <div className="mb-3">
              <label for="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                defaultValue={data !== null && data.address}
              />
            </div>
            <div className="mb-3">
              <label for="phone" className="form-label">
                Contact Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="contact"
                defaultValue={data !== null && data.contact}
              />
            </div>
            <div className="mb-3">
              <label for="images" className="form-label">
                Images
              </label>
              <input
                type="file"
                className="form-control"
                id="images"
                onChange={(e) => setImages(e.target.files)}
                multiple
              />
            </div>
            <div className="mb-3">
              {loading_submit ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
