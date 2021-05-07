import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';

const name = 'Josh Perez';
const calc = 'parseInt(2 + 2)';

function isNumber(value) {
  if (!isNaN(value)) {
    return <h1>Hello, {name}</h1>
  }
  else {
    return <h1>NO!</h1>
  }
}

function Foo1(props) {
  return <h1>{props.name}</h1>;
}

function foo2(props) {
  return <h1>{props}</h1>;
}

const element_props = <foo1 name="ABCDE" />;

const element = (
  <h1 className="greeting">
    Hello, world! 1
  </h1>
);

const element2 = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world! 2'
);

/*
const element3 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world! 3'
  }
};
*/

/* -----------------------------------------------------------------------------------------------------*/

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

/* -----------------------------------------------------------------------------------------------------*/
// 함수형 표기와 화살표형 표기의 차이

function BasicComponent(props) {
  return <div className="react">{props.name + " " + props.children}</div>;
}

const ArrowComponent = (props) => {
  return <div className="react">{props.name, props.children}</div>
}

// 이 둘의 차이는 this를 썼을 때의 주체가 무엇인가가 다르다는 것
// BasicConponent의 this : 자신이 종속된 실행 시 객체
// ArrowComponent의 this : 자신이 종속된 인스턴스

BasicComponent.defaultProps = {
  name: "Hello, world! 1111"
};

// const new_element = <BasicComponent>칠드런BBB</BasicComponent>;
// const new_element = <ArrowComponent>칠드런AAA</ArrowComponent>;

/* -----------------------------------------------------------------------------------------------------*/
// 비구조화 할당 문법

function UnstructuredAllocComponent1(props) {
  /*비구조화 할당 문법 (마치 c++에서 using namespace std같은 느낌)*/
  const { name, children } = props;
  return <div className="react">{name + " " + children}</div>;
}

UnstructuredAllocComponent1.defaultProps = {
  name: "Hello, world! U1U1"
};

// const new_element = <UnstructuredAllocComponent1>칠드런U1U1</UnstructuredAllocComponent1>;

function UnstructuredAllocComponent2({ name, children }) {
  return <div className="react">{name + " " + children}</div>;
}

UnstructuredAllocComponent2.defaultProps = {
  name: "Hello, world! U2U2"
};

// const new_element = <UnstructuredAllocComponent2>칠드런U2U2</UnstructuredAllocComponent2>;

/* -----------------------------------------------------------------------------------------------------*/
// 배열 비구조화 할당 문법

const array = [1, 2];
//const one = array[0];
//const two = array[1];
const [one, two] = array;

const Say = () => {
  const [message, setMessage] = useState('하하!');
  // useState 메서드는 [state처럼쓸변수, setState처럼쓸메서드] 를 반환해주는 놈이라고 생각하면 됨
  // useState()의 괄호() 안에 들어가는 값은 state처럼쓸변수 의 초기값임
  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히가세요!");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      {/* HTML에서의 이벤트핸들링 문법에 대하여 camelCase로 작성해야 한다. */}
      <h1>{message}</h1>
    </div>
  );
};

// const new_element = <Say></Say>

/* -----------------------------------------------------------------------------------------------------*/
// 이벤트 핸들링

/* 입력박스에 값 입력 */
const EventHandlingPractice1 = () => {
  return (
    <input
      type="text"
      name="message"
      placeholder="아무거나 입력해 보세요"
      onChange={(e) => {
        // console.log(e);
        console.log(e.target.value); // 키보드를 입력할 때마다, 즉 입력칸의 값이 바뀔 때마다 콘솔에 기록
      }}
    />
  );
};

// const new_element = <EventHandlingPractice1></EventHandlingPractice1>

/* 입력 박스에 입력되어 있던 값을 alert 창으로 띄워주고 입력 박스 값 초기화시키기*/
const EventHandlingPractice2 = () => {
  const [message, setMessage] = useState('');
  return (
    <div>
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          alert(message);
          setMessage("");
        }}
      />
    </div>
  );
};

//const new_element = <EventHandlingPractice2></EventHandlingPractice2>

/* 여러 개의 input 동시에 다루기 */

/* 시행착오
const EventHandlingPractice3 = () => {
  const [message, setMessage] = useState({ username: "", message: "" });

  const handleChange = (e) => {
    setMessage(message.map(item => (item.id === e.name ? { ...item, value: item.value + e.value } : item)))
  }

  const handleClick = () => {
    alert(message[e.name] + ": " + message[e.value])
    setMessage([])
  }

  return (
    <div>
      <input
        type="text"
        name="inputA"
        placeholder="입력1"
        value={message.inputA}
        onChange={handleChange}
      />
      <input
        type="text"
        name="inputB"
        placeholder="입력2"
        value={message.inputB}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          handleClick();
        }}
      />
    </div>
  );
};
*/

const EventHadlingPractice3 = () => {
  const [message, setMessage] = useState({
    username: "",
    message: ""
  });

  const onChange = e => {
    const nextMessage = {
      ...message,
      [e.target.name]: e.target.value
    };
    setMessage(nextMessage);
  };

  const onClick = () => {
    alert(message.username + ": " + message.message);
    setMessage({
      username: "",
      message: ""
    });
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={message.username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="입력하셈"
        value={message.message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  )
}

//const new_element = <EventHadlingPractice3></EventHadlingPractice3>

/* -----------------------------------------------------------------------------------------------------*/
// 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용해서 여러 개의 변수를 만들어야 한다.

const Info = () => {
  const [name, setName] = useState("AAA");
  const [nickname, setNickname] = useState("BBB");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <b>이름:</b> {name}
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
};

const new_element = <Info></Info>

/* -----------------------------------------------------------------------------------------------------*/

/* -----------------------------------------------------------------------------------------------------*/

ReactDOM.render(
  new_element,
  document.getElementById('root')
);

/*
ReactDOM.render(

  //<React.StrictMode>
        //  <App />
  //</React.StrictMode>,

      <ActionLink />,
  document.getElementById('root')
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
