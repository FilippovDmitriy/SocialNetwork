import React, {FC, useState} from "react";
import s from "./Paginator.module.scss";
import classNames from "classnames";

type PropsType = {
    pages: Array<number>
    currentPage: number
    pagesLength: number
    onPaginationItemClick: (pageId: number) => void
};

const Paginator: FC<PropsType> = ({pages, currentPage, pagesLength, onPaginationItemClick}) => {

    const [dotsModeLeft, setDotsModeLeft] = useState(false);
    const [dotsModeRight, setDotsModeRight] = useState(false);

    const toggleDotsModeLeft = (booleanValue: boolean) => {
        if (dotsModeLeft !== booleanValue) {
            setDotsModeLeft(booleanValue);
        }
    };
    const toggleDotsModeRight = (booleanValue: boolean) => {
        if (dotsModeRight !== booleanValue) {
            setDotsModeRight(booleanValue);
        }
    };

    return (
        <div className={s.pagination}>
            {
                pages.filter((p: number) => {
                    if (currentPage < 5 && pages.length > 5) {
                        toggleDotsModeLeft(false);
                        toggleDotsModeRight(true);
                        return (p < 6) || (p === pagesLength)
                    }
                    else if (currentPage > pagesLength - 4) {
                        toggleDotsModeLeft(true);
                        toggleDotsModeRight(false);
                        return (p === 1) || (p >= pagesLength - 4)
                    }
                    else if (currentPage >= 5 || currentPage <= pagesLength - 4) {
                        toggleDotsModeLeft(true);
                        toggleDotsModeRight(true);
                        return (p === currentPage)
                            || ((p >= currentPage - 2) && (p <= currentPage + 2))
                            || (p === 1)
                            || (p === pagesLength)
                    }
                    else {
                        return true;
                    }
                })
                    .map((p: number) => {
                        if (p === 1 && dotsModeLeft) {
                            return (
                                <span className={s.paginationDots} key={'paginationDots' + p}>
                                        <span key={p}
                                              className={classNames(s.paginationItem, {[s.selected]: p === currentPage})}
                                              onClick={() => {onPaginationItemClick(p)}}>{p}</span>
                                        <span key={'dots' + p} className={s.paginationDotsItem}>...</span>
                                    </span>
                            )
                        }
                        else if (p === pagesLength && dotsModeRight) {
                            return (
                                <span className={s.paginationDots} key={'paginationDots' + p}>
                                        <span key={'dots' + p} className={s.paginationDotsItem}>...</span>
                                        <span key={p}
                                              className={classNames(s.paginationItem, {[s.selected]: p === currentPage})}
                                              onClick={() => {onPaginationItemClick(p)}}>{p}</span>
                                    </span>
                            )
                        }
                        else {
                            return (
                                <span key={p}
                                      className={classNames(s.paginationItem, {[s.selected]: p === currentPage})}
                                      onClick={() => {onPaginationItemClick(p)}}>{p}</span>
                            )
                        }
                    })
            }
        </div>
    )
};

export default Paginator;