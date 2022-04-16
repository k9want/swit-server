module.exports = {

    //1***
    // Success
    SUCCESS: { "isSuccess": true, "code": 1000, "message": '성공' },
    KAKAO_SIGNIN_SUCCESS:  { "isSuccess": true, "code": 1001, "message": '카카오소셜로그인 성공' },
    USER_BY_USERID_SUCCESS: { "isSuccess": true, "code": 1002, "message": "내설정 조회 성공" },
    USERINFO_EDIT_SUCCESS  : { "isSuccess": true, "code": 1003, "message": '내 설정 수정 성공' },
    ARTICLE_BY_KINDID_SUCCESS: {"isSuccess": true, "code": 1100, "message": '게시글 조회(KindId로)성공'},
    ARTICLE_POPULAR_BY_KINDID_SUCCESS: {"isSuccess": true, "code": 1101, "message": '인기게시글 조회(KindId로)성공'},
    ARTICLEBYKINDID_NOT_EXIST : { "isSuccess": true, "code": 1102, "message": "게시글이 존재하지 않습니다." },
    ARTICLEPOPULAR_BYKINDID_NOT_EXIST : { "isSuccess": true, "code": 1103, "message": "인기게시글이 존재하지 않습니다." },
    LIKEARTICLE_NOT_EXIST : { "isSuccess": true, "code": 1104, "message": "관심있는 게시글이 존재하지 않습니다." },
    LIKEARTICLE_BY_USERID_SUCCESS : { "isSuccess": true, "code": 1105, "message": "유저의 관심있는 게시글 조회성공" },
    LIKEARTICLE_PATCH_STATUS_SUCCESS : { "isSuccess": true, "code": 1106, "message": "관심있는 게시글 삭제 성공" },
    USER_ARTICLE_NOT_EXIST : { "isSuccess": true, "code": 1107, "message": "유저가 작성한 모집글이 존재하지 않습니다." },
    USER_ARTICLE_BY_USERID_SUCCESS : { "isSuccess": true, "code": 1108, "message": "내 모집글 조회성공" },
    ARTICLE_BY_ARTICLEID_SUCCESS: { "isSuccess": true, "code": 1109, "message": "모집글 상세조회 성공" },
    ARTICLE_COMMENT_NOT_EXIST : { "isSuccess": true, "code": 1110, "message": "댓글이 존재하지 않습니다." },
    ARTICLE_COMMENT_SUCCESS: { "isSuccess": true, "code": 1111, "message": "댓글 조회 성공" },
    ARTICLE_BY_USERID_SUCCESS: { "isSuccess": true, "code": 1112, "message": "모집글 등록 성공" },
    ARTICLE_INFO_EDIT_SUCCESS: { "isSuccess": true, "code": 1113, "message": "모집글 정보 수정 성공" },
    ARTICLE_STATUS_EDIT_SUCCESS: { "isSuccess": true, "code": 1114, "message": "모집글 수정(삭제) 성공" },
    COMMENT_BY_ARTICLEID_SUCCESS: { "isSuccess": true, "code": 1115, "message": "댓글 작성 성공" },
    COMMENT_INFO_EDIT_SUCCESS: { "isSuccess": true, "code": 1116, "message": "댓글 수정 성공" },



    //2*** - Request error
    // User Response
    USER_USERID_EMPTY: { "isSuccess": false, "code": 2000, "message": '유저Id를 입력하세요.' },
    USER_ID_NOT_MATCH: { "isSuccess": false, "code": 2001, "message": '유저Id랑 jwt.id랑 값이 다릅니다.' },
    ARTICLE_ARTICLEID_EMPTY: { "isSuccess": false, "code": 2003, "message": 'articleId를 입력하세요.' },
    USER_TOKEN_EMPTY : { "isSuccess": false, "code": 2004, "message": 'JWT토큰을 입력해주세요' },
    USER_TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 2005, "message": 'JWT토큰 검증 실패' },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message": 'nickname을 입력하세요 ' },
    USER_STUDYKINDID_EMPTY : { "isSuccess": false, "code": 2007, "message": 'studyKindId를 입력하세요' },

    KAKAOLOGIN_RETRY : { "isSuccess": false, code: 2011, "message": '카카오로그인 다시 시도해주세요' },
    ACCESS_CODE : { "isSuccess": false, "code": 2012, "message": "유효하지 않은 인가코드입니다." },
    ACCESS_TOKEN : { "isSuccess": false, "code": 2013, "message": "유효하지 않은 액세스토큰입니다" },
    ARTICLE_TITLE_EMPTY : { "isSuccess": false, "code": 2014, "message": "title을 입력하세요" },
    ARTICLE_CATEGORYID_EMPTY : { "isSuccess": false, "code": 2015, "message": "categoryId을 입력하세요" },
    ARTICLE_DESCRIPTION_EMPTY : { "isSuccess": false, "code": 2016, "message": "description을 입력하세요" },
    ARTICLE_CATEGORYID_WRONG : { "isSuccess": false, "code": 2017, "message": "categoryId는 1부터 4 중 하나입니다." },

    // Article Response
    ARTICLE_KINDID_EMPTY: {"isSuccess": false, "code": 2100, "message":'ArticleKindId를 입력해주세요'},
    ARTICLE_KINDID_NOT_EXIST: {"isSuccess": false, "code": 2101, "message":'ArticleKindId를 확인해주세요'},
    COMMENT_DESCRIPTION_EMPTY : {"isSuccess": false, "code": 2102, "message":'댓글 내용(description)을 입력하세요'},
    COMMENT_COMMENTID_EMPTY: {"isSuccess": false, "code": 2103, "message":'commentId을 입력하세요'},


    //3*** - Response error
    USER_LIKEARTICLE_BY_USERID_ARTICLEID_EMPTY_FOR_DELETE: {"isSuccess": false, "code": 3001, "message": '삭제할 관심있는 글이 없습니다.'},
    USER_BY_USERID_NOT_EXIST: {"isSuccess": false, "code": 3002, "message": '해당 유저가 존재하지 않습니다.'},
    ARTICLE_BY_ARTICLEID_WRONG: {"isSuccess": false, "code": 3002, "message": '해당 유저가 존재하지 않습니다.'},
    ARTICLE_BY_ARTICLEID_NOT_EXIST: {"isSuccess": false, "code": 3003, "message":'해당 articleId로 조회되는 모집글이 없습니다.(상세조회 실패)'},
    ARTICLE_INFO_EDIT_NOT_EXIST : {"isSuccess": false, "code": 3004, "message": '수정할 모집글이 없습니다. userId와 articleId를 확인해주세요 '},
    ARTICLE_STATUS_EDIT_NOT_EXIST : {"isSuccess": false, "code": 3005, "message": '삭제할 모집글이 없습니다. userId와 articleId를 확인해주세요 '},
    COMMENT_BY_ARTICLE_NOT_EXIST : {"isSuccess": false, "code": 3006, "message": '댓글을 작성할 모집글이 없습니다. articleId를 확인해주세요 '},
    COMMENT_EDIT_ARTICLE_NOT_EXIST : {"isSuccess": false, "code": 3007, "message": '댓글을 수정할 모집글이 없습니다. articleId를 확인해주세요 '},
    COMMENT_EDIT_NOT_EXIST : {"isSuccess": false, "code": 3008, "message": '수정할 댓글이 없습니다.'},


    //4 ******
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
};