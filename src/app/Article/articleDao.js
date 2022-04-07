
async function selectArticleByKindId(connection, kindId) {
    const selectArticleByKindIdListQuery = `select
                                   A.title,
                                   count(distinct(C.id)) as commentCount,
                                   count(distinct(LA.userId)) as likeCount,
                                   count(distinct(V.userId)) as viewCount
                                 from Article as A
                                        left join Comment C on A.id = C.articleId
                                        left join LikedArticle LA on A.id = LA.articleId
                                        left join View V on A.id = V.articleId
                                 where A.status = 'ACTIVE' and A.categoryId = ?
                                 group by A.id
                                 order by A.createdAt desc;`;
    const [selectArticleByKindIdList] = await connection.query(selectArticleByKindIdListQuery, [kindId]);
    return selectArticleByKindIdList;
}




module.exports = {
    selectArticleByKindId
};