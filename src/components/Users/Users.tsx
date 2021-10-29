import React, {FC} from "react";
import style from './Users.module.scss';
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import UsersForm from "./UsersForm/UsersForm";
import {actions, FilterType, followUserThunk, unfollowUserThunk} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getFollowingProgress,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/usersSelectors";

type PropsType = {
    pageSide: number
    currentPage: number
    onPaginationItemClick: (pageId: number) => void
};

const Users: FC<PropsType> = ({pageSide, currentPage, onPaginationItemClick}) => {
    const users = useSelector(getUsersSelector);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const followingProgress = useSelector(getFollowingProgress);

    const dispatch = useDispatch();
    const followUser = (id: number) => {
        dispatch(followUserThunk(id));
    };
    const unfollowUser = (id: number) => {
        dispatch(unfollowUserThunk(id));
    };
    const setFilter = (filter: FilterType) => {
        dispatch(actions.setFilter(filter));
    };

    const pagesCount = Math.ceil(totalUsersCount / pageSide);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.users}>
            <div className={style.title}>Users</div>
            <UsersForm setFilter={setFilter}/>
            {users.map( (user) => <User
                                                key={user.id}
                                                id={user.id}
                                                name={user.name}
                                                status={user.status}
                                                avaSrc={user.photos.small}
                                                followed={user.followed}
                                                followingProgress={followingProgress}
                                                followUser={followUser}
                                                unfollowUser={unfollowUser}
            />)}
            <Paginator pages={pages} currentPage={currentPage} pagesLength={pages.length}
                       onPaginationItemClick={onPaginationItemClick}/>
        </div>
    )
};

export default Users;