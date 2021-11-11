import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import "../../App.css";
import Spinner from "../Spinner";
import isLoggedIn from "../../utils/isLoggedIn";
import {
  getUserListings,
  addListing,
  deleteListing,
} from "../../utils/apiMethods";
import { alertSuccess, alertError } from "../../utils/alerts";
import EditListingModal from "./EditListingModal";

export default function Body() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading_submit, setLoadingSubmit] = useState(false);
  const [loading_del, setLoadingDel] = useState(false);
  const [show, toggleShow] = useState(true);
  const [listings, setListings] = useState([]);
  const [images, setImages] = useState([]);
  const [clickedItem, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    !isLoggedIn() && navigate("/login");
    getUserListings()
      .then((response) => {
        setLoading(false);
        setListings(response.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
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
    addListing(data, images)
      .then((res) => {
        setLoadingSubmit(false);
        alertSuccess(res.data.message);
      })
      .catch((error) => {
        alertError(error.response.data.error);
        setLoadingSubmit(false);
      });
  };
  const deleteItem = (id) => {
    setLoadingDel(true);
    deleteListing(id)
      .then((res) => {
        setLoadingDel(false);
        alertSuccess(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alertError(error.response.data.error);
        setLoadingDel(false);
      });
  };

  return (
    <div>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <span data-feather="home"></span>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => {
                      toggleShow(false);
                    }}
                  >
                    <span data-feather="file"></span>
                    Add Listing
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => {
                      toggleShow(true);
                    }}
                  >
                    <span data-feather="file"></span>
                    Manage Listing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span data-feather="file"></span>
                    Main Site
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className={show ? "" : "d-none"}>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Manage Listings</h1>
              </div>

              {loading ? (
                <Spinner />
              ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {listings.map((item) => (
                    <div key={item.id} className="col d-flex align-items-stretch">
                      <div className="card listing-card" style={{ paddingBottom: "10px" }}>
                        <img
                          src={item.listing_images[0]}
                          className="card-img-top"
                          alt="listing image"
                        />
                        <div className="card-body">
                          <Link
                            to={{
                              pathname: `/listing/${item.id}`,
                            }}
                          >
                            <h4 className="card-title">{item.title}</h4>
                          </Link>

                          <h6>
                          <i class="far fa-clock"></i> Opens: {item.open_time} - Closes: {item.close_time}{" "}
                            <span style={{ float: "right" }}>
                              <i class="fas fa-industry"></i> {item.category}
                            </span>{" "}
                          </h6>
                          <h6>
                            <i class="fas fa-map-marker-alt"></i>{" "}
                            {item.location}
                          </h6>

                          <p className="card-text mt-3">{item.description}</p>
                        </div>
                        <div style={{ paddingLeft: "10px" }}>
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                              handleShow();
                              setItem(item);
                            }}
                          >
                            Edit
                          </button>
                          <EditListingModal
                            show={showModal}
                            handleClose={handleClose}
                            data={clickedItem}
                          />

                          {loading_del ? (
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => {
                                deleteItem(item.id);
                              }}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={show ? "d-none" : ""}>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Add Listing</h1>
              </div>
              <div className="col-md-7">
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Business Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="title"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Industry
                    </label>
                    <select
                      class="form-select"
                      name="category"
                      aria-label="Default select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Health">Health</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Clubs & Bars">Clubs & Bars</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="description"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Working Hours
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="working_hours"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Open Time
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="open"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Close Time
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="close"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="location"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="address"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="contact"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Images
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => setImages(e.target.files)}
                      multiple
                    />
                  </div>
                  <div class="mb-3">
                    {loading_submit ? (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
