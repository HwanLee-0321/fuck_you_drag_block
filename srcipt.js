// ==UserScript==
// @name         범용 드래그 & 복사 방지 해제
// @name:en      Fuck You Drag Block (FYDB)
// @namespace    https://github.com/HwanLee-0321/fuck_you_drag_block
// @version      1.2
// @description  드래그 막아둔 씹@새들아 이거나 먹어.
// @description: en Enables drag, right-click, text selection, and copy on all websites.
// @author       HwanLee
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. CSS를 이용한 선택 방지 해제 (가장 빠르고 기본적인 방법)
    GM_addStyle(`
        * {
            -webkit-user-select: auto !important;
            -khtml-user-select: auto !important;
            -moz-user-select: auto !important;
            -ms-user-select: auto !important;
            -o-user-select: auto !important;
            user-select: auto !important;
        }
    `);

    // 2. 이벤트 리스너를 무력화하여 기능 방지 해제
    const eventsToStop = ['selectstart', 'dragstart', 'contextmenu', 'mousedown', 'keydown'];

    const stopPropagation = function(e) {
        e.stopPropagation();
    };

    // 캡처링 단계에서 이벤트를 차단하여 사이트의 스크립트보다 먼저 실행되게 함
    eventsToStop.forEach(event => {
        document.addEventListener(event, stopPropagation, { capture: true });
    });

    // 3. 특정 요소에 직접 할당된 이벤트 속성 제거
    // 페이지 로딩이 완료된 후 body 전체를 대상으로 한 번 더 확인
    window.addEventListener('load', function() {
        const body = document.body;
        if (body) {
            body.onselectstart = null;
            body.ondragstart = null;
            body.oncontextmenu = null;
        }
    });

})();