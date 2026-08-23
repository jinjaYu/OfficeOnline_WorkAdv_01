/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.info('Scripting API ready');
    console.info('Player tags: ', WA.player.tags)
    WA.room.hideLayer('floor/magicwords'); // 執行你的邏輯
    WA.room.hideLayer('floor/floor3');


    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "I'aaas " + time, []);
    })
	
	WA.room.area.onEnter('clock2').subscribe(() => {
		const today = new Date();
		const time = today.getHours() + ":" + today.getMinutes();
		currentPopup = WA.ui.openPopup("rz11", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)
	

	  // 2. 監聽進入區域
	  WA.room.area.onEnter('roofZone').subscribe(() => {
		
		// 將定位物件改為 'roofZone' 確保彈出窗能正常顯示
		//WA.ui.openPopup("rz11", "It's in zone", []); 
		
		// 顯示圖層
		  WA.room.showLayer('above/roof2');
		  WA.room.showLayer('floor/floor3');
	  });

	  // 3. 監聽離開區域
	  WA.room.area.onLeave('roofZone').subscribe(() => {
		
		//WA.ui.openPopup("rz11", "It's out zone", []);
		
		// 隱藏圖層
		  WA.room.hideLayer('floor/floor3');
		  WA.room.hideLayer('above/roof2');
      });

		WA.room.area.onEnter('attic').subscribe(() => {
			// 顯示圖層
            WA.room.showLayer('furniture/furniture3');
		});

		// 3. 監聽離開區域
		WA.room.area.onLeave('roofZone').subscribe(() => {
			// 隱藏圖層
            WA.room.hideLayer('furniture/furniture3');
		});

	  
	  WA.room.area.onEnter('point1').subscribe(() => {
		
		// 顯示圖層
		WA.room.hideLayer('point2');
	  });
    WA.room.area.onEnter('point1').subscribe(() => {
        WA.controls.disablePlayerControls();
        WA.ui.openPopup("speak1", "歡迎來到無處高塔！在此展示光輝給您！", [
            {
                label: "接受恩惠！",          // 按鈕文字
                className: "primary",      // 按鈕樣式 (可選: 'primary', 'success', 'warning', 'danger', 'normal')
                callback: (popup) => {     // 點擊後的事件
                    WA.room.showLayer('floor/magicwords'); // 執行你的邏輯
                    popup.close();         // 關閉視窗
                    WA.controls.restorePlayerControls();
                }
            },
            {
                label: "不用了。",
                className: "normal",
                callback: (popup) => {
                    popup.close();         // 僅關閉視窗
                    WA.controls.restorePlayerControls(); 
                }
            }
        ]);
    })


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.info('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
