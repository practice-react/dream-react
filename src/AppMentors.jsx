import React, { useReducer, useState } from 'react';
import personReducer from './reducer/person-reducer';

const initalPerson = {
  name: '엘리',
  title: '개발자',
  mentors: [
    {
      name: '밥',
      title: '시니어개발자',
    },
    {
      name: '제임스',
      title: '시니어개발자',
    },
  ],
};

export default function AppMentors() {
  // useState는 내부에서만 사용하고 외부에서 사용이 불가능하다. 재사용이 불가능하다.
  // useReducer를 사용해서 외부의 함수를 불러와 상태를 관리할 수있다. 재사용이 가능하다. [state,dispatch] = useReducer(외부함수,초기값)
  // dispatch를 사용해 원하는 액션을 명령할 수 있다.
  const [person, dispatch] = useReducer(personReducer, initalPerson);

  const handleUpdate = () => {
    const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);

    dispatch({ type: 'updated', prev, current });
  };

  const handleAdd = () => {
    const name = prompt(`어떤 멘토를 추가하고 싶은가요?`);
    const title = prompt(`타이틀은 무엇인가요?`);

    dispatch({ type: 'added', name, title });
  };

  const handleDelete = () => {
    const name = prompt(`어떤 멘토를 삭제하고 싶은가요?`);

    dispatch({ type: 'deleted', name });
  };

  return (
    <div>
      <h1>
        {person.name}는 {PaymentResponse.title}
      </h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <button onClick={handleUpdate}>멘토 이름 바꾸기</button>
      <button onClick={handleAdd}>멘토 추가하기</button>
      <button onClick={handleDelete}>멘토 삭제하기</button>
    </div>
  );
}
