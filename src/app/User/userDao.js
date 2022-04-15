


// 6-1 카카오로그인 우선 유저가 회원인지 체크
async function selectUserByKakaoIdCheck(connection, kakaoId) {
    const selectUserByKakaoIdQuery= `select
                                       id,
                                       kakaoId
                                     from User as u
                                     where u.status = 'ACTIVE' and u.kakaoId = ?;`

    const [selectUserByKakaoIdRows] = await connection.query(selectUserByKakaoIdQuery, kakaoId)

    // console.log(selectUserByKakaoIdRows)
    // console.log(selectUserByKakaoIdRows[0])

    return selectUserByKakaoIdRows[0]
}

// 6-2 회원가입 (카카오)
async function insertUserByKakaoId(connection, createUserByKakaoIdParams) {
    const insertUserByKakaoIdQuery= `INSERT INTO
                                       User (kakaoId, nickname)
                                     VALUES (?, ?);`

    const [insertUserByKakaoIdRows] = await connection.query(insertUserByKakaoIdQuery, createUserByKakaoIdParams)

    // console.log(insertUserByKakaoIdRows)
    // console.log(insertUserByKakaoIdRows.insertId)

    return insertUserByKakaoIdRows.insertId
}


// 9 내 설정 조회
async function selectUserByUserId(connection, userId) {
    const selectUserByUserIdQuery = `select
                                       nickname,
                                       studyKindId
                                     from User as u
                                     where u.status = 'ACTIVE' and u.id = ?;`

    const [selectUserByUserIdRows] = await connection.query(selectUserByUserIdQuery, userId);

    return selectUserByUserIdRows[0]
}

//10. 내 설정 수정
async function updateUserInfo(connection, editUserInfoData) {
    const updateUserInfoQuery = `UPDATE
                                   User as u
                                 SET u.nickname = ?, u.studyKindId = ?
                                 WHERE u.id = ? and u.status = 'ACTIVE';`

    const [updateUserInfoRows] = await connection.query(updateUserInfoQuery, editUserInfoData);

    return updateUserInfoRows[0]
}

//11. 내 관심글 조회
async function selectLikeArticleByUserId(connection, userId) {
    const selectLikeArticleByUserIdQuery = `select
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
                                            where a.status != 'INACTIVE' and la.userId = ?
                                            group by a.id
                                            order by (case when a.status = 'ACTIVE' then 1 else 2 end), a.createdAt desc;`

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

//14. 내 모집글 조회
async function selectUserArticleByUserId(connection, userId) {
    const selectUserArticleByUserIdQuery = `select
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
                                            where a.status != 'INACTIVE' and a.userId = ?
                                            group by a.id
                                            order by (case when a.status = 'ACTIVE' then 1 else 2 end), a.createdAt desc;`

    const [selectUserArticleByUserIdRows] = await connection.query(selectUserArticleByUserIdQuery, userId)
    return selectUserArticleByUserIdRows

}

//15. 모집글 등록
async function insertArticleByUserId(connection, insertArticleData) {
    const insertArticleByUserIdQuery = `INSERT INTO Article (userId, title, categoryId, description)
                                            VALUES (?, ?, ?, ?);`

    const [insertArticleByUserIdRows] = await connection.query(insertArticleByUserIdQuery, insertArticleData)
    return insertArticleByUserIdRows

}

//16-1(=17-1) 모집글 수정 전 게시글이 유저것이 맞는지 확인
async function selectArticleInfoCheck(connection, articleInfoCheckParams) {
    const selectArticleInfoCheckQuery = `select
                                           a.id
                                         from Article as a
                                         where a.status != 'INACTIVE' and a.userid = ? and a.id = ?;`

    const [selectArticleInfoCheckRows] = await connection.query(selectArticleInfoCheckQuery, articleInfoCheckParams)
    return selectArticleInfoCheckRows[0]

}

//16-2 유저것이 맞다면 수정
async function patchArticleInfo(connection, patchArticleInfoData) {
    const patchArticleInfoQuery = `UPDATE Article a SET a.title = ?, a.categoryId = ?, a.description = ?
                                   WHERE a.id = ? and a.userId = ?;`

    const [patchArticleInfoRow] = await connection.query(patchArticleInfoQuery, patchArticleInfoData)
    return patchArticleInfoRow[0]

}

//17-1 (=16-1)과 같기 때문에 재사용
//17-2 유저것이 맞다면 삭제 (수정 => statua = 'INACTIVE')
async function patchArticleStatus(connection, userId, articleId) {
    const patchArticleStatusQuery = `UPDATE Article a SET a.status = 'INACTIVE'
                                     WHERE a.userId = ? and a.id = ?;`

    const [patchArticleStatusRow] = await connection.query(patchArticleStatusQuery, [userId, articleId])
    return patchArticleStatusRow[0]

}



module.exports = {

    //6-1 유저 회원인지 체크
    selectUserByKakaoIdCheck,
    //6-2 회원이 아닐경우 회원가입
    insertUserByKakaoId,

    //9 내 설정 조회
    selectUserByUserId,

    //10 내 설정 수정
    updateUserInfo,

    //11. 내 관심글 조회
    selectLikeArticleByUserId,

    //13
    selectLikeArticleCheck,
    updateLikeArticleStatus,

    //14. 내 모집글 조회
    selectUserArticleByUserId,

    //15. 모집글 등록
    insertArticleByUserId,

    //16-1(=17-1) 모집글 수정 전 게시글이 유저의 것이 맞는지 체크
    selectArticleInfoCheck,
    //16-2 모집글 수정
    patchArticleInfo,

    //17-1은 16-1과 같기 때문에 재사용
    //17-2 모집글 삭제
    patchArticleStatus,

}