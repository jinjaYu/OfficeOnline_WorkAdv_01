/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.info('Scripting API ready');
    console.info('Player tags: ',WA.player.tags)

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
		WA.room.showLayer('above/roof');
	  });

	  // 3. 監聽離開區域
	  WA.room.area.onLeave('roofZone').subscribe(() => {
		
		//WA.ui.openPopup("rz11", "It's out zone", []);
		
		// 隱藏圖層
		WA.room.hideLayer('above/roof');
	  });
	  
	  WA.room.area.onEnter('point1').subscribe(() => {
		
		// 顯示圖層
		WA.room.hideLayer('point2');
	  });


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
