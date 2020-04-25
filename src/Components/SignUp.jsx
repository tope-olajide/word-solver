import React from 'react'
import Input from "../Components/commons/Input"
import {ButtonThree} from '../Components/commons/Button'
import Nav from "../Components/Nav"
const SignUp = () => {
return (
    <>
    <Nav />

<section className="home-container">
          <section className="home-title-section"><h1>SIGN UP</h1>
          </section>
          <section className="home-menu-details">
              <Input type="text" placeHolder="NAME"/>
              <Input type="text" placeHolder="USERNAME"/>
              <Input type="password" placeHolder="PASSWORD"/>
              <Input type="password" placeHolder="REPEAT PASSWORD"/>
         </section>
          <ButtonThree name = "REGISTER" />
      </section>
    </>
)
}
export default SignUp