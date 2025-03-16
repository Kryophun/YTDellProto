import axios from "axios";

async function getVideoInfo(videoId: string): Promise<any> {
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
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // console.log(JSON.stringify(response.data.streamingData.formats));
        // console.log("----------------------------------");
        // console.log(JSON.stringify(response.data.streamingData.adaptiveFormats));

        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

type MediaItem = {
    itag: number;
    url: string;
    mimeType: string;
    bitrate: number;
    initRange: {
      start: "0";
      end: string;
    };
    indexRange: {
      start: string;
      end: string;
    };
    lastModified: number;
    contentLength: string;
    averageBitrate: number;
    approxDurationMs: string;
  };
  
  export type FormatItem = MediaItem & {
    width: number;
    height: number;
    quality: "tiny" | "medium" | "hd720";
    fps: 30;
    qualityLabel: "144p" | "360p" | "480p" | "720p";
    audioQuality: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
    approximateDurationMs: string;
    projectionType: string;
    audioSampleRate: string;
    audioChannels: number;
  };
  
  export type AdaptiveFormatItem = MediaItem & {
    width?: number;
    height?: number;
    quality: "tiny" | "medium" | "large" | "hd720" | "hd1080" | "hd1440" | "hd2160" | "hd4320";
    fps?: 30 | 48 | 50 | 60;
    qualityLabel?: "144p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "4320p";
    averageBitrate: number;
    audioQuality?: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
    colorInfo?: {
      primaries: string;
      transferCharacteristics: string;
      matrixCoefficients: string;
    };
    signatureCipher?: string;
    projectionType?: string;
    highReplication?: boolean;
    audioSampleRate?: string;
    loudnessDb?: number;
    audioChannels?: number;
  };

async function getDownloadableLinks(formats: AdaptiveFormatItem[] | FormatItem[]) {
    const downloadableLinks = [];
  
    for (const format of formats) {
      try {
        console.log(`Trying to fetch: ${format.url}`);
        const res = await fetch(format.url);
        if (res.ok) {
          downloadableLinks.push(format);
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }
    return downloadableLinks;
  }

export async function getVideoData(videoData: any): Promise<void> {
    const isUnplayable = videoData.playabilityStatus.status !== "OK";
    if (isUnplayable) {
      throw ("Video is unplayable");
    }
  
    const formats = videoData.streamingData.adaptiveFormats || videoData.streamingData.formats;
    const isHasStreamingUrls = Boolean(formats[0].url);
    if (isHasStreamingUrls) {
      const downloadLinks = await getDownloadableLinks(formats);
      console.log(`DOWNLOAD LINKS: ${JSON.stringify(downloadLinks)}`);
      return;
    }

    throw new Error("Phase one had no urls");
  
    // videoData.streamingData.adaptiveFormats = await getAdaptiveFormats({
    //   videoData,
    //   playerData: JSON.parse(htmlYouTubePage.match(gRegex.playerData)[1])
    // });
    // return videoData;
  }

async function doThings(videoId: string): Promise<void> {
    const videoResponseData = await getVideoInfo("qDnrdeNDRio");
    getVideoData(videoResponseData);
}

// Example usage
//getVideoInfo("qDnrdeNDRio").then((data) => console.log(data));
doThings("qDnrdeNDRio");
