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

    //2. 게시글 조회(최신순)
    selectArticleByKindId,

    //4. 게시글 조회(인기순)
    selectArticlePopularByKindId

};