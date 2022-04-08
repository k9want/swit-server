async function selectLikeArticleByUserId(connection, userId) {
    const selectLikeArticleByUserIdQuery = `select
                                              a.title,
                                              count(distinct(c.id)) as commentCount,
                                              count(distinct(la.userId)) as likeCount,
                                              count(distinct(v.userId)) as viewCount,
                                              a.status,
                                              a.createdAt
                                            from Article as a
                                                   left join Comment c on a.id = c.articleId
                                                   left join LikedArticle la on a.id = la.articleId
                                                   left join View v on a.id = v.articleId
                                            where a.status != 'INACTIVE' and la.userId = ?
                                            group by a.id
                                            order by (case when a.status = 'ACTIVE' then 1 else 2 end), a.createdAt desc;
    `

    const [selectLikeArticleByUserIdRows] = await connection.query(selectLikeArticleByUserIdQuery, userId)
    return selectLikeArticleByUserIdRows

}



//13.
// 13-1 내 관심글 삭제하기 전에 관심글아이디가져오기(관심게시글이 있는지 확인하기 위해)
async function selectLikeArticleCheck(connection, userLikeArticleCheckParams) {
    const selectLikeArticleCheckQuery = `select
                                              id as likeArticleId
                                            from LikedArticle as la
                                            where la.status = 'ACTIVE' and la.userId = ? and la.articleId = ?;`

    const [selectLikeArticleIdRows] = await connection.query(selectLikeArticleCheckQuery, userLikeArticleCheckParams)
    // console.log(selectLikeArticleIdRows[0])
    return selectLikeArticleIdRows[0]

}
//13-2 존재하니까 삭제 삭제하기
async function updateLikeArticleStatus(connection, likeArticleId) {
    const updateLikeArticleStatusQuery = `UPDATE
                                           LikedArticle as la
                                         SET la.status = 'INACTIVE'
                                         WHERE la.id = ?;`

    const updateLikeArticleStatusRows = await connection.query(updateLikeArticleStatusQuery, likeArticleId)
    // console.log(updateLikeArticleStatusRows)
    return updateLikeArticleStatusRows

}


module.exports = {
    selectLikeArticleByUserId,

    //13
    selectLikeArticleCheck,
    updateLikeArticleStatus


}