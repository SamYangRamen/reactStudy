import React, { useState } from 'react';
import { observable, reaction, computed, autorun } from 'mobx';

const Mobx = () => {
    const [value, setValue] = useState(observable({ a: 1, b: 2 }));
    // useState를 통해서 state를 다룰 때는 value가 값의 대입이 아닌 변수 자체의 교체가 이루어지기 때문에 reaction이 작동하지 않는거였음

    //observable(value)
    /*
    calculator = {
        a: 1,
        b: 2
    };
    */

    reaction(
        () => value.a,
        val => {
            console.log(`a 값이 ${val} 로 바뀌었네요!`);
        }
    );

    reaction(
        () => value.b,
        val => {
            console.log(`b 값이 ${val} 로 바뀌었네요!`);
        }
    );

    const onChange = e => {
        value.a = 1;
        const nextValue = observable({
            ...value,
            [e.target.name]: parseInt(e.target.value)
        });
        console.log(value);
        setValue(nextValue);
    };

    return (
        <div>
            <h1>값 변경</h1>
            <input name="a" value={value.a} onChange={onChange} />
            <input name="b" value={value.b} onChange={onChange} />
        </div>
    );
};

export default Mobx;