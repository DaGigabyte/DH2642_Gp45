import { observer } from "mobx-react-lite";
import DetailPostView from "../views/DetailPostView";

function DetailsPresenter(props){

    const post = 
      {postId:9, profilePicture:'public/default-avatar.jpg', 
      userPicture: "public/default-avatar.jpg", //Could store UUID and fetch?
      createdBy: "some name 1", 
      posterPath:'src/assets/avatar_movie.jpg',  
      title:'Title 1', 
      content:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?' +
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?' +       'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'+
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.'+
      'Sunt alias,harum debitis officiis odit id impedit nostrum, sed itaque non pudiandae odio,'+ 
      'ipsum mollitia laudantium cum. At earum natus quis?'
    };
    
  return (
    <div className="flex flex-col">
      <DetailPostView post={post} /> 
    </div>
  );
}

export default observer(DetailsPresenter);