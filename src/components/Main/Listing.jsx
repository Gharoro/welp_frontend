import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Main.css";
import Header from "./nav/Header";
import Hero from "./nav/Hero";
import Spinner from "../Spinner";

import { getListing } from "../../utils/apiMethods";

export default function Listing(props) {
  const [listing, setListing] = useState(null);
  const [lister, setLister] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    getListing(params.id)
      .then((response) => {
        setListing(response.data.data);
        setLister(response.data.lister);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        {loading ? (
          <Spinner />
        ) : (
          <div className="container marketing">
            <hr className="featurette-divider" />

            <div className="row g-4">
              <div className="col-md-8">
                <div key={listing.id} className="col">
                  <div className="card">
                    <img
                      src={listing.listing_images[0]}
                      className="card-img-top"
                      alt="listing image"
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        <a href={`/listings/${listing.id}`}>{listing.title}</a>
                      </h4>
                      <h6>
                        <i class="far fa-clock"></i> Opens: {listing.open_time}{" "}
                        - Closes: {listing.close_time}{" "}
                        <span style={{ float: "right" }}>
                          <i class="fas fa-industry"></i> {listing.category}
                        </span>{" "}
                      </h6>
                      <h6>
                        <i class="fas fa-location-arrow"></i> Business Address:{" "}
                        {listing.address}
                      </h6>
                      <h6>
                        <i class="fas fa-map-marker-alt"></i> {listing.location}
                      </h6>

                      <p className="card-text mt-3">{listing.description}</p>

                      <div>
                        <p className="fw-bold">
                          This businness was listed by {lister.name}{" "}
                          <i class="fas fa-heart"></i>
                        </p>
                        <small>
                          <a href={`mailto:${lister.email}`}>
                            Contact Via Email
                          </a>
                        </small>
                        <br />
                        <small>
                          <a href={`tel:${lister.phone}`}>Contact Via Phone</a>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <h2>
                    <u>Reviews</u>
                  </h2>
                  <div className="row mb-6 mt-4">
                    <div>
                      <h3>John Doe</h3>
                      <p className="text-primary font-weight-bolder">
                        <div className="stars text-left">
                          {[...Array(4)].map(() => (
                            <i className="fa fa-star mr-1"></i>
                          ))}{" "}
                          4.0
                        </div>
                      </p>
                    </div>
                    <p className="mt-2">
                      This is some additional paragraph placeholder content. It
                      has been written to fill the available space and show how
                      a longer snippet of text affects the surrounding content.
                      We'll repeat it often to keep the demonstration flowing,
                      so be on the lookout for this exact same string of text.
                    </p>
                  </div>
                  <hr className="featurette-divider" />
                  <form>
                    <div className="form-row">
                      <div className="col form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          defaultValue={localStorage.getItem("fname")}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Ratings</label>
                      <br />
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="rating_num"
                          value="1"
                        />
                        <span className="custom-control-label"> 1 </span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="rating_num"
                          value="2"
                        />
                        <span className="custom-control-label"> 2 </span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="rating_num"
                          value="3"
                        />
                        <span className="custom-control-label"> 3 </span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="rating_num"
                          value="4"
                        />
                        <span className="custom-control-label"> 4 </span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <input
                          className="custom-control-input"
                          type="radio"
                          name="rating_num"
                          value="5"
                        />
                        <span className="custom-control-label"> 5 </span>
                      </label>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Comment</label>
                        <textarea
                          className="form-control"
                          placeholder="Type Comment Here..."
                          rows="6"
                          name="comment"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: "10px" }}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <hr className="featurette-divider" />
          </div>
        )}
      </main>

      <footer className="container">
        <p className="float-end">
          <a href="#">Back to top</a>
        </p>
        <p>
          &copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a>{" "}
          &middot; <a href="#">Terms</a>
        </p>
      </footer>
    </div>
  );
}
