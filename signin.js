import React from 'react';



import 'tachyons';

const SignIn = () =>{

return(
<article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 center shadow-5 ">
<main className="pa2 black-80 ">
  <form className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0 white center">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6 white" for="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6 white" for="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div className="App  grow ">
      <input className="b ph2 pv2 input-reset ba b--black bg-black pointer f6 dib white " type="submit" value="Sign In" />
    </div>
     <div className="App  grow ">
      <input className="b ph2 pv2 input-reset ba b--black pointer f6 dib  mv3" type="submit" value="Sign In via Google" />
    </div>
  </form>
</main>
</ article>


);
}


export default SignIn;
