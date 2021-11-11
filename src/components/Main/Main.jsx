import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Main.css";
import Header from "./nav/Header";
import Spinner from "../Spinner";

import { getAllListings } from "../../utils/apiMethods";
import Hero from "./nav/Hero";

export default function Main() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllListings()
      .then((response) => {
        setLoading(false);
        setListings(response.data.data);
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

            <div className="row row-cols-1 row-cols-md-2 g-4">
              {listings.map((item) => (
                <div key={item.id} className="col d-flex align-items-stretch">
                  <div className="card listing-card">
                    <img
                      src={item.listing_images[1]}
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
                        <i class="fas fa-map-marker-alt"></i> {item.location}
                      </h6>

                      <p className="card-text mt-3">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
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
