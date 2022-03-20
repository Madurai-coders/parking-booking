import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

export default function Table(props) {

 

    return(
        <>
        

                      {props.data && props.headers &&

<CSVLink data={props.data} headers={props.headers}>  
      Download me
</CSVLink>}
                       <table className="booking_report_table">
                          <tr className="booking_report_table_headers">

                          {props.headers &&
                            props.headers.map((headers, id) => {
                              return (
                                <th key={id}>
                                {headers.label}
                                </th>
                              );
                            })}
                          </tr>

                         {props.data &&
                            props.data.map((data, id) => {
                              return (
                                <tr key={id}
                                  className="booking_report_table_data"
                                >

                                <th key={id}>
                                {data.S_No}
                                </th>
                                <th key={id}>
                                {data.Date}
                                </th>
                                <th key={id}>
                                {data.No_of_pay}
                                </th>
                                 <th key={id}>
                                {data.Amount}
                                </th>
                                
                                </tr>
                              );
                            })}

                        </table>
        
        </>
    )
}
