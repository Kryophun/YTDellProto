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
const axios_1 = __importDefault(require("axios"));
function getVideoInfo(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
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
            return response.data;
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    });
}
// Example usage
getVideoInfo("qDnrdeNDRio").then((data) => console.log(data));
