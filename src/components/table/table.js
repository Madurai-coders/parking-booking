import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { usePapaParse } from "react-papaparse";
import {
  axios_call,
  axios_call_auto,
  formatUsd,
  validation_email,
  validation_inquiry,
  validation_title
} from "../../functions/reusable_functions";
import send from "../../assets/images/send.svg";
import { IoTrashOutline } from "react-icons/io5";
 import NoData from "../../assets/images/no_data.png"
export default function Table(props) {
  const [data, setData] = useState(props.data);
  const [headers, setHeaders] = useState(props.headers);
  const [headers_excel, setHeaderExcel] = useState(props.headers);
  const [data_excel, setDataExcel] = useState(props.data);
  const [array, setarray] = useState([]);
  const [setting, setSetting] = useState(false);
  
  const [get_mail, setGetMail] = useState({
    flag: false,
    mail: "",
    status: "send",
    validation: "",
    describe: "",
    description:''
  });

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
        description:get_mail.description,
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
            description:"",
            sent: "success",
          });
          setTimeout(() => {
            setGetMail({
              flag: false,
              mail: "",
              status: "Send",
              validation: "",
              describe: "",
            description:"",
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
            description:"",
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
            description:"",
            sent: "",
          });
        }, 2000);
      });
    }
  }

  function mailSubmit() {
    console.log(validation_email(get_mail.mail));
    if (validation_email(get_mail.mail).class == "pass" && validation_title(get_mail.description) ) {
      click(get_mail.mail);
    } else {
      setGetMail({
        ...get_mail,
        validation: "Check the mail id you have entered",
      });
    }
  }

  function removeCol(head, val) {
    var store = [];
    var header = [];
    var array_store = array;
    if (head) {
      if (!array.includes(head)) {
        array_store.push(head);
      } else {
        array_store = array_store.filter((n) => {
          return n != head;
        });
      }
    } else {
      array_store = val;
    }

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

    setarray(array_store);
    setHeaderExcel(header);
    setDataExcel(store);

    var string = "";
    array_store.forEach((element, id) => {
      string = string + element;
      if (array_store.length != id + 1) {
        string = string + ",";
      }
    });
    if (!array_store) {
      string = "null";
    }

    var updated_data = {
      table_name: props.table_data.table_name,
      table_data: string,
    };
    console.log("---------------------------");
    console.log(updated_data);
    console.log("---------------------------");

    if (head) {
      axios_call(
        "PUT",
        "TableData/" + props.table_data.table_name + "/",
        updated_data
      ).then((response) => {
        console.log(response);
      });
    }
  }

  useEffect(() => {
    setHeaders(props.headers);
    setData(props.data);
    setHeaderExcel(props.headers);
    setDataExcel(props.data);
    if (props.table_data) {
      const myArray = props.table_data.table_data.split(",");
      console.log(props.table_data.table_data);
      removeCol(false, myArray);
      setarray(myArray);
    }
  }, [props.data, props.headers]);

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
                    // setGetMail({ ...get_mail, validation: "" }),
                    setGetMail({
                      ...get_mail,
                      mail: e.target.value,
                      validation: "",
                    })
                  )}
                  placeholder="Enter email"
                />

               <textarea 
               row='5'
                  type="text"
                  class="form-control mb-1 mt-3"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => (
                    setGetMail({
                      ...get_mail,
                      description: e.target.value,
                      validation: "",
                    })
                  )}
                  placeholder="Description"
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
                  class="btn btn-light btn-sm"
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
        <div className="m-1 mb-2 text-end">
          <CSVLink
            filename="ZenGov_Parking_data.csv"
            target="/"
            data={data_excel}
            headers={headers_excel}
            class="btn btn-light btn-sm"
          >
            <i class="fa fa-download" aria-hidden="true"></i>
          </CSVLink>
          <button
            type="button"
            onClick={() => setGetMail({ ...get_mail, flag: true })}
            class="btn btn-light btn-sm mx-1 "
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
          >
            <i class="fa fa-envelope" aria-hidden="true"></i>
          </button>
          <div class="btn btn-light btn-sm" onClick={() => setSetting(true)}>
            <i class="fa fa-cog" aria-hidden="true"></i>
          </div>
        </div>
      )}
      <div className="booking_report_table_container_mini shadow mb-5  ">
        <table className="booking_report_table table">
          <tr className="payment_table_heading1">
            {headers_excel &&
              headers_excel.map((headers, id) => {
                return (
                  <th
                    key={id}
                    bgcolor={'#ececec'}
                    style={{ padding: "1% 0%", position: "sticky" }}
                  >
                    {headers.label}
                  </th>
                );
              })}
            {props.controls == true && <th  bgcolor={'#ececec'}
                    style={{ padding: "1% 0%", position: "sticky" }}>**</th>}
          </tr>

          {data_excel&&data_excel[0] ?
            <>{data_excel.map((data, id) => {
              return (
                <tr key={id} className="booking_report_table_data">
                  {data.data1 != undefined && <td>{data.data1}</td>}
                  {data.data2 != undefined && <td> {data.data2}</td>}
                  {data.data3 != undefined && <td>{data.data3}</td>}
                  {data.data4 != undefined && <td> {data.data4}</td>}
                  {data.data5 != undefined && <td> {data.data5}</td>}
                  {data.data6 != undefined && <td> {data.data6}</td>}
                  {data.data7 != undefined && <td> {data.data7}</td>}
                  {data.data8 != undefined && <td> {data.data8}</td>}
                  {data.data9 != undefined && <td> {data.data9}</td>}
                  {data.data10 != undefined && <td> {data.data10}</td>}
                  {data.data11 != undefined && <td> {data.data11}</td>}
                  {props.controls == true && (
                    <td>
                        <div className="d-flex justify-content-center">
                      <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    props.remove(props.data[id].id)
                                  }
                                  className='text-muted'
                                ><i si class="fa fa-trash" aria-hidden="true"></i>
</div>
                                <img
                                  style={{ cursor: "pointer" }}
                                  src={send} 
                                  className="px-2"
                                  onClick={() => props.mail(props.data[id].id)}
                                /></div>
                               

                    </td>
                  )}
                </tr>
              );
            })}</>:
<>        
<td colspan={headers_excel.length}>
    <img src={NoData} style={{width:'275px', marginTop:'50px'}}></img></td>
            </>

            }
        </table>
      </div>

      {setting && (
        <div className="overlay_table shadow-lg">
          <div className="text-end mx-3 mt-2">
            <div class="btn btn-light btn-sm" onClick={() => setSetting(false)}>
              <i class="fa fa-close"  aria-hidden="true"></i>
            </div>
          </div>
          <div className="h3 text-center">Add/Remove Data</div>
          <div className="mt-1 p-4 mx-5 ">
            <div className="booking_report_table_container_mini ">
              <table className="booking_report_table table">
                <tr className="payment_table_heading1">
                  {headers &&
                    headers.map((headers, id) => {
                      return (
                        <th
                          key={id}
                          bgcolor={
                            !array.includes(headers.key)
                              ? " #ececec"
                              : "#e2f5ff"
                          }
                          onClick={() => removeCol(headers.key)}
                          style={{ padding: "1% 0%", position: "sticky" }}
                        >
                          {headers.label}
                        </th>
                      );
                    })}
                </tr>

                {data &&
                  data.map((data, id) => {
                    return (
                      <tr key={id} className="booking_report_table_data">
                        <td>{data.data1}</td>
                        <td> {data.data2}</td>
                        <td>{data.data3}</td>
                        <td> {data.data4}</td>
                        <td> {data.data5}</td>
                        <td>{data.data6}</td>
                        <td>{data.data7}</td>
                        <td>{data.data8}</td>
                        <td>{data.data9}</td>
                        <td>{data.data10}</td>
                        <td>{data.data11}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
