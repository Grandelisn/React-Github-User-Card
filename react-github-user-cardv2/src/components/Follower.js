import React from "react";

const Follower = (props) => {
    return (
    <div className= 'individual'>
        <img src={props.item.avatar_url}></img>
        <p>{props.item.login}</p>
        <a href={props.item.html_url}>{props.item.html_url}</a>
    </div>
    )
  }

  export default Follower