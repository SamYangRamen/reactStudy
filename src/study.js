import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react';
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

//export default NumberList;

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

// props를 따로 지정하지 않았을 때 기본값 설정
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

//export default BasicComponent;
//export default ArrowComponent;
//export default UnstructuredAllocComponent1;
//export default UnstructuredAllocComponent2;

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

//export default Say;

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

const EventHandlingPractice3 = () => {
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
                onKeyPress={onKeyPress} // 키보드 입력 이벤트
            />
            <button onClick={onClick}>확인{/*버튼 클릭 이벤트*/}</button>
        </div>
    )
};

// const new_element = <EventHadlingPractice3></EventHadlingPractice3>

//export default EventHandlingPractice1;
//export default EventHandlingPractice2;
//export default EventHandlingPractice3;

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

// const new_element = <Info></Info>
//export default Info;

/* -----------------------------------------------------------------------------------------------------*/
// useEffect : 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정하는 Hook

const Info2 = () => {
    const [name, setName] = useState("AAA");
    const [nickname, setNickname] = useState("BBB");

    useEffect(() => {
        console.log("렌더링 완료")
        console.log({
            name,
            nickname
        });

        alert("Hello!")

        return () => { // 뒷정리 함수: 컴포넌트가 언마운트 되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶을 때 사용
            alert("Clean up!")
        };
    }, [name] /* 맨 처음 렌더링될 때만 실행하고 업데이트될 때는 실행하지 않으려면 이처럼 빈 배열을 두 번째 파라미터로 넣으면 됨 */
        /* 특정 값이 업데이트될 때만 실행하고 싶으면 배열 안에 검사하고 싶은 값을 넣으면 됨 */
    );

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

// const new_element = <Info2></Info2>
//export default Info2;

/* -----------------------------------------------------------------------------------------------------*/
// 값 숨기기, 보이기

const Visible = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <button
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                {visible ? "숨기기" : "보이기"}
            </button>
            <hr />
            {visible && <Info2 />}
        </div>
    )
}

// const new_element = <Visible></Visible>
//export default Visible;

/* -----------------------------------------------------------------------------------------------------*/
// useReducer : 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트할 때 사용
// 장점 : 컴포넌트 업데이트 로직을 컴포넌트의 바깥으로 빼낼 수 있음

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { value: state.value + 1 };
        case 'DECREMENT':
            return { value: state.value - 1 };
        default:
            // 아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { value: 0 }); // 리듀서 함수와 초깃값을 아규먼트로 전달

    return (
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>

        </div>
    );
};

// const new_element = <Counter></Counter>
//export default Counter;

/* -----------------------------------------------------------------------------------------------------*/

function reducer2(state, action) {
    return {
        ...state,
        [action.name]: action.value
    };
}

const Info3 = () => {
    const [state, dispatch] = useReducer(reducer2, {
        name: '',
        nickname: ''
    }); // 리듀서 함수와 초깃값을 아규먼트로 전달

    const { name, nickname } = state;
    const onChange = e => {
        dispatch(e.target);
    };

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <b>이름:</b> {name}
                <b>닉네임:</b> {nickname}
            </div>
        </div>
    );
};

// const new_element = <Info3></Info3>
//export default Info3;

/* -----------------------------------------------------------------------------------------------------*/

/* 숫자를 등록할 때 뿐만 아니라 인풋 내용이 수정되는 순간에도 getAverage가 작동함. 이 쓸데없는 연산을 없애주는게 useMemo
const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = e => {
    setNumber(e.target.value);
  };

  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b>{getAverage(list)}
      </div>
    </div>
  );
};
*/

/*
const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = e => {
    setNumber(e.target.value);
  };

  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  const avg = useMemo(() => getAverage(list), [list]); // [list] 의 값이 실제로 바뀌었을 때만 작동
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b>{avg}
      </div>
    </div>
  );
};

const new_element = <Average></Average>
*/

/* -----------------------------------------------------------------------------------------------------*/
// useCallback : 이벤트 핸들러 함수를 필요할 때만 생성. 컴포넌트가 리렌더링될 때마다 함수들이 새로 생성됨
// 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아질 때 이 것을 이용해서 최적화 시키는게 좋음
// 문자열, 숫자, 객체처럼 일반 값을 재사용할 때는 useMemo, 함수를 재사용할 때 useCallback

const getAverage = numbers => {
    console.log("평균값 계산 중..");
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성 (비어있으면)

    const onInsert = useCallback(e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성

    const avg = useMemo(() => getAverage(list), [list]); // [list] 의 값이 실제로 바뀌었을 때만 작동
    return (
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b>{avg}
            </div>
        </div>
    );
};

// const new_element = <Average></Average>
export default Average;

/* -----------------------------------------------------------------------------------------------------*/
// useref의 기능 2가지 :
// getElementById처럼 특정 DOM을 선택할 때
// 렌더링과 상관없이 어떤 값의 변경을 꾀할 때(즉 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않음)

/*
const RefSample = () => {
    const id = useRef(1);
    const setId = (n) => {
        id.current = n;
    }

    const printId = () => {
        console.log(id.current);
    }

    return (
        <div>
            refsample
        </div>
    );
};

const new_element = <RefSample></RefSample>
*/

/* -----------------------------------------------------------------------------------------------------*/

/*
ReactDOM.render(
    new_element,
    document.getElementById('root')
);
*/

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