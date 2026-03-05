let apiKey = new URLSearchParams(location.hash.slice(1)).get('api_key');
let pressingShift = false;
let canMakeVideo = true;
if (apiKey == null) {
    apiKey = undefined;
}

if (!apiKey) {
    const input = document.getElementById("inputBoxText");
    input.value = "Get an API key first (the pollinations button)";
    input.disabled = true;
}

document.getElementById("BYOP").addEventListener("click", () => {
    document.location.href = `https://enter.pollinations.ai/authorize?redirect_url=${document.location.href}&app_key=pk_Stijr4WVp1RkETJO`;
})

function blobToUrl(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

async function makeVideo() {
    if (canMakeVideo) {
        canMakeVideo = false
        const input = document.getElementById("inputBoxText")
        const prompt = input.value;
        input.disabled = true;
        input.value = "Generating...";
        const videoRequest = await fetch(`https://gen.pollinations.ai/video/${encodeURIComponent(prompt)}?model=grok-video&width=1280&height=720&audio=true`, {
            headers: {
                Authorization: "Bearer " + apiKey
            }
        });
        const video = await videoRequest.blob();
        const dataUri = await blobToUrl(video);
        const videoFrame = document.getElementById("video");
        videoFrame.src = dataUri;
        input.disabled = false;
        input.value = prompt;
        canMakeVideo = true;
    }
}

document.getElementById("inputBoxText").addEventListener("keydown", (k) => {
    if (k.key == "Enter") {
        if (!k.shiftKey) {
            makeVideo();
        }
    }
})