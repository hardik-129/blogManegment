import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Loginpage.css"
// import axios from "axios"
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2'
import Http from '../Http'
import useCountStore from './Zustand/Store'

const url = (process.env.REACT_APP_API_KEY);

function LoginPage() {
	// console.log(url);
	const data = useCountStore((state) => state.data)

	

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
		  toast.onmouseenter = Swal.stopTimer;
		  toast.onmouseleave = Swal.resumeTimer;
		}
	        });
	
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (event) => {
		setEmail(event.target.value)
	}

	const handlePassword = (evant) => {

		setPassword(evant.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		
		let payload = { email, password }

		Http.callApi('post',url + 'login',payload)
		// axios.post("https://blog-api-dev.octalinfotech.com/api/login", payload)
		.then((response) => {
			localStorage.setItem('token', response.data.data.token)
			Http.setBearerToken(response.data.data.token)
			console.warn(JSON.stringify(data.email));

			navigate("/admin/dashbord")
			
			Toast.fire({
				icon: "success",
				title: response.data.message,
			        });
			        localStorage.setItem("name",response.data.data.name);

		}).catch((error)=>{
			console.log(error);

			Toast.fire({
				icon : "error",
				title: error.response.data.message,
			})



		})
	}

	return (
		<div>
			<div className="container">
				<img className='login-img' src="https://lh3.googleusercontent.com/p/AF1QipOMj-dseZ54sUzotNCrFSHiBnOGUrpI64eCxSzM=s680-w680-h510" alt="" />
				<div className="screen ">
					<div className="screen__content">
						<form className="login">
							<div className="login__field">
								<i className="login__icon fas fa-user"></i>
								<input value={email} onChange={handleEmail} type="text" className="login__input" placeholder="User name " />
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input value={password} onChange={handlePassword} type="password" className="login__input" placeholder="Password" />
							</div>
							<button onClick={handleSubmit} className="button login__submit">
								<span className="button__text">Log In</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>

						</form>

					</div>

					<div className="screen__background">
						<span className="screen__background__shape screen__background__shape4"></span>
						<span className="screen__background__shape screen__background__shape3"></span>
						<span className="screen__background__shape screen__background__shape2"></span>
						<span className="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>
		</div>
	)
};

export default LoginPage;