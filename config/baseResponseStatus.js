module.exports = {

    //1***
    // Success
    SUCCESS: { isSuccess: true, code: 1000, message: '성공' },
    ARTICLE_BY_KINDID_SUCCESS: {isSuccess: true, code: 1100, message: '게시글 조회(KindId로)성공'},
    ARTICLE_POPULAR_BY_KINDID_SUCCESS: {isSuccess: true, code: 1101, message: '인기게시글 조회(KindId로)성공'},
    ARTICLEBYKINDID_NOT_EXIST : { "isSuccess": true, "code": 1102, "message": "게시글이 존재하지 않습니다." },
    ARTICLEPOPULAR_BYKINDID_NOT_EXIST : { "isSuccess": true, "code": 1103, "message": "인기게시글이 존재하지 않습니다." },
    LIKEARTICLE_NOT_EXIST : { "isSuccess": true, "code": 1104, "message": "관심있는 게시글이 존재하지 않습니다." },
    LIKEARTICLE_BY_USERID_SUCCESS : { "isSuccess": true, "code": 1105, "message": "유저의 관심있는 게시글 조회성공" },
    LIKEARTICLE_PATCH_STATUS_SUCCESS : { "isSuccess": true, "code": 1106, "message": "관심있는 게시글 삭제 성공" },


    //2*** - Request error
    // User Response
    USER_USERID_EMPTY: { isSuccess: false, code: 2000, message: '유저Id를 입력하세요.' },
    ARTICLE_ARTICLEID_EMPTY: { isSuccess: false, code: 2001, message: 'articleId를 입력하세요.' },

    // Article Response
    ARTICLE_KINDID_EMPTY: {isSuccess: false, code: 2100, message:'ArticleKindId를 입력해주세요'},
    ARTICLE_KINDID_NOT_EXIST: {isSuccess: false, code: 2101, message:'ArticleKindId를 확인해주세요'},


    //3*** - Response error
    USER_LIKEARTICLE_BY_USERID_ARTICLEID_EMPTY_FOR_DELETE: {isSuccess: false, code: 3001, message: '삭제할 관심있는 글이 없습니다.'},


    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
};