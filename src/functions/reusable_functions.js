import { db, firebase } from "../core/firebase/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export function formatUsd(val) {
  return "$ " + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function generateUUID_334() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxx-xxx-xxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function axios_call_unauthenticated(method, url, data) {
  return new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: "https://parkingdev1.munidex.info/" + url,
      data: data,
    }).then((response) => {
      resolve(response.data);
    });
  });
}

export function axios_call(method, url, data) {
  return new Promise(function (resolve, reject) {
    var access_token = Cookies.get("access_token");
    axios({
      method: method,
      url: "https://parkingdev1.munidex.info/" + url,
      data: data,
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((response) => {
        var refresh = Cookies.get("refresh_token");
        axios({
          method: "POST",
          url: "https://parkingdev1.munidex.info/api/token/refresh/",
          data: { refresh: refresh },
          withCredentials: true,
        })
          .then((response) => {
            Cookies.set("refresh_token", response.data.refresh);
            Cookies.set("access_token", response.data.access);
            axios({
              method: method,
              url: "https://parkingdev1.munidex.info/" + url,
              data: data,
              headers: { Authorization: `Bearer ${response.data.access}` },
              withCredentials: true,
            }).then((response) => {
              resolve(response.data);
            }).catch((val)=> {
                resolve('failed')
            })

          })
          .catch((response) => {
            // logout();
            
          });
      });
  });
}


export function axios_call_error(method, url, data) {
    return new Promise(function (resolve, reject) {
      var access_token = Cookies.get("access_token");
      axios({
        method: method,
        url: "https://parkingdev1.munidex.info/" + url,
        data: data,
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          var refresh = Cookies.get("refresh_token");
          axios({
            method: "POST",
            url: "https://parkingdev1.munidex.info/api/token/refresh/",
            data: { refresh: refresh },
            withCredentials: true,
          })
            .then((response) => {
              Cookies.set("refresh_token", response.data.refresh);
              Cookies.set("access_token", response.data.access);
              axios({
                method: method,
                url: "https://parkingdev1.munidex.info/" + url,
                data: data,
                headers: { Authorization: `Bearer ${response.data.access}` },
                withCredentials: true,
              }).then((response) => {
                resolve(response.data);
              }).catch((response) => {
                resolve('failed')
              });
            })
            .catch((response) => {
            //   logout();
            });
        });
    });
  }

export function axios_call_auto(method, url, data) {
  return new Promise(function (resolve, reject) {
    var access_token = Cookies.get("access_token");
    axios({
      method: method,
      url: url,
      data: data,
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((response) => {
        var refresh = Cookies.get("refresh_token");

        axios({
          method: "POST",
          url: "https://parkingdev1.munidex.info/api/token/refresh/",
          data: { refresh: refresh },
          withCredentials: true,
        })
          .then((response) => {
            Cookies.set("refresh_token", response.data.refresh);
            Cookies.set("access_token", response.data.access);
            axios({
              method: method,
              url: url,
              data: data,
              headers: { Authorization: `Bearer ${response.data.access}` },
            }).then((response) => {
              resolve(response.data);
            });
          })
          .catch((response) => {
            // logout();
          });
      });
  });
}

export function login(checkadmin) {
    console.log('data')

  return new Promise(function (resolve, reject) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        console.log(data)
        var access_token = "";
        if (data.additionalUserInfo.isNewUser) {
          axios({
            method: "POST",
            url: "https://parkingdev1.munidex.info/register/",
            data: {
              username: data.user.email,
              password: data.user.uid,
              first_name:data.user.displayName
            },
            withCredentials: true,
          }).then((response_created) => {
            console.log(response_created)
            console.log('response_created')
            axios({
              method: "POST",
              url: "https://parkingdev1.munidex.info/api/jwt_token/",
              data: {
                username: data.user.email,
                password: data.user.uid,
              },
              withCredentials: true,
            }).then((response) => {
              Cookies.set("refresh_token", response.data.refresh);
              Cookies.set("access_token", response.data.access);
            // axios_call('POST',"CreateBusinessPartner",{
            //                 email:response_created.data.username,
            //                 lastName:data.user.displayName,
            //                 accountHolder:response_created.data.id,
            //                 userName:data.user.displayName,
            //                 accountNumber: Math.floor(10000000 + Math.random() * 90000),
            //                 uId:response_created.data.id

            //             })
              if (!checkadmin) {
                resolve(data);
              } else {
                resolve({ data, access: response.data.access });
              }
            });
          });
        } else {
          axios({
            method: "POST",
            url: "https://parkingdev1.munidex.info/api/jwt_token/",
            // data: {
            //   username: 'maduraicoders@gmail.com',
            //   password: 'nTSNMkEKIhPMIpsti0HoJbOyvID3',
            // },
            data: {
                username: data.user.email,
                password: data.user.uid,
              },
            withCredentials: true,
          }).then((response) => {
            console.log(response)
            console.log('token')
            Cookies.set("refresh_token", response.data.refresh);
            Cookies.set("access_token", response.data.access);
            if (!checkadmin) {
              resolve(false);
            } else {
              resolve({data:true, access: response.data.access });
            }
          });
        }
      });
  });
}


export function email_login(checkadmin,email,password) {
    console.log(email)
    console.log(password)
    return new Promise(function (resolve, reject) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
    console.log(data)

          var access_token = "";
          if (data.additionalUserInfo.isNewUser) {
            axios({
              method: "POST",
              url: "https://parkingdev1.munidex.info/register/",
              data: {
                username: data.user.email,
                password: data.user.uid,
              },
              withCredentials: true,
            }).then((response) => {
              axios({
                method: "POST",
                url: "https://parkingdev1.munidex.info/api/jwt_token/",
                data: {
                  username: data.user.email,
                  password: data.user.uid,
                },
                withCredentials: true,
              }).then((response) => {
                Cookies.set("refresh_token", response.data.refresh);
                Cookies.set("access_token", response.data.access);
  
                if (!checkadmin) {
                  resolve(data);
                } else {
                  resolve({ data, access: response.data.access });
                }
              });
            });
          } else {
            axios({
              method: "POST",
              url: "https://parkingdev1.munidex.info/api/jwt_token/",
              // data: {
              //   username: 'maduraicoders@gmail.com',
              //   password: 'nTSNMkEKIhPMIpsti0HoJbOyvID3',
              // },
              data: {
                  username: data.user.email,
                  password: data.user.uid,
                },
              withCredentials: true,
            }).then((response) => {
              Cookies.set("refresh_token", response.data.refresh);
              Cookies.set("access_token", response.data.access);
              if (!checkadmin) {
                resolve(response.data);
              } else {
                resolve({data:true, access: response.data.access });
              }
            });
          }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            resolve('error')
          });
    });
}
  
export function passwordLesslogin(email){
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };



      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

//Validation_function
export function logout() {
  return new Promise(function (resolve, reject) {
    const data = firebase.auth().signOut();
    if (data) {
      resolve(true);
    }
    setTimeout(() => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }, 1000);
  });
}

export function validation_value(value) {
    if (value == "" || value != "not_selected") {
      if (value) {
       
          if (value.length >= 1) {
                  return {
                    class: "pass",
                  };
                }
                else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Min 1 tetter.</small>
                </>
              ),
            };
        }
        else{
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">This field is a required.</small>
            </>
          ),
        };
    }
    }
    if (value == "not_selected") return "";
  }
//validation for first name lastname
export function validation_name(value) {
  var format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?0-9]+/;
  if (value == "" || value != "not_selected") {
    // console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (!format.test(value)) {
            if (value.length <= 50) {
              if (!value.endsWith(" ")) {
                return {
                  class: "pass",
                };
              } else
                return {
                  class: "warn",
                  msg: (
                    <>
                      <small className="text-danger">
                        Cannot end with a white space
                      </small>
                    </>
                  ),
                };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">Max letter 50</small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">
                    Cannot contain symbol or number.
                  </small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Min 1 tetter.</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Cannot start with empty space</small>
            </>
          ),
        };
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">This field is a required.</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

export function validation_char(value) {
    if (value == "" || value != "not_selected") {
      // console.log(value);
      if (value) {
        if (!value.startsWith(" ")) {
          if (value.length >= 1) {
              if (value.length <= 50) {
                if (!value.endsWith(" ")) {
                  return {
                    class: "pass",
                  };
                } else
                  return {
                    class: "warn",
                    msg: (
                      <>
                        <small className="text-danger">
                          Cannot end with a white space
                        </small>
                      </>
                    ),
                  };
              } else
                return {
                  class: "warn",
                  msg: (
                    <>
                      <small className="text-danger">Max letter 50</small>
                    </>
                  ),
                };
            
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Min 1 tetter.</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Cannot start with empty space</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">This field is a required.</small>
            </>
          ),
        };
    }
    if (value == "not_selected") return "";
  }

//Validation for title
export function validation_title(value) {
  if (value == "" || value != "not_selected") {
    console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (value.length <= 150) {
            if (!value.endsWith(" ")) {
              return {
                class: "pass",
              };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">
                      Cannot end with white space
                    </small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Max length is 150</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Min length is 1</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Cannot start with white space</small>
            </>
          ),
        };
    } else return "";
  }
  if (value == "not_selected") return "";
}


export function validation_password(value) {
    if (value == "" || value != "not_selected") {
      console.log(value);
      if (value) {
        if (!value.startsWith(" ")) {
          if (value.length >= 6) {
            if (value.length <= 150) {
              if (!value.endsWith(" ")) {
                return {
                  class: "pass",
                };
              } else
                return {
                  class: "warn",
                  msg: (
                    <>
                      <small className="text-danger">
                        Cannot end with white space
                      </small>
                    </>
                  ),
                };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">Max length is 18</small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Min length is 6</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Cannot start with white space</small>
              </>
            ),
          };
      } else return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">This field is a required</small>
          </>
        ),
      };;
    }
    if (value == "not_selected") return "";
}


export function validation_mobile_number(value) {
  if (value == "" || value != "not_selected") {
    console.log(value);
    var phoneno = /^([0-9].{9}|[0-9].{11})$/;
    if (value) {
      if (phoneno.test(value)) {
        return {
          class: "pass",
        };
      } else {
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">
                Please Enter A Valid Phone Number
              </small>
            </>
          ),
        };
      }
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">This field is a required.</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

//Validation for company
export function validation_company(value) {
  if (value == "" || value != "not_selected") {
    console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (value.length <= 50) {
            if (!value.endsWith(" ")) {
              return {
                class: "pass",
              };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">
                      Cannot end with white space
                    </small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Max length is 150</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Min length is 1</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Cannot start with white space</small>
            </>
          ),
        };
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">This field is a required.</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}
// Email validation
export function validation_email(value) {
  if (value == "" || value != "not_selected") {
    // console.log(value);
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})+$/; //{3,4}is used to change the count of word after .com or net
    if (value) {
      if (regex.test(value)) {
        return {
          class: "pass",
        };
      } else {
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Please enter a valid E-mail</small>
            </>
          ),
        };
      }
    } else {
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">This field is a required.</small>
          </>
        ),
      };
    }
  }
  if (value == "not_selected") return "";
}

//Country validation
export function validation_country(value) {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/;
  if (value == "" || value != "not_selected") {
    console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (value.length <= 56) {
            if (!value.endsWith(" ")) {
              if (!format.test(value)) {
                return {
                  class: "pass",
                };
              } else
                return {
                  class: "warn",
                  msg: (
                    <>
                      <small className="text-danger">invalid name</small>
                    </>
                  ),
                };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">
                      Cannot end with white space
                    </small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Max length is 56</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Min length is 1</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Cannot start with white space</small>
            </>
          ),
        };
    } else return "warn";
  }
  if (value == "not_selected") return "warn";
}

//Inquiry Validation
export function validation_inquiry(value) {
  if (value == "" || value != "not_selected") {
    console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (value.length <= 50) {
            if (!value.endsWith(" ")) {
              return {
                class: "pass",
              };
            } else
              return {
                class: "warn",
                msg: (
                  <>
                    <small className="text-danger">
                      Cannot end with white space
                    </small>
                  </>
                ),
              };
          } else
            return {
              class: "warn",
              msg: (
                <>
                  <small className="text-danger">Max length is 150</small>
                </>
              ),
            };
        } else
          return {
            class: "warn",
            msg: (
              <>
                <small className="text-danger">Min length is 1</small>
              </>
            ),
          };
      } else
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Cannot start with white space</small>
            </>
          ),
        };
    } else return "";
  }
  if (value == "not_selected") return "";
}

//Comment validation
export function validation_comment(value) {
  if (value == "" || value != "not_selected") {
    console.log(value);
    if (value) {
      if (!value.startsWith(" ")) {
        if (value.length >= 1) {
          if (value.length <= 250) {
            if (!value.endsWith(" ")) {
              return {
                class: "pass_text_area",
              };
            } else
              return {
                class: "warn_text_area",
                msg: (
                  <>
                    <small className="text-danger">
                      Cannot end with white space
                    </small>
                  </>
                ),
              };
          } else
            return {
              class: "warn_text_area",
              msg: (
                <>
                  <small className="text-danger">Max length is 250</small>
                </>
              ),
            };
        } else
          return {
            class: "warn_text_area",
            msg: (
              <>
                <small className="text-danger">Min length is 1</small>
              </>
            ),
          };
      } else
        return {
          class: "warn_text_area",
          msg: (
            <>
              <small className="text-danger">Cannot start with white space</small>
            </>
          ),
        };
    } else
      return {
        class: "warn_text_area",
        msg: (
          <>
            <small className="text-danger">This field is a required.</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

export function validation_payment_id(value) {
  if (value == "" || value != "not_selected") {
    var payment_id = /^[a-zA-Z0-9-]+$/;
    if (value) {
      if (value.match(payment_id) && value.length >= 8 && value.length <= 22) {
        return {
          class: "pass",
        };
      } else {
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Payment id is invalid</small>
            </>
          ),
        };
      }
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">Payment id is a required field</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

export function validation_amount(value) {
  if (value == "" || value != "not_selected") {
    if (value) {
      if (value >= 0 && value < 99999) {
        return {
          class: "pass",
        };
      } else {
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Please Enter A Valid Amount</small>
            </>
          ),
        };
      }
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">Please fill in the amount</small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

export function validation_count(value) {
  if (value == "" || value != "not_selected") {
    if (value) {
      if (value > 0 && value < 101) {
        return {
          class: "pass",
        };
      } else {
        return {
          class: "warn",
          msg: (
            <>
              <small className="text-danger">Please Enter A Valid Count</small>
            </>
          ),
        };
      }
    } else
      return {
        class: "warn",
        msg: (
          <>
            <small className="text-danger">
              Please fill in the number of parking slots
            </small>
          </>
        ),
      };
  }
  if (value == "not_selected") return "";
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
