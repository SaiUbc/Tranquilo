"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForAudioTracks = void 0;
/**
 * @name checkForAudioTracks
 * @description
 * Check if a MediaStream has audio tracks.
 * @param stream
 * The MediaStream to check
 */
const checkForAudioTracks = (stream) => {
    const tracks = stream.getAudioTracks();
    if (tracks.length === 0) {
        throw new Error("No audio tracks");
    }
    if (tracks.length > 1) {
        throw new Error("Multiple audio tracks");
    }
    const track = tracks[0];
    if (!track) {
        throw new Error("No audio track");
    }
};
exports.checkForAudioTracks = checkForAudioTracks;
