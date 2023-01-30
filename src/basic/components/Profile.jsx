import Avatar from './Avatar';

function newDeveloper() {
  return <div className='new'>NEW</div>;
}

export default function Profile({ image, name, title, isNew, isImage }) {
  return (
    <div className='profile'>
      {isImage && <Avatar image={image} isNew={isNew} />}
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
