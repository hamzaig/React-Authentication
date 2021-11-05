import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../App';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const passwordRef = useRef();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newPassword = passwordRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH41v8M_KYgB6NkhYIHvBoJXcNy6d3CFY", {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: newPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      console.log(res);
      history.replace("/");
    })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
