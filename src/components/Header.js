import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import logoMesto from '../images/Vector.svg';

function Header({handleSignOut, email}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        alt="логотип"
        src={logoMesto}
      />
      <ul className='header__container'>
        <Route exact path='/sign-in'>
          <Link to="/sign-up" className="header__reg-link">Регистрация</Link>
        </Route> 
        <Route exact path='/sign-up'>
          <Link to="/sign-in" className="header__login-link">Войти</Link>
        </Route>
        <Route exact path='/'>
        <li><p className='header__email'>{email}</p></li>
        <li><button onClick={handleSignOut} className='header__exit'>Выйти</button></li>
        </Route>
      </ul>
    </header>
  );
}

export default Header;