import React, { useReducer, useState } from 'react';
import personReducer from './reducer/person-reducer';
import { useImmer } from 'use-immer';

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

  // 좀더 직관적으로 사용이 가능하다.
  // 복잡한 데이터를 가진 객체를 컨트롤할때 사용하는 것이 좋다.
  // 성능은 다소 느리다.

  const [person, updatePerson] = useImmer(initalPerson);

  const handleUpdate = () => {
    const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);

    updatePerson((person) => {
      const mentor = person.mentors.find((m) => m.name === prev);
      mentor.name = current;
    });
  };

  const handleAdd = () => {
    const name = prompt(`어떤 멘토를 추가하고 싶은가요?`);
    const title = prompt(`타이틀은 무엇인가요?`);
    updatePerson((person) => person.mentors.push({ name, title }));
  };

  const handleDelete = () => {
    const name = prompt(`어떤 멘토를 삭제하고 싶은가요?`);

    updatePerson((person) => {
      const mentor = person.mentors.findIndex((m) => m.name === name);
      mentor.name = current;
    });
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
