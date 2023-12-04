import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {
  const temporary = [
    { id: 1, cover: 'src/assets/oppenhemier.jpg', source: 'TMdB' },
    { id: 2, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 3, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 4, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 5, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 6, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 7, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { id: 8, cover: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
  ];

  return (
    <div className="flex flex-col">
      <HomePage model={props.model} posts={temporary} />
    </div>
  );
}

export default observer(HomePresenter);
