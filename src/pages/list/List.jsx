import { Link, useLoaderData } from "react-router-dom";

function List(props) {
  const { characters } = props;

  return (
    <section>
      {characters.map((character, index) => (
        <div key={index}>
          <Link to={`/characters/${index}`}>{character.name}</Link>
        </div>
      ))}
    </section>
  );
}

function ListWrapper() {
  const characters = useLoaderData();

  return <List characters={characters} />;
}

export default ListWrapper;
