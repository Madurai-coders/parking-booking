import React, { useState } from "react";
import "./loader.css";
export default function Loader(props) {
  return (
    <>
      <div className="overlay_loader">
        <div className="row">
          <div className="col-3 m-3">
            <div className="col-3 d-flex flex-column">
              <div className="skl_1"></div>
              <div className="col-3 mt-4">
                <div className="skl_2"></div>
              </div>
              <div className="col-3 mt-2">
                <div className="skl_3"></div>
              </div>
              <div className="col-3 mt-5">
                <div className="skl_4 mt-4"></div>
              </div>
            </div>
          </div>

        
          <div className="col-xl-2 col-lg-2 mt-3">
            <div className="card_skl mt-1"></div>
          </div>
          <div className="col-xl-2 col-lg-2 mt-3">
            <div className="card_skl mt-1"></div>
          </div>
          <div className="col-xl-2 col-lg-2 mt-3">
            <div className="card_skl mt-1"></div>
          </div>
          <div className="col-xl-2 col-lg-2 mt-3">
            <div className="card_skl mt-1"></div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xl-5 col-lg-5 m-3">
            <div className="th_skl"> </div>
            <div className="d-flex flex-column">
              <div className="td_skl d-flex flex-row mt-4">
                <button type="button" className="td btn btn-secondary"></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
              </div>
            </div>

            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 m-3">
            <div className="graph_skl"></div>
          </div>
        </div>

        
        <div className="row mt-5">
          <div className="col-xl-5 col-lg-5 m-3">
            <div className="th_skl"> </div>
            <div className="d-flex flex-column">
              <div className="td_skl d-flex flex-row mt-4">
                <button type="button" className="td btn btn-secondary"></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
                <button
                  type="button"
                  className="td_1 btn btn-secondary "
                ></button>
              </div>
            </div>

            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
            <div className="td_skl d-flex flex-row mt-4">
              <button type="button" className="td btn btn-secondary"></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
              <button
                type="button"
                className="td_1 btn btn-secondary "
              ></button>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 m-3">
            <div className="graph_skl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
