import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {

  /*Source only needed if we use multiple APIs and want the badge*/
  const temporary = [
    { postId: 1, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMdB' },
    { postId: 2, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 3, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 4, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 5, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 6, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 7, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
    { postId: 8, posterPath: 'src/assets/oppenhemier.jpg', source: 'TMDB' },
  ];
  /*for */
  const moreTemp = [
    {postId:9, profilePicture:'public/default-avatar.jpg', createdBy: "some name 1", posterPath:'src/assets/avatar_movie.jpg',  title:'Title 1', 
    content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {postId:10, profilePicture:'public/default-avatar.jpg', createdBy: "some name 2", posterPath:'src/assets/avatar_movie.jpg', title:'Title 2',
    content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {postId:11, profilePicture:'public/default-avatar.jpg', createdBy: "some name 3", posterPath:'src/assets/avatar_movie.jpg', title:'Title 3',
    content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
    {postId:12, profilePicture:'public/default-avatar.jpg', createdBy: "some name 4", posterPath:'src/assets/avatar_movie.jpg', title:'Title 4',
    content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio, ipsum mollitia laudantium cum. At earum natus quis?'},
  ]

  function loadMorePostACB(){
    //TODO load more post into newPosts array
    alert("USER WANTS MORE POSTS TODO") //remove when model is done
  }
  function userSelectsPost(postId){
    console.log(postId)
    //TODO set currentPost = postId in model
    alert("USER Selects " +postId) //remove when model is done
  }

  return (
    <div className="flex flex-col">
      <HomePage model={props.model} 
      hotPosts={temporary} 
      newPosts={moreTemp} 
      loadMorePosts={loadMorePostACB} 
      selectPost={userSelectsPost}/>
    </div>
  );
}

export default observer(HomePresenter);
