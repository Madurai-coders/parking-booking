import React,{useState} from "react";
import { Helmet } from "react-helmet";
import { Link} from "react-router-dom";
import "../assets/css/user_login/user_login.css"
import logo from "../assets/images/munidex_logo.jpeg"
import { FcGoogle } from "react-icons/fc";
import { validation_mobile_number , validation_name } from "../functions/reusable_functions";
import { toast } from "react-toastify";




export default function User_login() {

  const [form_values, setForm_values] = useState({
		accountnumber: "not_selected",
		lastname: "not_selected",
  });

  const toastifyfail = () => {
		toast.error("Please enter vaild  details", {
			position: "bottom-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			className: "submit-feedback success",
			toastId: "notifyToast",
		});
	};


  function form_validate() {
		let val = false;
		var value = { ...form_values };
		if (
			validation_mobile_number(form_values.accountnumber).class == "pass" &&
			validation_name(form_values.lastname).class == "pass" 
		) {
			val = true;
		} else {
            toastifyfail();

			if (form_values.accountnumber == "not_selected") {
				value = { ...value, accountnumber: "" };
			}
			if (form_values.lastname == "not_selected") {
				value = { ...value, lastname: "" };
			}
		setForm_values(value);
		return val;
	}
}


    return (
        <>
          <Helmet>
            <title>Munidex Parking - User login </title>
          </Helmet>

          <div className="user_login">
            <div className="user_login_card_container text-center">
              <div className="user_login_card shadow">
                <div><img src={logo} alt="munidex_logo" className="user_login_signin_logo m-4"/></div>
                <div className="user_login_signin_text text-center mt-4 mb-4">
                  Sign in
                </div>
                <input type="text" 
                	onBlur={(e) =>
                    setForm_values({
                      ...form_values,
                      accountnumber: e.target.value,
                    })
                  }
                  onChange={(e) =>
                    setForm_values({
                      ...form_values,
                      accountnumber: e.target.value,
                    })
                  }
                  className={'user_login_signin_acntnumber mb-5' + ' ' + validation_mobile_number(form_values.accountnumber).class} 
                  id="acnumber"
                  name="accountnumber"
                  required
                  placeholder="Account number" 
                  /> 

                <input type="text" 
                                	onBlur={(e) =>
                                    setForm_values({
                                      ...form_values,
                                      lastname: e.target.value,
                                    })
                                  }
                                  onChange={(e) =>
                                    setForm_values({
                                      ...form_values,
                                      lastname: e.target.value,
                                    })
                                  }
                                  className={'user_login_signin_lastname mb-5' + ' ' + validation_name(form_values.lastname).class} 
                                  id="lname"
                                  name="lastname"
                                  required
                                  placeholder="Last name" 
                                  />
                                  
                <div className="text-center"><Link to="/dashboard"><div className="user_login_login_button text-center mb-3">Login</div></Link></div>
                <div className="text-center user_login_text_or mb-3"> or </div>
                <div className="text-center"><div className="text-center user_login_google_button mb-4"> <FcGoogle size={28}/> Continue with Google </div> </div>          
              </div>
              </div>
          </div> 
        </>
      );
    }
    