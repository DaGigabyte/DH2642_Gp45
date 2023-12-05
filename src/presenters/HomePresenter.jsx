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
  const moreTemp = [
    {id:9, picture:'public/default-avatar.jpg', nickName: "some name 1", postPicture:'src/assets/avatar_movie.jpg', postTitle:'Title 1', postBody:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {id:10, picture:'public/default-avatar.jpg', nickName: "some name 2", postPicture:'src/assets/avatar_movie.jpg', postTitle:'Title 2', postBody:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {id:11, picture:'public/default-avatar.jpg', nickName: "some name 3", postPicture:'src/assets/avatar_movie.jpg', postTitle:'Title 3', postBody:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {id:12, picture:'public/default-avatar.jpg', nickName: "some name 4", postPicture:'src/assets/avatar_movie.jpg', postTitle:'Title 4', postBody:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
  ]

  return (
    <div className="flex flex-col">
      <HomePage model={props.model} hotPosts={temporary} newPosts={moreTemp}/>
    </div>
  );
}

export default observer(HomePresenter);
