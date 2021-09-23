import React from 'react';
import ReactDOM from 'react-dom';
import DropdownCall from './api/GetSupervisors';
import axios from 'axios';
import imageMail from './Images/img-01.png'

class MainShow extends React.Component {

    constructor(props) {
      super(props)

      //The state keeps track of the current state of the form at all time

      this.state = {
        First: "",
        Last: "",
        PhoneBox: false,
        EmailBox: false,
        PhoneNum: "",
        Email: "",
        SupervisorKey: -1

      }
      this.handleClick = this.handleClick.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    //Lines 28 to 50 are various handlers 
    handleChangeText = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleChangePhoneCheck = (e) => {

      
      if(this.state.PhoneBox){
        this.setState({PhoneNum:""})
      }

      this.setState({
        [e.target.name]: !this.state.PhoneBox,
      })
    }
    handleChangeEmailCheck = (e) => {

      if(this.state.EmailBox){
        this.setState({Email:""})
      }
      this.setState({
        [e.target.name]: !this.state.EmailBox
      })
    }

    handleClick(e) {
      this.setState({
        SupervisorKey: e.target.value
      })

    }

    // This function handles  validation on submit , All props start as valid, Then go through a vetting process,
    //If they all pass, HTTP call is made vto local "Fake API  Point"
    handleSubmit(e) {

      var emailPass = true;
      var phonePass = true;
      var superPass = true;
      var namePass = true;

      var errorPhraseObj = {
        emailError: "Please enter a valid email e.g. Test@gmail.com",
        phoneError: "Please enter a Valid Phone Numeber Format: ##########",
        superError: " Please select a Supervisor",
        nameError: "Please enter a Name with only Letters"
      }

      var errorArr = []


      var nameRegex = new RegExp(/^[A-Z]+$/i)
      var emailRegex = new RegExp(/.+@.+\..+/)
      var numRegex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)

      if (!nameRegex.test(this.state.First) || !nameRegex.test(this.state.Last)) {
        namePass = false
        errorArr.push(errorPhraseObj.nameError)
      }

      if (this.state.SupervisorKey === -1) {
        superPass = false
        errorArr.push(errorPhraseObj.superError)
      }


      if (this.state.EmailBox) {
        if (!emailRegex.test(this.state.Email)) {
          emailPass = false
          errorArr.push(errorPhraseObj.emailError)
        }
      }

      if (this.state.PhoneBox) {
        if (!numRegex.test(this.state.PhoneNum)) {
          phonePass = false
        }
        errorArr.push(errorPhraseObj.phoneError)
      }

      if (emailPass && phonePass && superPass && namePass) {

        e.preventDefault()

        axios.post("http://localhost:8000/api/submit", this.state).then(
          response => {
            console.log("Response Data below if you are interested")
            console.log(response)
            console.log("First Name: " + response.data.First)
            console.log("Last Name: " + response.data.Last)
            console.log("Email: " + response.data.Email)
            console.log("Phone: " + response.data.PhoneNum)
            console.log("Supervisor ID: " + response.data.SupervisorKey)
            alert("Your Notification Settings Are Sent and Saved!")
          }).catch(error => {
          console.log(error)
        })


        this.setState({
          First: "",
          Last: "",
          PhoneBox: false,
          EmailBox: false,
          PhoneNum: "",
          Email: "",
          SupervisorKey: -1
        })

        var element = document.getElementById("superNames");
        element.value = -1

      } else {
        e.preventDefault()

        for (let index = 0; index < errorArr.length; index++) {
          alert(errorArr[index])

        }

      }

    }

        render(){
        const {First,Last,PhoneBox,EmailBox,PhoneNum,Email} = this.state
          //Lines 140 - 167 hanndle CSS properties of various elements 
        const maindivShow =   {
          position: 'relative',
          width: '400px',
          height: '200px',
          border: "3px solid #73AD21"
        };
        
        const lower =  {
          position: 'top',
          top: '80px',
          right: 0,
          width: '200px',
          height: '100px',
          
        }

        const image = {
          height : "100px",
          marginTop : '-100px',
          width: "215px" ,
          paddingLeft : "320px"
        }

        const finimg =  {
          "height": "inherit"
      }


      // The main show is the "Heart" of application , Create the HTML ,and references the apropreciate handlers to correctly process data
      // Handles form submission 
        return(

        <div className="mainShow" >
          <form id="mainForm" style={maindivShow} onSubmit={this.handleSubmit}>
            <div style={lower}>
              Enter your First Name: <input required={true} style={{marginRight: 20 }} type="text" name="First"
                value={First} onChange={ this.handleChangeText}></input>
              Enter your Last Name: <input required={true} type="text" name="Last" value={Last} onChange={
                this.handleChangeText}></input>
                
            </div>
            <div style={image}>
               <img style={finimg} src={imageMail} alt="Mail Icon"></img>
              </div>
            How would you prefer to be Notified?
            <div>
              <label style={{marginRight: 50, paddingLeft: 50 }} htmlFor="phone">Phone
                <input type="checkbox" id="phone" checked={PhoneBox} name="PhoneBox" value={PhoneBox} onChange={
                  this.handleChangePhoneCheck}></input>
              </label>

              <label style={{paddingLeft: 75 }} htmlFor="email"> E-mail
                <input type="checkbox" id="email" name="EmailBox" checked={EmailBox} value={EmailBox} onChange={
                  this.handleChangeEmailCheck}></input>
              </label>

            </div>
            <div>
              <input style={{marginRight: 20 }} type="text" name="PhoneNum" value={PhoneNum} disabled={!PhoneBox}
                required={PhoneBox} onChange={ this.handleChangeText}></input>
              <input style={{marginRight: 20 }} type="text" name="Email" value={Email} disabled={!EmailBox}
                required={EmailBox} onChange={ this.handleChangeText}></input>
            </div>

            <DropdownCall functionCall={this.handleClick}></DropdownCall>
            <button type="submit" form="mainForm" value="Submit">Submit</button>
          </form>

        </div>

        )

        }
       
}

//Starts the Main Show :) 
ReactDOM.render(
  <MainShow></MainShow>,
  document.getElementById('root')
);



