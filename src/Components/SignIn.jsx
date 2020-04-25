import React from 'react'
import Input from "../Components/commons/Input"
import {ButtonThree} from '../Components/commons/Button'
import Nav from "../Components/Nav"
const SignIn = () => {
return (
    <>
    <Nav />

<section className="home-container">
          <section className="home-title-section"><h1>SIGN IN</h1>
          </section>
          <section className="home-menu-details">
              <Input type="text" placeHolder="USERNAME"/>
              <Input type="password" placeHolder="PASSWORD"/>
         </section>
          <ButtonThree name = "REGISTER" />
      </section>
    </>
)
}
export default SignIn