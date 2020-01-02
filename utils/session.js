const constants = require('./constants');
const SESSION_KEY = 'Read_session_' + constants.WX_SESSION_ID;
const SESSION_USER_DATA = 'Read_session_' + constants.WX_USER_DATA;
const SESSION_MARK_WORDS = 'Read_session_' + constants.WX_MARK_WORDS;

const Session = {
    get: function () {
        try {
            return wx.getStorageSync(SESSION_KEY) || null;
        } catch (e) {}
    },

    set: function (session) {
        try {
            wx.setStorageSync(SESSION_KEY, session);
        } catch (e) {}
    },

    getUser: function () {
        try {
            return wx.getStorageSync(SESSION_USER_DATA) || null;
        } catch (e) {}
    },

    setUser: function (session) {
        try {
            wx.setStorageSync(SESSION_USER_DATA, session);
        } catch (e) {}
    },

    getMarkWords: function () {
        try {
            return wx.getStorageSync(SESSION_MARK_WORDS) || null;
        } catch (e) {}
    },

    setMarkWords: function (session) {
        try {
            wx.setStorageSync(SESSION_MARK_WORDS, session);
        } catch (e) {}
    },

    clear: function () {
        try {
            wx.clearStorageSync()
        } catch (e) {}
    }
}

module.exports = Session;
