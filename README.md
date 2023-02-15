## fetch 무한루프발생 왜??

- fetch로 setState하게 되면 리액트는 해당 컴포넌트 함수를 다시 호출한다.
- 때문에 fetch가 계속 발생하게 된다.
- 그럼 useState는 왜 초기화되지 않는가.
- 리액트가 다시 초기화하지 않고 이전의 state를 기억하기 때문이다.
- 해결방법 -> useEffect

```js
export default function Products() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  fetch('data/products.json')
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });

  return <div></div>;
}
```

**_해결방법_**

```js
useEffect(() => {
  fetch('data/products.json')
    .then((res) => res.json())
    .then((data) => {
      console.log('생성');
      setProducts(data);
    });
  return () => {
    console.log('삭제');
  };
}, []);
```

- useEffect 리액트 훅의 첫번채 인자로 콜백함수를 전달한다.
- return을 하게 되면 컴포넌트가 호출되고 삭제될때마다 return의 값을 실행한다.
- 두번쨰 인자는 optional로 아무것도 입력되지 않으면 무한루프가 발생한다.
- [] 배열을 전달하면 단 한번만 실행된다.
- [state] -> 두번째 인자로 배열안에 상태를 주면 state가 변할때마다 useEffect를 호출하게 된다.
- 불러와야하는 데이터가 상태에 따라 달라질때 사용한다.
- useEffect는 비동기이다.

## <li key="123"></li> key로 고유한 아이디를 만들어야하는 이유

```js
// prettier-ignore
arr.map((item) => `
    <li key={item.id}>
      <article>
        <h3>{item.name}</h3>
      </article>
    </li>
  `
);
```

- JSX에서 map을사용해 자식요소를 생성할때 반드시 key값을 입력해줘야한다.
- 배열 항목이 이동하거나(정렬) 삽입, 삭제될 수 있는 경우에 react가 무슨 일이 일어났는지 추론하고 DOM 트리를 올바르게 업데이트 하는데 도움이 된다.

## 상태관리

1. 컴포넌트의 재생성 및 상태관리

- showB의 Boolean에 따라 Counter컴포넌트의 마운트와 언마운트가 결정된다.
- useState는 상태를 초기화하고 변경되면 이전의 값을 저장하는데 컴포넌트가 언마운트된다면 이전의 상태도 삭제된다.
- 그렇기 때문에 counter컴포넌트에서 클릭이벤트를 통해 상태를 6까지 변경했다고 하더라도 showB상태가 false로 변경되서 Counter가 언마운트 된다면 6의 값은 다시 useState(0)을 통해 0으로 초기화가 된다.

```js
function AppCounter(){

const [showB, setShowB] = useState(true);
// prettier-ignore
return (
  <div>
  { showB && <Counter /> }
  </div>
)
}

function Counter(){
  const [count,setCount] = useState(0)

  handleCount(){
    setCount((count) => count +1)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={handleCount}>count</button>
    <>
  )
}
```

2. 동일한 위치의 동일한 구성 요소는 상태를 유지

- React에서 중요한 것은 JSX 마크업이 아니라 **_UI 트리의 위치_**다.
- 아래 코드에서 isFancy의 Boolean값에 따라 생성 되는 Counter 컴포넌트가 다르지만 상태는 공유한다.
- 왜? 같은 위치에서 생성되기 때문이다. 같은 위치에 렌더링되고 동일한 컴포넌트라면 상태를 파괴하지 않는다 **_중요한 개념!!_**

```js
const [isFancy, setIsFancy] = useState(false);

return (
  <div>
    {
    isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />;
    }
  </div>
)

```

- 주의: 동일한 위치에서 다른 구성 요소를 렌더링하면 전체 하위 트리의 상태가 재설정된다.
  (감싸는 부모태그의 타입이 다르다.)

```js
{
  isFancy ? (
    <div>
      <Counter isFancy={true} />
    </div>
  ) : (
    <section>
      <Counter isFancy={false} />
    </section>
  );
}
```

- key를 설정하면 위치가 같더라도 다른 컴포넌트로 인식한다.
- key의 값이 서로 다르기 때문에 상태를 공유하지 않는다.

```js
{
  isPlayerA ? (
    <Counter key='Taylor' person='Taylor' />
  ) : (
    <Counter key='Sarah' person='Sarah' />
  );
}
```

- 아래의 코드는 showHellow가 true라면 p태그를 생성하고 아니면 삭제한다.
- showHellow가 false일때는 p태그가 존재하지 않기때문에 Form컴포넌트가 첫번쨰자식이라고 생각을 했다.
- 그래서 showHellow의 값에따라 Form의 위치가 달라져서 상태를 공유하지 않는다라고 생각했지만
- {showHellow ?? <p>Hellow</p>}가 이미 첫번째에 위치해 있기때문에 p태그가 존재하건 안하건 Form은 항상 두번쨰 자식으로 인식되서 상태를 공유한다는 것을 알았다.
- {showHellow ?? <p>Hellow</p>} -> {null}과 같은 기능을한다.

```js
const [showHellow,setShowHellow] = useState(true)

<div>
  {showHellow ?? <p>Hellow</p>  }
  <Form />
</div>
```

### 요약

참고사이트: https://beta.reactjs.org/learn/preserving-and-resetting-state

- React는 같은 컴포넌트가 같은 위치에 렌더링되는 한 상태를 유지합니다.
- 상태는 JSX 태그에 보관되지 않습니다. JSX를 배치한 트리 위치와 연관됩니다.
- 하위 트리에 다른 키를 제공하여 강제로 하위 트리의 상태를 재설정할 수 있습니다.
- 구성 요소 정의를 중첩하지 마십시오. 그렇지 않으면 실수로 상태가 재설정됩니다.

## Reducer

- useReducer를 사용해서 외부의 함수를 불러와 상태를 관리할 수있다.
- [state,dispatch] = useReducer(외부함수,초기값)
- dispatch를 사용해 원하는 액션을 명령할 수 있다.
- dispatch({type:"updated",current:"현우"}) 호출하면
- personReducer의 첫번째 인자로는 상태가 들어오고 두번째로 dispatch에서 전달한 객체가 들어온다.
- return 값이 자동으로 상태를 업데이트한다.
- 다른 컴포넌트에서도 재사용이 가능하다.

```js
 export default personReducer(person, action) {
  switch (action.type) {
    case 'updated': {
      const { prev, current } = action;
      return {
        ...person,
        mentors: person.mentors.map((mentor) =>
          mentor.name === prev ? { ...mentor, name: current } : mentor
        ),
      };
    }

    case 'add':{
      const {name,title} = action
      return {
        ...person,
        mentors: [...person.mentors,{name, title}]
      }
    }

    default: {
      throw Error(`알수없는 액션 타입이다: ${action.type}`);
    }
  }
}

------------ AppPerson.jsx -------
import personReducer from './reducer/person-reducer.js'

function AppPerson(){
  const [person,dispatch] = useReducer(personReducer,initialState)

  const handleUpdate = () => {
    const prev = alert('찾는이름')
    const current = alert('바꿀이름')
    dispatch({type:'updated',prev,current})
  }

  const handleAdd = () =>{
    const name = alert('추가할 이름')
    const title = alert('추가할 타이틀')
    dispatch({type:'add', name,title})
  }

  return (
    <div>
      <p>{person.name}</p>
      <ul>
      {person.mentors.map(({name,title})=>(
        <li key={아이디} >
          `${name}(${title})`
        </li>>
      ))}
      </ul>
    </div>
  )
}

```

## Immer

- 설치

  - yarn add immer use-immer

- 좀더 선언적으로 사용가능하다.
- 내부적으로 처리하는 로직이 존재한다.
- 성능은 다소 느리나 체감 될 정도는 아니다
- 무조건 사용하는 것이 아니라 복잡한 데이터 구조가 필요한 경우에 사용하는 것이 좋다

```js
const [state, update] = useImmer(initial);

// {...prev, name: "현우"} 와 동일하다
update((prev) => (state.name = '현우'));

// {...prev,persons:[...prev.persons,{name,title}] } 와 동일하다
update((prev) => prev.persons.push({ name, title }));

// {...prev, persons: prev.persons.map(person => person.name === name ? {...person, name: "현우"} : person) }와 동일하다.
update((prev) => {
  const person = prev.persons.find((person) => person.name === name);
  person.name === '현우';
});
```

## form

- form은 uncontrol-conponent이다.
- 입력 폼은 사용자의 클릭,입력등에 의해 UI이가 변하기 때문이다.
- 항상 UI의 업데이트는 리액트의 상태 업데이트에 의해서 일어나야 하는데 리액트의 원칙에 어긋난다.
- 그래서 아래와 같은 작업이 필요하다.

```js
const [form, setForm] = useState({ name: '', email: '' });
const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value });
};

<input
  type='text'
  id='name'
  name='name'
  value={form.name}
  onChange={handleChange}
/>;
```

## 컴포넌트 재사용성(children)

- 자식요소를 감싸는 부모컴포넌트
- 공통적인 부분은 하위컴포넌트에 만들어두고
- 부모컴포넌트로부터 추가 컨텐츠를 받아와(children) 사용한다.
- children이라는 이름의 prop으로 전달된다.

```js
function AppCard(){
  return(
    <>
      <Card>
        <p>Card</p>
      </Card>

      <Card>
        <h1>Card2</h1>
        <p>설명</p>
      </Card>
    <>
  )
}

function Card({ children }){
  return(
    <div>
      style=({
        backgroundColor: 'black',
        borderRadius: '20px',
        color:'white',
        minHeight: '200px',
        maxWidth: '200px',
        margin: '1rem',
        padding: '1rem',
        textAlign: 'center'
      })
      {children}
    </div>
  )
}
```

## useContext

- 전역 상태 관리 react hook
- 모든 컴포넌트들이 필요한 상태가 필요할때
- 어플리케이션 전반적으로 필요한 경우
- 예) 언어, 테마(다크모드), 로그인
- 모든 자식 컴포넌트가 리랜더링 되기때문에 빈번히 업데이트 되는 상태는 X
- 엄브렐러 테크닉 사용하자.(원하는 컴포넌트 트리 중간에 사용)

```JS
// 보통 context라는 폴더 안에 만든다.
// context를 사용하기 위해 createContext() 호출하여 context를 만든다.
export const DarkModeContext = createContext();

// 자식 컴포넌트를 받아오는 컴포넌트를 만든다.
// provider로 감싸고 value = props를 전달한다.
export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((mode) => !mode);
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}


```

- 부모 컴포넌트

```js
export default function AppTheme() {
  return (
    <DarkModeProvider>
      <Header />
      <Main />
      <Footer />
    </DarkModeProvider>
  );
}
```

- 자식 컴포넌트

```js
function ProductDetail() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      <p>
        {darkMode ? (
          <span style={{ backgroundColor: 'black', color: 'white' }}>
            Dark Mode
          </span>
        ) : (
          <span>Light Mode</span>
        )}
      </p>
      <button onClick={() => toggleDarkMode()}>Toggle</button>
    </div>
  );
}
```

## 성능개선

**_용어_**

- Memoization: 메모이제이션은 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법

**_React.memo_**

- HOC
- 클래스 또는 함수형 컴포넌트에서 사용 가능
- 단순 UI 컴포넌트 리렌더링 방지

```js
const Button = memo({text,onClick})=>{
  // 전달받은 props의 값이 변경되지 않으면 다시 호출하지 않는다.
  // onClick은 부모 컴포넌트의 상태가 변경되면 함수가 다시 생성되기 떄문에 useCallback처리를 해주고 전달해줘야 한다.
  //그렇지 않으면 props의 onClick이 변경되어 Button 컴포넌트가 다시 호출된다.(밑에서 설명)

}


```

**_useMemo_**

- react hook
- 함수형 컴포넌트만
- 함수의 연산량이 많아서 그 결과값의 재사용(결과값 보존)

```js

const Button = memo({text,onClick})=>{
  const result = calculateSomething();
  // Button 컴포넌트가 호출될때마다 calculateSomethig()이 재호출된다.
  // 많은 시간을 필요로하는 로직이 존재할경우 성능에 문제가 생긴다.
  // 때문에 상황에따라 useMemo를 사용해 결과값을 저장해두는 것이 좋다
  // onClick이벤트가 발생할때마다 calculateSomething 함수가 호출된다.
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
}

 function calculteSomething() {
    for (let = i; i < 10000; i++) {
      console.log('🐱')
    }
  }
```

- useMemo 사용

```js
const Button = memo({text,onClick})=>{
  const result = useMemo(()=>calculateSomething(),[])
  // 처음에는 단한번만 호출하기 위해 사용하는 것이니 useEffect를 써도 되지 않은가라는 생각이 들었었다.
  // 그러나 useEffect는 비동기로 동작을 하기 때문에 다르다.
  // 결과값을 보존할 때 사용하자
  // useCallback과 동작은 같고 사용방법에 약간의 차이만 있으나
  // 역할을 명확히 구분하기 위해 useCallback은 함수의 재사용, useMemo는 결과값의 보존에 사용하는 것이 좋다.
   // Button 컴포넌트가 처음 만들어 졌을때만 calculateSomething 함수가 호출된다.
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
}

 function calculteSomething() {
    for (let = i; i < 10000; i++) {
      console.log('🐱')
    }
  }
```

**_useCallback_**

- react hook
- 함수형 컴포넌트에만 사용가능
- 함수의 재생성 막음

```js
function AppMentorsButton() {
  const [person, dispatch] = useReducer(personReducer, initalPerson);

  // 리액트는 상태가 업데이트되면 컴포넌트를 다시 호출한다.
  // 그렇기 떄문에 handleUpdate는 재생성이되고 자식 컴포넌트에 prop으로 이전과 다른 함수가 전달된다.
  // 그래서 React.memo()만으로는 자식컴포넌트의 재호출을 막을 수 없기때문에
  // useCallback을 사용해야한다.

  const handleUpdate = useCallback(() => {
    const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);

    dispatch({ type: 'updated', prev, current });
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
```

## 커스텀 훅

- 커스텀 훅
- use로 만드는 것이 스타일 가이드
- 함수로 만들어야한다.
- 일반 컴포넌트와 다른점 외부 사람들과 공유하고 싶은 데이터를 리턴한다
- 값의 재사용이 아니라 로직의 재사용을 위한 것이다.

```js
useProducts({saleOnly}){
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState()
  const [products, setProducts] = useState()

  useEffect(()=>{
    setLoading(true)
    setError()

    fetch(`./data/${saleOnly ? 'sale' : ''}.products.json`)
      .then((data)=>{setProducts(data)})
      .catch((err)=>{setError('에러가 발생했습니다.')})
      .finally(()=> {setProducts(false)})
  },[saleOnly])

  return [loading, error, products]
}

<!-- ---------------------------- Products.jsx ----------------------------- -->
import useProducts from '../../hooks/use-products'

function Products(){
  const [checked, setChecked] = useState(false)
  const [loading, error, products] = useProducts({saleOnly: checked})

  const handleChange = () => {setChecked(prev => !prev)}

  if(loading) return <p>Loading...</p>

  if(error) return <p>{error}</p>

  return (
    <>
      <label htmlFor='checkbox'>Show Only Sale</label>
      <input
      id='checkbox'
      type='checkbox'
      value={checked}
      checked={checked}
      onChange={handleChange}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    <>
  )
}


```
