import React, { memo, useCallback, useReducer } from 'react';
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

export default function AppMentorsButton() {
  // useState는 내부에서만 사용하고 외부에서 사용이 불가능하다. 재사용이 불가능하다.
  // useReducer를 사용해서 외부의 함수를 불러와 상태를 관리할 수있다. 재사용이 가능하다. [state,dispatch] = useReducer(외부함수,초기값)
  // dispatch를 사용해 원하는 액션을 명령할 수 있다.
  const [person, dispatch] = useReducer(personReducer, initalPerson);

  const handleUpdate = useCallback(() => {
    const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);

    dispatch({ type: 'updated', prev, current });
  }, []);

  const handleAdd = useCallback(() => {
    const name = prompt(`어떤 멘토를 추가하고 싶은가요?`);
    const title = prompt(`타이틀은 무엇인가요?`);

    dispatch({ type: 'added', name, title });
  }, []);

  const handleDelete = useCallback(() => {
    const name = prompt(`어떤 멘토를 삭제하고 싶은가요?`);

    dispatch({ type: 'deleted', name });
  }, []);

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
      <Button text='add' onClick={handleAdd} />
      <Button text='update' onClick={handleUpdate} />
      <Button text='delete' onClick={handleDelete} />
    </div>
  );
}

const Button = memo(({ text, onClick }) => {
  console.log('button', text, 're-rendering');
  const result = calculateSomethint();

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '20px',
        margin: '0.4rem',
      }}
    >
      {text} {result}
    </button>
  );
});

function calculateSomethint() {
  for (let i = 0; i < 10000; i++) {
    console.log('❤️');
  }
  return 10;
}
