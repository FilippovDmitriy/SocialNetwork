import {useDispatch, useSelector} from "react-redux";
import Users from "./Users";
import {actions, getUsers} from "../../redux/usersReducer";
import React, {FC, useCallback, useEffect, useState} from "react";
import Preloader from "../common/Preloader/Preloader";
import {usePrevious} from "../../utils/customHooks/usePrevious";
import {getCurrentPage, getFilter, getIsFetching, getPageSide} from "../../redux/usersSelectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import {convertFriendValueToBoolean} from "../../utils/functions/convertStringToBoolean";


const UsersPage: FC = () => {
    const [firstLoading, editFirstLoading] = useState(true);

    const filter = useSelector(getFilter);
    const pageSide = useSelector(getPageSide);
    const currentPage = useSelector(getCurrentPage);
    const isFetching = useSelector(getIsFetching);
    const history = useHistory();

    const dispatch = useDispatch();
    const setCurrentPage = useCallback((pageId: number) => {
        dispatch(actions.setCurrentPage(pageId))
    }, [dispatch]);

    let prevFilter = usePrevious(filter);

    useEffect(() => {
        if (!firstLoading) {
            history.push({
                pathname: '/users',
                search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            });
        }
    }, [filter, currentPage, firstLoading, history]);

    useEffect(() => {
        editFirstLoading(false);

        let parsed = queryString.parse(history.location.search.substr(1));
        let actualCurrentPage = currentPage;
        let actualFilter = {...filter};

        if (!!parsed.page) actualCurrentPage = Number(parsed.page);
        if (!!parsed.term) actualFilter.term = parsed.term as string;
        if (!!parsed.friend) actualFilter.friend = convertFriendValueToBoolean(parsed.friend as string);

        if (prevFilter !== filter) {
            if (actualCurrentPage === currentPage) actualCurrentPage = 1;
            dispatch(getUsers(actualCurrentPage, pageSide, actualFilter.term, actualFilter.friend));
            setCurrentPage(actualCurrentPage);
        } else {
            dispatch(getUsers(actualCurrentPage, pageSide, actualFilter['term'], actualFilter['friend']));
        }
    }, [pageSide, currentPage, filter, dispatch, history.location.search, prevFilter, setCurrentPage]);

    const onPaginationItemClick = (pageId: number) => {
        editFirstLoading(false);
        setCurrentPage(pageId);
    };

    return (
        <>
            {!isFetching && <Preloader className={firstLoading ? 'posR' : 'posA'}/>}
            {(isFetching || (!isFetching && !firstLoading))
            && <Users pageSide={pageSide} currentPage={currentPage} onPaginationItemClick={onPaginationItemClick}/>}
        </>
    )
}

export default UsersPage;