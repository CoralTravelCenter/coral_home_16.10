import {vimeoAutoPlay} from "../../utils.js";
import './VideoBanner.scss'

function videoBannerInit() {
  vimeoAutoPlay()
}

window.location.origin.includes("backoffice") || videoBannerInit();
