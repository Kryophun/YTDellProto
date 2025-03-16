"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoData = getVideoData;
const axios_1 = __importDefault(require("axios"));
function getVideoInfo(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://www.youtube.com/youtubei/v1/player?key=AIzaSyDophAQuyyiBr8h0nypEwXUKozH-BEswD0";
        const payload = {
            context: {
                client: {
                    hl: "en",
                    clientName: "WEB",
                    clientVersion: "2.20210721.00.00",
                    clientFormFactor: "UNKNOWN_FORM_FACTOR",
                    clientScreen: "WATCH",
                    mainAppWebInfo: {
                        graftUrl: `/watch?v=${videoId}`,
                    },
                },
                user: {
                    lockedSafetyMode: false,
                },
                request: {
                    useSsl: true,
                    internalExperimentFlags: [],
                    consistencyTokenJars: [],
                },
            },
            videoId: videoId,
            playbackContext: {
                contentPlaybackContext: {
                    vis: 0,
                    splay: false,
                    autoCaptionsDefaultOn: false,
                    autonavState: "STATE_NONE",
                    html5Preference: "HTML5_PREF_WANTS",
                    lactMilliseconds: "-1",
                },
            },
            racyCheckOk: false,
            contentCheckOk: false,
        };
        try {
            const response = yield axios_1.default.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(JSON.stringify(response.data.streamingData.formats));
            // console.log("----------------------------------");
            // console.log(JSON.stringify(response.data.streamingData.adaptiveFormats));
            return response.data;
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    });
}
function getDownloadableLinks(formats) {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadableLinks = [];
        for (const format of formats) {
            try {
                console.log(`Trying to fetch: ${format.url}`);
                const res = yield fetch(format.url);
                if (res.ok) {
                    downloadableLinks.push(format);
                }
                // eslint-disable-next-line no-empty
            }
            catch (_a) { }
        }
        return downloadableLinks;
    });
}
function getVideoData(videoData) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUnplayable = videoData.playabilityStatus.status !== "OK";
        if (isUnplayable) {
            throw ("Video is unplayable");
        }
        const formats = videoData.streamingData.adaptiveFormats || videoData.streamingData.formats;
        const isHasStreamingUrls = Boolean(formats[0].url);
        if (isHasStreamingUrls) {
            const downloadLinks = yield getDownloadableLinks(formats);
            console.log(`DOWNLOAD LINKS: ${JSON.stringify(downloadLinks)}`);
            return;
        }
        throw new Error("Phase one had no urls");
        // videoData.streamingData.adaptiveFormats = await getAdaptiveFormats({
        //   videoData,
        //   playerData: JSON.parse(htmlYouTubePage.match(gRegex.playerData)[1])
        // });
        // return videoData;
    });
}
function doThings(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoResponseData = yield getVideoInfo("qDnrdeNDRio");
        getVideoData(videoResponseData);
    });
}
// Example usage
//getVideoInfo("qDnrdeNDRio").then((data) => console.log(data));
doThings("qDnrdeNDRio");
