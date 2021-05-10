import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // 이 설정을 통해 문자열 맨 앞의 ?를 생략함
    });
    const showDetail = query.detail === 'true';
    return (
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 예제 프로젝트임</p>
            {showDetail && <p>detail 값을 {showDetail.toString()}로 설정했음</p>}
        </div>
    );
};

export default About;