import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile'
import Profiles from './Profiles'

const App = () => {
  const [message, setMessage] = useState({
    name: "gildong",
    istrue: "true"
  });

  /*
  const onChangeName = (e) => {
    const nextMessage = {
      ...message,
      [e.target.name]: e.target.value
    };
    setMessage(nextMessage);
  }

  const onChangeIsTrue = (e) => {
    const nextMessage = {
      ...message,
      [e.target.name]: e.target.value
    };
    setMessage(nextMessage);
  }
*/

  const onChange = (e) => {
    const nextMessage = {
      ...message,
      [e.target.name]: e.target.value
    };
    setMessage(nextMessage);
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to={"/about?detail=" + message.istrue}>소개</Link>
        </li>
        <li>
          <Link to={"/profile/" + message.name}>누구</Link>
        </li>
        <li>
          <Link to={"/profiles/"}>프로필2</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profiles" component={Profiles} />
      <input type="text" name="name" placeholder="파라미터 변경" value={message.name} onChange={onChange} />
      <input type="text" name="istrue" placeholder="쿼리 변경" value={message.istrue} onChange={onChange} />
    </div>

  )
}

export default App;
