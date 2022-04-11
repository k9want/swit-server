//1-1. 게시글 상세조회 (내용)
async function selectArticleByArticleId(connection,userIdFromJWT, articleId) {
    const selectArticleByArticleIdQuery = `select
                                             a.id as articleId,
                                             a.title,
                                             case
                                               when a.categoryId = 1 then '개발'
                                               when a.categoryId = 2 then '취업'
                                               when a.categoryId = 3 then '면접'
                                               else '공부'
                                               end as category,
                                             u.nickname,
                                             date_format(a.createdAt, '%Y.%m.%d') as createAt,
                                             if(? = a.userId, 'Y', 'N') as editable,
                                             a.description,
                                             count(distinct(la.userId)) as likeCount,
                                             count(distinct(v.userId)) as viewCount,
                                             a.status
                                           from Article as a
                                                  left join User u on u.id = a.userId
                                                  left join LikedArticle la on a.id = la.articleId
                                                  left join View v on a.id = v.articleId
                                           where a.status != 'INACTIVE' and u.status = 'ACTIVE' and a.id = ?;`;
    const [selectArticleByArticleIdRow] = await connection.query(selectArticleByArticleIdQuery, [userIdFromJWT, articleId]);
    return selectArticleByArticleIdRow[0];
}



//1-2(1). 게시글 상세조회 (댓글개수)
async function selectArticleCommentsCount(connection, articleId) {
    const selectArticleCommentsCountQuery = `select
                                               count(c.id) as commentCount
                                             from Comment as c
                                                    left join Article a on a.id = c.articleId
                                             where c.status = 'ACTIVE' and c.articleId = ?;`;
    const [selectArticleCommentsCountRow] = await connection.query(selectArticleCommentsCountQuery,  articleId);
    return selectArticleCommentsCountRow[0];
}



//1-2(2). 게시글 상세조회 (댓글)
async function selectArticleComments(connection, userIdFromJWT, articleId) {
    const selectArticleCommentsQuery = `select
                                          u.nickname,
                                          date_format(c.createdAt, '%Y.%m.%d %H:%i') as createdAt,
                                          c.description,
                                          if(? = c.userId, 'Y', 'N') as commentEditable
                                        from Comment as c
                                        left join Article a on c.articleId = a.id
                                        left join User u on c.userId = u.id
                                        where c.status = 'ACTIVE' and c.articleId = ?
                                        order by createdAt desc;

    `;
    const [selectArticleCommentsRow] = await connection.query(selectArticleCommentsQuery, [userIdFromJWT, articleId]);
    return selectArticleCommentsRow;
}

//2. 게시글 조회 (종류) - 최신순
async function selectArticleByKindId(connection, kindId) {
    const selectArticleByKindIdListQuery = `select
                                              a.id as articleId,
                                              a.title,
                                              count(distinct(c.id)) as commentCount,
                                              count(distinct(la.userId)) as likeCount,
                                              count(distinct(v.userId)) as viewCount,
                                              date_format(a.createdAt, '%Y.%m.%d') as createAt,
                                              a.status
                                            from Article as a
                                                   left join Comment c on a.id = c.articleId
                                                   left join LikedArticle la on a.id = la.articleId
                                                   left join View v on a.id = v.articleId
                                            where a.status != 'INACTIVE' and a.categoryId = ?
                                            group by a.id
                                            order by (case when a.status = 'ACTIVE' then 1 else 2 end), a.createdAt desc;`;
    const [selectArticleByKindIdList] = await connection.query(selectArticleByKindIdListQuery, [kindId]);
    return selectArticleByKindIdList;
}


//4. 게시글 조회 (종류) - 인기순
async function selectArticlePopularByKindId(connection, kindId) {
    const selectArticleByKindIdListQuery = `select
                                              a.id as articleId,
                                              a.title,
                                              count(distinct(c.id)) as commentCount,
                                              count(distinct(la.userId)) as likeCount,
                                              count(distinct(v.userId)) as viewCount,
                                              date_format(a.createdAt, '%Y.%m.%d') as createAt,
                                              a.status
                                            from Article as a
                                                   left join Comment c on a.id = c.articleId
                                                   left join LikedArticle la on a.id = la.articleId
                                                   left join View v on a.id = v.articleId
                                            where a.status != 'INACTIVE' and a.categoryId = ?
                                            group by a.id
                                            order by (case when a.status = 'ACTIVE' then 1 else 2 end), viewCount desc;`;
    const [selectArticleByKindIdList] = await connection.query(selectArticleByKindIdListQuery, [kindId]);
    return selectArticleByKindIdList;
}





module.exports = {

    //1-1. 게시글 상세조회 (내용)
    selectArticleByArticleId,

    //1-2(1) 게시글 댓글 개수
    selectArticleCommentsCount,
    //1-2(2) 게시글 댓글들 조회
    selectArticleComments,

    //2. 게시글 조회(최신순)
    selectArticleByKindId,

    //4. 게시글 조회(인기순)
    selectArticlePopularByKindId

};