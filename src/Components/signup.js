import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { connect } from 'react-redux'
import { storage } from './firebase/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        DOB: "",
        country: "",
        city: "",
        address: "",
        date: '',
        about: '',
        url1: '',
        image1: null,
        progress1: 0,
        isSignedUp: false
    }
    componentDidMount() {

        var d = new Date()
        var months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July'
            , 'August', 'September', 'October', 'November', 'December', ''
        ]
        var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var dat = day[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + " " + d.getFullYear();
        this.setState({ date: dat })
    }

    verify = () => {
        if (this.state.firstName === "") {
            toast('First Name is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var firstName = this.refs.firstName;
            firstName.focus()
            return false
        }else if (this.state.lastName === "") {
            toast('Last Name is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var lastName = this.refs.lastName;
            lastName.focus()
            return false

        } else if (this.state.email === "") {
            toast('Email is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userEmail = this.refs.userEmail;
            userEmail.focus()
            return false
        } else if (this.state.password === "") {
            toast('Password is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userPassword = this.refs.userPassword;
            userPassword.focus()
            return false
        } else if (this.state.phone === "") {
            toast('Phone Number is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var phoneNum = document.getElementById("phone-num")
            phoneNum.focus()
            return false
        } else if (this.state.gender === "") {
            toast('Gender is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            return false
        } else if (this.state.DOB === "") {
            toast('Date of Birth is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userDOB = this.refs.userDOB;
            userDOB.focus();
            return false
        } else if (this.state.country === "") {
            toast('Country is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userCountry = this.refs.userCountry;
            userCountry.focus()
            return false
        } else if (this.state.city === "") {
            toast('City is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userCity = this.refs.userCity;
            userCity.focus()
            return false
        }
        else if (this.state.address === "") {
            toast('Address is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });

            var userAddress = this.refs.userAddress;
            userAddress.focus()
            return false
        } else if (this.state.password.length <= 6) {
            toast('Password must me 7 characters long!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });
            var userPassword1 = this.refs.userPassword;
            userPassword1.focus()
            return false
        } else {

            var option = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            fetch('/signup', option)
            .then(res => res.json())
            .then(data => {
                    this.setState({isSignedUp:true})
                    localStorage.setItem('user', JSON.stringify(data))
                    toast('Your Account has been created!', {
                        className: 'logout-toast',
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        closeButton: false,
                    });
                    this.props.dispatch({ type: 'Add_user', payload: data })
                    this.props.history.push('/')
                }
                )
                .catch(err => {
                    console.log(err)
                    toast('Something went wrong!', {
                        className: 'logout-toast',
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        closeButton: false,
                    });
                })
        }
    }

    // Profile Picture Upload Code
    handleChange1 = (e) => {
        if (e.target.files[0]) {
            const image1 = e.target.files[0];
            this.setState({ image1 });
        }
    }
    handleUpload1 = () => {
        const { image1 } = this.state;
        const uploadTask = storage.ref(`images/${image1.name}`).put(image1)
        uploadTask.on('state_changed',
            (snapshot) => {
                // progress funcion
                const progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({ progress1 });
            },
            (error) => {
                // error funcion
                console.log(error);
            },
            () => {
                // complete funcion
                storage.ref('images').child(image1.name).getDownloadURL()
                    .then(url1 => {
                        this.setState({ url1 });
                    })
            }
        )
    }

    // Showing hidden upload button and progress bar
    up1 = () => {
        document.getElementById('upBtn1').classList.add('show')
        document.getElementById('upProg1').classList.add('show')
        document.getElementById('upImg1').classList.add('show')
    }

    country1 = (country) => { this.setState({ country }) }
    render() {
        const user = JSON.parse(localStorage.getItem('user')) 
        if(user){
           return <Redirect to="/"/>
        }
        return (
            <div className='main-signup text-color'>
                <div className="signup-form " id="signup-form" >
                    <div className="display-4 login-page-heading">
                        Create Your Account!
                    </div>
                    <div className="tabs-shadow signup-form-wrapper">
                        <div className="login-form-container special">
                            <div className="form-group ">
                                <label className="signup-label" htmlFor="userName"><b>First Name</b> <span className="required">*</span></label>
                                <input type="text" name="first-name" id="userName" ref="firstName" onInput={e => this.setState({ firstName: e.target.value })} className="form-control" placeholder="Enter your first name" />
                            </div>
                            <div className="form-group ">
                                <label className="signup-label" htmlFor="userName"><b>Last Name</b> <span className="required">*</span></label>
                                <input type="text" name="first-name" id="lastName" ref="lastName" onInput={e => this.setState({ lastName: e.target.value })} className="form-control" placeholder="Enter your last name" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="userEmail"><b>Email Address</b> <span className="required">*</span></label>
                                <input type="email"  id="userEmail" ref="userEmail" onInput={e => this.setState({ email: e.target.value })} className="form-control" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="userPassword"><b>Password</b> <span className="required">*</span></label>
                                <input type="password" id="userPassword" ref="userPassword"  onInput={e => this.setState({ password: e.target.value })} className="form-control" placeholder="Enter your password" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="phone-num"><b>Phone Number</b> <span className="required">*</span></label>
                                <PhoneInput className="form-control custom-phone1" ref="userNum" id="phone-num" placeholder="Enter phone number" onChange={phone => this.setState({ phone })} />
                            </div>
                            <div className="form-group">
                                <label className="signup-label"><b>Gender</b> <span className="required">*</span></label>
                                <div className="radio">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" ref="male" onInput={e => this.setState({ gender: e.target.value })} value="male" id="customRadioInline1" name="gender" className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor="customRadioInline1">Male</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" ref="female" onInput={e => this.setState({ gender: e.target.value })} value="female" id="customRadioInline2" name="gender" className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="user-DOB"><b>Date of Birth</b> <span className="required">*</span></label>
                                <input type="date" name="user-DOB" ref="userDOB" onInput={e => this.setState({ DOB: e.target.value })} id="user-DOB" className="form-control" aria-describedby="emailHelp" placeholder="Enter your date of bitrh" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" ><b>Profile Picture</b> <span className="required"><span style={{ fontSize: '14px' }}>(after selecting files click on upload)</span>*</span></label>
                                <div className="imgupload1">
                                    <input ref="imgup1" accept="image/*" className="img-upload-input" type="file" onInput={this.up1} onChange={this.handleChange1} />
                                    <button type="button" id="upBtn1" className="img-upload-btn postAd-submit-btn no-outline hid" onClick={this.handleUpload1}>Upload</button>
                                    <progress id="upProg1" value={this.state.progress1} className="img-upload-progress hid" max="100" />
                                    <img ref='img1' alt="" id="upImg1" src={this.state.url1} className="hid" height="30" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="user-country"><b>Country</b> <span className="required">*</span></label>
                                <CountrySelect country={this.country1} />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="user-address"><b>City</b> <span className="required">*</span></label>
                                <input type="text" id="user-city" ref="userCity" onInput={e => this.setState({ city: e.target.value })} name="signup-city" className="form-control" placeholder="Enter your city" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="user-address"><b>Address</b> <span className="required">*</span></label>
                                <input type="text" id="user-address" ref="userAddress" onInput={e => this.setState({ address: e.target.value })} name="signup-address" className="form-control"  placeholder="Enter your address" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="exampleInputPassword1"><b>About you</b> <span className="required">*</span></label>
                                <textarea name="comments" id="contact-comment" ref="comment" onChange={e => this.setState({ about: e.target.value })} className="form-control" cols="30" rows="6"></textarea>
                            </div>
                            <div className="login-btn-container">
                                <div>
                                    <button type="submit" onClick={this.verify} className="btn login-btn postAd-submit-btn  ">Submit</button>
                                </div>
                                <div>
                                    <Link className="login-signup-page-swap " to="/login">Already have an account! Sign in now.</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CountrySelect extends Component {
    state = {
        country: ''
    }

    render() {
        return (
            <select id="user-country" defaultValue="q" ref="userCountry" onInput={e => (this.setState({ country: e.target.value }))} onChange={e => this.props.country(e.target.value)} className="form-control" name="Country">
                <option value="q" disabled >Select Country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
            </select>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        user: store.userReducer
    }
}
export default connect(mapStateToProps)(Signup);