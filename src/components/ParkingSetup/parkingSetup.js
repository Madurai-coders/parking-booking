import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import React, { useState, useEffect } from "react";

function ParkingSetup({ slot }) {
  const eventHandler = (e, data) => {
    console.log("Event Type", e.type);
    console.log(data && data.lastX);
  };

  useEffect(() => {
    console.log("slot");
    console.log(slot);
  }, []);

  return (
    <div className="card-width-height1">
      <div class="d-flex flex-wrap" style={{ height: "1000px" }}>
        {slot &&
          slot.map((wing, id) => {
            return (
              <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                onMouseDown={eventHandler}
                onStart={eventHandler}
                onDrag={eventHandler}
                onStop={eventHandler}
                bounds="parent"
              >
                <div
                  style={{
                    borderLeft: "2px solid blue",
                    borderRight: "2px solid blue",
                    borderBottom: "2px solid blue",
                    padding: "1rem",
                    width: "1.5%",
                    height: "50px",
                    margin: "1px",
                  }}
                >
                  {id}
                </div>
              </Draggable>
            );
          })}
      </div>
    </div>
  );
}

export default ParkingSetup;
