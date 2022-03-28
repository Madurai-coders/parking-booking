import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { usePapaParse } from "react-papaparse";
import {
  axios_call,
  axios_call_auto,
  formatUsd,
  validation_email,
} from "../../functions/reusable_functions";
export default function Table(props) {
  const [data, setData] = useState(props.data);
  const [headers, setHeaders] = useState(props.headers);
  const [headers_excel, setHeaderExcel] = useState(props.headers);
  const [data_excel, setDataExcel] = useState(props.data);
  const [array, setarray] = useState([]);
  const [get_mail, setGetMail] = useState({
    flag: false,
    mail: "",
    status: "send",
    validation: "",
    describe: "",
  });

  function removeCol(head, val) {
    var store = [];
    var header = [];
    var array_store = array;
    // if(head){
    if (!array.includes(head)) {
      array_store.push(head);
    } else {
      array_store = array_store.filter((n) => {
        return n != head;
      });
    }
    // }
    //   else{
    //         array_store=val
    //     }

    data.forEach((element) => {
      array_store.forEach((element1) => {
        element = { ...element, [element1]: null };
      });
      store.push(element);
    });
    console.log(store);

    headers.forEach((element) => {
      if (!array_store.includes(element.key)) header.push(element);
    });

    console.log(store);
    console.log(array_store);
    console.log(header);
    setarray(array_store);
    setHeaderExcel(header);
    setDataExcel(store);
  }

  useEffect(() => {
    setHeaders(props.headers);
    setData(props.data);
    setHeaderExcel(props.headers);
    setDataExcel(props.data);
    // if(props.table_data){
    //     const myArray = props.table_data.table_data.split(",");
    //     console.log(props.table_data.table_data)
    //     removeCol(false,myArray)
    //     setarray(myArray)
    // }
    setarray([]);
  }, [props.data, props.headers]);

  const { jsonToCSV } = usePapaParse();

  function click() {
    setGetMail({ ...get_mail, status: "Sending" });

    var headers_array = [];

    headers_excel.forEach((element) => {
      headers_array.push(element.label);
    });

    var data_array = [];

    data_excel.forEach((element) => {
      var res = [];

      for (var i in element) {
        if (!array.includes(i)) {
          console.log(i);
          res.push(element[i]);
        }
      }

      data_array.push(res);
    });

    if (array && data_array) {
      const results = jsonToCSV({
        fields: headers_array,
        data: data_array,
      });
      console.log("---------------------------");
      console.log("Results:", results);
      console.log("---------------------------");

      var data = {
        to: get_mail.mail,
        csv: results,
        name: "zenGov parking",
      };
      axios_call("POST", "email_with_attachment/", data).then((response) => {
        console.log(response);
        if (response) {
          setGetMail({
            flag: false,
            mail: "",
            status: "Send",
            validation: "",
            describe: "",
            sent: "success",
          });
          setTimeout(() => {
            setGetMail({
              flag: false,
              mail: "",
              status: "Send",
              validation: "",
              describe: "",
              sent: "",
            });
          }, 2000);
        } else {
          setGetMail({
            flag: false,
            mail: "",
            status: "Send",
            validation: "",
            describe: "",
            sent: "failed",
          });
        }
        setTimeout(() => {
          setGetMail({
            flag: false,
            mail: "",
            status: "Send",
            validation: "",
            describe: "",
            sent: "",
          });
        }, 2000);
      });
    }
  }

  function mailSubmit() {
    console.log(validation_email(get_mail.mail));
    if (validation_email(get_mail.mail).class == "pass") {
      click(get_mail.mail);
    } else {
      setGetMail({
        ...get_mail,
        validation: "Check the mail id you have entered",
      });
    }
  }

  return (
    <>
      {get_mail.sent == "success" && (
        <div class="alert alert-success" role="alert">
          Mail delivered successful
        </div>
      )}
      {get_mail.sent == "failed" && (
        <div class="alert alert-success" role="alert">
          Mail delivered failed
        </div>
      )}
      {get_mail.flag && (
        <div class="overlay1">
          {get_mail.validation && (
            <div class="alert alert-danger" role="alert">
              {get_mail.validation}
            </div>
          )}

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Enter recipient mail id</h5>
              </div>
              <div class="form-group p-3">
                <input
                  type="email"
                  class="form-control mb-1"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  autoFocus
                  onChange={(e) => (
                    setGetMail({ ...get_mail, validation: "" }),
                    setGetMail({
                      ...get_mail,
                      mail: e.target.value,
                      validation: "",
                    })
                  )}
                  placeholder="Enter email"
                />
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={mailSubmit}
                  class="btn btn-primary btn-sm"
                  disabled={get_mail.status == "Sending" ? true : false}
                >
                  {get_mail.status}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setGetMail({
                      flag: false,
                      mail: "",
                      status: "send",
                      validation: "",
                      describe: "",
                    })
                  }
                  class="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {data && headers && (
        <div className="m-1 mb-2">
          <CSVLink
            filename="results.csv"
            target="/"
            data={data_excel}
            headers={headers_excel}
            class="btn btn-primary btn-sm"
          >
            Download
          </CSVLink>
          <button
            type="button"
            onClick={() => setGetMail({ ...get_mail, flag: true })}
            class="btn btn-outline-primary btn-sm mx-1 "
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
          >
            Mail
          </button>
        </div>
      )}
      <div className="booking_report_table_container_mini">
        <table className="booking_report_table table">
          <tr className="payment_table_heading1">
            {headers &&
              headers_excel.map((headers, id) => {
                return (
                  <th
                    key={id}
                    bgcolor={
                      !array.includes(headers.key) ? " #ececec" : "#e2f5ff"
                    }
                    // onClick={() => removeCol(headers.key)}
                    style={{ padding: "1% 0%", position: "sticky" }}
                  >
                    {headers.label}
                  </th>
                );
              })}
          </tr>

          {data &&
            data_excel.map((data, id) => {
              return (
                <tr key={id} className="booking_report_table_data">
                  {<td className="data1">{data.data1}</td>}
                  {<td className="data2"> {data.data2}</td>}
                  {<td className="data3">{data.data3}</td>}
                  {<td className="data4"> {data.data4}</td>}
                  {<td className="data5"> {data.data5}</td>}
                  <td className="data5">{data.data6 && data.data6}</td>
                  <td className="data5">{data.data7 && data.data7}</td>
                  <td className="data5">{data.data8 && data.data8}</td>
                  <td className="data5">{data.data9 && data.data9}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
}
