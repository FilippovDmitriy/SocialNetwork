import React, {FC} from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.scss';
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import {PostType} from "../../../types/types";

type Props = {
    addPost: (text: string) => void
    posts: Array<PostType>
};

const MyPosts: FC<Props> = ({addPost, posts}) => {

    let postsElements = posts
        .map(post => <Post key={post.id} message={post.message} />);

    return (
        <div className={style.posts}>
            <div className={style.title}>My posts</div>
            <MyPostsForm addPost={addPost}/>
            {postsElements}
        </div>
    );
}

export default MyPosts;