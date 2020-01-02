module.exports = {
    WX_HEADER_CODE: 'X-WX-Code',
    WX_HEADER_ENCRYPTED_DATA: 'X-WX-Encrypted-Data',
    WX_HEADER_IV: 'X-WX-IV',
    WX_HEADER_ID: 'X-WX-Id',
    WX_HEADER_SKEY: 'X-WX-Skey',

    /**
     * 角色权限类型
     */
    WX_PERSON_TYPE_TEACHER: 'TEACHER',
    WX_PERSON_TYPE_PARENT: 'PARENT',


    /**
     * 发送消息  选择发送人的类型
     */
    WX_NOTICE_SEND_TYPE_PARENT: 'PARENT',
    WX_NOTICE_SEND_TYPE_TEACHER: 'TEACHER',
    WX_NOTICE_SEND_TYPE_SCHOOL: 'SCHOOL',

    /**
     * token session id
     */
    WX_SESSION_ID: '__token',
    /**
     * USER 存储
     */
    WX_USER_DATA: '__user_data',
    /**
     * WX_MARK_WORDS 存储
     */
    WX_MARK_WORDS: '__mark_words',
    /**
     * SCHOOL ID  存储当前学校的ID
     */
    WX_SCHOOL_ID: '__school_id',


    /**
     * 参数失效错误
     */
    ERR_INVALID_PARAMS: -1,
    /**
     * 网络错误
     */
    ERR_NETWORK_FAILED: -2,
    /**
     * 获取数据失败
     */
    REQUEST_FAIL: 0,
    /**
     * 正确的获取数据
     */
    REQUEST_SUCCESS: 1,
    /**
     * token过期
     */
    ERR_INVALID_SESSION: 6,
    /**
     * 数据失效错误,次类错误UI层会做相应的变化
     */
    ERR_INVALID_DATA: 3,
    /**
     * 返回的结果也是正确的   并且要执行页面刷新
     */
    ERR_REFRESH_DATA: 5,
    /**
     * 未登录 未绑定
     */
    ERR_INVALID_LOGIN: 401,
};
