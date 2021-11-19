import { db,firebase } from "../core/firebase/firebase";
import { toast } from "react-toastify";


export function isAuthenticated() {
	return new Promise(function (resolve, reject) {
		if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
			// Additional state parameters can also be passed via URL.
			// This can be used to continue the user's intended action before triggering
			// the sign-in operation.
			// Get the email if available. This should be available if the user completes
			// the flow on the same device where they started it.
			var email = window.localStorage.getItem("emailForSignIn");
			if (!email) {
				// User opened the link on a different device. To prevent session fixation
				// attacks, ask the user to provide the associated email again. For example:
				email = window.prompt("Please provide your email for confirmation");
			}
			// The client SDK will parse the code from the link for you.
			firebase
				.auth()
				.signInWithEmailLink(email, window.location.href)
				.then((result) => {
					// Clear email from storage.
					var user = firebase.auth().currentUser;
					resolve(user);
					// You can access the new user via result.user
					// Additional user info profile not available via:
					// result.additionalUserInfo.profile == null
					// You can check if the user is new or existing:
					// result.additionalUserInfo.isNewUser
				})
				.catch((error) => {
					// Some error occurred, you can inspect the code: error.code
					// Common errors could be invalid email and invalid or expired OTPs.
				});
		}
		var user = firebase.auth().currentUser;

		if (user) {
			db.collection("user")
				.doc(user.uid)
				.get()
				.then((response) => {
					var data = { ...response.data() };
					const myArr = user.email.split("@");
					var userdata = {};
					if (!user.displayName) {
						userdata = {
							...data,
							email: user.email,
							name: myArr[0],
							userid: user.uid,
						};
					} else {
						userdata = {
							...data,
							email: user.email,
							name: user.displayName,
							userid: user.uid,
						};
					}
					db.collection("user").doc(user.uid).set(userdata);
					if (myArr[1] == "munidexparking.com") {
						db.collection("Admin_user_data")
							.doc("TvAQlQdZEcdoI7V0jHLN")
							.update({
								user_val: firebase.firestore.FieldValue.arrayUnion(user.uid),
							});
					}

					resolve(user);
				});
		}
	});
}

export function isAdmin() {
	return new Promise(function (resolve, reject) {
		var user = firebase.auth().currentUser;
		db.collection("Admin")
			.doc("4ESMOgHfdctZaKaenYqC")
			.get()
			.then((response) => {
				var admins = { ...response.data() };
				admins = admins.admins;
				var n = admins.includes(user.uid);
                console.log(n)
				if (n) {
					resolve(user);
				}
				resolve(false);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

export function login() {

	return new Promise(function (resolve) {
		const provider = new firebase.auth.GoogleAuthProvider();
		const data = firebase.auth().signInWithPopup(provider);
		if (data.email !== null) {
			resolve(data);
        
		}
	});
}

export function logout() {
	const toastifylogout = () => {
		toast.error("logout Sucessfull!", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			className: "submit-feedback danger",
			toastId: "notifyToast",
		});
	};
	return new Promise(function (resolve) {
		const data = firebase.auth().signOut();
		window.localStorage.removeItem("emailForSignIn");
		resolve(true);
        setTimeout(() => {
            toastifylogout();
        }, 2000);
	});
}

export function emaillogin(email) {
	return new Promise(function (resolve) {
		console.log(email);
		var actionCodeSettings = {
			url: "http://localhost:3000",
			// This must be true.
			handleCodeInApp: true,
		};

		console.log(actionCodeSettings);

		firebase
			.auth()
			.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				console.log("emaillogin sent");
				window.localStorage.setItem("emailForSignIn", email);
				resolve(true);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				resolve(false);
			});
	});
}


//Validation_function

//validation for first name lastname
export function validation_name(value) {
	var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/;
	if (value == "" || value != "not_selected") {
		console.log(value);
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
											<small class="text-danger">
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
										<small class="text-danger">Max letter 50</small>
									</>
								),
							};
					} else
						return {
							class: "warn",
							msg: (
								<>
									<small class="text-danger">
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
								<small class="text-danger">Min 1 tetter.</small>
							</>
						),
					};
			} else
				return {
					class: "warn",
					msg: (
						<>
							<small class="text-danger">Cannot start with empty space</small>
						</>
					),
				};
		} else
			return {
				class: "warn",
				msg: (
					<>
						<small class="text-danger">This field is a required.</small>
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
										<small class="text-danger">
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
									<small class="text-danger">Max length is 150</small>
								</>
							),
						};
				} else
					return {
						class: "warn",
						msg: (
							<>
								<small class="text-danger">Min length is 1</small>
							</>
						),
					};
			} else
				return {
					class: "warn",
					msg: (
						<>
							<small class="text-danger">Cannot start with white space</small>
						</>
					),
				};
		} else return "";
	}
	if (value == "not_selected") return "";
}


//Validation for mobile number
export function validation_mobile_number(value) {
	if (value == "" || value != "not_selected") {
		console.log(value);
		var phoneno = /^\d{10}$/;
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
							<small class="text-danger">
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
						<small class="text-danger">This field is a required.</small>
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
										<small class="text-danger">
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
									<small class="text-danger">Max length is 150</small>
								</>
							),
						};
				} else
					return {
						class: "warn",
						msg: (
							<>
								<small class="text-danger">Min length is 1</small>
							</>
						),
					};
			} else
				return {
					class: "warn",
					msg: (
						<>
							<small class="text-danger">Cannot start with white space</small>
						</>
					),
				};
		} else
			return {
				class: "warn",
				msg: (
					<>
						<small class="text-danger">This field is a required.</small>
					</>
				),
			};
	}
	if (value == "not_selected") return "";
}
// Email validation
export function validation_email(value) {
	if (value == "" || value != "not_selected") {
		console.log(value);
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
							<small class="text-danger">Please enter a valid E-mail</small>
						</>
					),
				};
			}
		} else {
			return {
				class: "warn",
				msg: (
					<>
						<small class="text-danger">This field is a required.</small>
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
											<small class="text-danger">invalid name</small>
										</>
									),
								};
						} else
							return {
								class: "warn",
								msg: (
									<>
										<small class="text-danger">
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
									<small class="text-danger">Max length is 56</small>
								</>
							),
						};
				} else
					return {
						class: "warn",
						msg: (
							<>
								<small class="text-danger">Min length is 1</small>
							</>
						),
					};
			} else
				return {
					class: "warn",
					msg: (
						<>
							<small class="text-danger">Cannot start with white space</small>
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
										<small class="text-danger">
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
									<small class="text-danger">Max length is 150</small>
								</>
							),
						};
				} else
					return {
						class: "warn",
						msg: (
							<>
								<small class="text-danger">Min length is 1</small>
							</>
						),
					};
			} else
				return {
					class: "warn",
					msg: (
						<>
							<small class="text-danger">Cannot start with white space</small>
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
										<small class="text-danger">
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
									<small class="text-danger">Max length is 250</small>
								</>
							),
						};
				} else
					return {
						class: "warn_text_area",
						msg: (
							<>
								<small class="text-danger">Min length is 1</small>
							</>
						),
					};
			} else
				return {
					class: "warn_text_area",
					msg: (
						<>
							<small class="text-danger">Cannot start with white space</small>
						</>
					),
				};
		} else
			return {
				class: "warn_text_area",
				msg: (
					<>
						<small class="text-danger">This field is a required.</small>
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
