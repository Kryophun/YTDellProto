import axios from "axios";

async function getVideoInfo(videoId: string): Promise<any> {
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
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Example usage
getVideoInfo("qDnrdeNDRio").then((data) => console.log(data));
