const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getCountVideo(videoId) {
    try {
        const response = await youtube.videos.list({
            part: 'contentDetails',
            id: videoId,
            key: 'AIzaSyDoeqix87I-w2xfilJ1gvrwDJct4XAqrF8'
        });
        const duration = response.data.items[0].contentDetails.duration;
        const totalSeconds = durationToSeconds(duration); // convert duration to total seconds
        const minutes = Math.floor(totalSeconds / 60); // calculate the number of minutes
        const seconds = totalSeconds % 60; // calculate the number of seconds
        const formattedDuration = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds); // format the duration as "mm:ss"
        return formattedDuration;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function durationToSeconds(duration) {
    const matches = duration.match(/[0-9]+[HMS]/g);
    const seconds = matches.reduce((total, match) => {
        const unit = match.slice(-1);
        const value = parseInt(match.slice(0, -1));
        switch (unit) {
            case 'H':
                return total + value * 3600;
            case 'M':
                return total + value * 60;
            case 'S':
                return total + value;
        }
    }, 0);
    return seconds;
}

async function getTotalVideo(durations) {
    try {
            const totalSeconds = durations.reduce((total, duration) => {
                const [minutes, seconds] = duration.split(':').map(Number);
                return total + minutes * 60 + seconds;
            }, 0);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor(totalSeconds % 3600 / 60);

            const formattedDuration = `${hours} giờ ${minutes} phút `;
            return formattedDuration;

    } catch (error) {
        console.error(error);
        return null;
    }
}

// async function getCompleteLecture(userLecture, videoProgress) {
//     const videoId = userLecture.lecture.VideoId;
//     const videoDuration = await getCountVideo(videoId);

//     const totalVideoSeconds = durationToSeconds(videoDuration);
//     const requiredSeconds = totalVideoSeconds / 2;

//     if (videoProgress >= requiredSeconds) {
//         return true;
//     } else {
//         return false;
//     }
// }

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    let time = "";
    if (hours >= 12) {
        time = "PM";
    } else {
        time = "AM";
    }
    if (hours > 12) {
        hours -= 12;
    }

    const formattedDate = `${hours}:${minutes} ${time} - ${month}/${day}/${year}`;

    return formattedDate;
}


module.exports = {
    getCountVideo, durationToSeconds, getTotalVideo, formatTime
};
