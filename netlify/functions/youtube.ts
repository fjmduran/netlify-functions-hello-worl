import { Handler } from "@netlify/functions";
import ytdl = require("ytdl-core"); // descargador de youtube

const handler: Handler = async (event, context) => {
    try {
        const url: string | undefined = event.queryStringParameters!.url;
        const _optionDownload: string | undefined = event.queryStringParameters!.optionDownload;
        console.log("Youtbe url: " + url);
        console.log("optionDownload: " + _optionDownload);
        if (!ytdl.validateURL(url!.toString())) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No es una url válida" }),
              };
        }
        let optionDownload: "audioandvideo" | "videoonly" | "audioonly";
        switch (_optionDownload) {
          case "audioonly":
            optionDownload = "audioonly";
            break;
          case "videoonly":
            optionDownload = "videoonly";
            break;
          default:
            optionDownload = "audioandvideo";
            break;
        }
        //res.header("Content-Type", "video/mp4");
        return ytdl(url!.toString(), {
          filter: optionDownload,
          quality: "highest",
        })
      } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello World" }),
          };
      }
};

export { handler };