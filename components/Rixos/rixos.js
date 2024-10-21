import {vimeoAutoPlay} from "../../utils.js";

function rixoxBannerInit() {
	vimeoAutoPlay();
}

if (!window.location.origin.includes('backoffice')) rixoxBannerInit()