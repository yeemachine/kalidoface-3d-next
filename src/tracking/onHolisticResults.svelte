<script context="module">
import * as poseDetection from '@tensorflow-models/pose-detection';
import { writable,get } from 'svelte/store';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {drawResults} from './drawing.svelte'
import {SpringManager} from './smooth.svelte';
import {options} from './Holistic.svelte'
import {calcPose} from './calcPose.svelte'
import {calcHand} from './calcHand.js'
import {videoEl} from './webcam.svelte'
import {threshold} from '../utils/helpers.js'
import {cameraConfig} from '../scene/CameraControls.svelte'
import {p2pConnection} from '../connections/Peer.svelte'
import {profiles} from "../scene/profiles.svelte"
import {facelm} from "./onFacemeshResults.svelte"
import {sendTrackingData} from "./sendTrackingToPeer.svelte"
import {RestingDefault} from './utils/RestingDefault.js'

export const poseLandmarks = writable(null);
export const resolveJump = (oldVal, newVal, maxDiff) => {
    if (Math.abs(oldVal - newVal) > maxDiff) {
        return newVal;
    } else return null;
};
export let newTrackingProfile = JSON.parse(JSON.stringify(RestingDefault));

export let initialFrames = 0;

export function onHolisticResults(results) {
    // console.log(results)
    if (!get(options).holistic.running) {
        get(options).holistic.running = true;
        options.set(get(options));
    }
    drawResults(results, 'holistic');
    if (initialFrames < 20) {
        initialFrames += 1;
        return;
    }
    // let flipHorizontal = get(cameraConfig).firstPerson && get(cameraConfig).freeCamera;
    const connection = get(p2pConnection);
    // const flipHorizontal = false;
    // console.log(results)
    const facelm = results.faceLandmarks || null;
    let poselm = results.poseLandmarks || null;
    let poselm3D = results.X || null;

    const handlm = {
        Right: results.leftHandLandmarks || null,
        Left: results.rightHandLandmarks || null,
    };

    if (facelm && !get(options).face.enable) {
        // setFace(faceMap.update(facelm,{type:'holistic'}));
        newTrackingProfile.Face = faceMap.update(facelm, { type: 'holistic' });
        // newTrackingProfile.Face.head.y *= flipHorizontal ? -1 : 1;
        sendTrackingData();

        SpringManager.user.face.set({
            eye: newTrackingProfile.Face.eye,
            mouth: newTrackingProfile.Face.mouth,
            head: newTrackingProfile.Face.head,
            brow: newTrackingProfile.Face.brow,
            pupil: newTrackingProfile.Face.pupil,
            width: newTrackingProfile.Face.head.width,
        });

        const oldPos = get(SpringManager.user.head);

        SpringManager.user.head.set({
            x: newTrackingProfile.Face.head.x,
            y: newTrackingProfile.Face.head.y,
            z: newTrackingProfile.Face.head.z,
            width: threshold(oldPos.width, newTrackingProfile.Face.head.width, 0.01),
            height: threshold(oldPos.height, newTrackingProfile.Face.head.height, 0.01),
            position: {
                x: threshold(oldPos.position.x, newTrackingProfile.Face.head.position.x, 0.01),
                y: threshold(oldPos.position.y, newTrackingProfile.Face.head.position.y, 0.01),
                z: newTrackingProfile.Face.head.position.z,
            },
        });

        if (connection) {
            connection.send({
                headX: newTrackingProfile.Face.head.x,
                headY: newTrackingProfile.Face.head.y,
                headZ: newTrackingProfile.Face.head.z,
                eyeL: newTrackingProfile.Face.eye.l,
                eyeR: newTrackingProfile.Face.eye.r,
                brow: newTrackingProfile.Face.brow,
                pupilX: newTrackingProfile.Face.pupil.x,
                pupilY: newTrackingProfile.Face.pupil.y,
                mouthX: newTrackingProfile.Face.mouth.x,
                mouthY: newTrackingProfile.Face.mouth.y,
                mouthA: newTrackingProfile.Face.mouth.shape.A,
                mouthE: newTrackingProfile.Face.mouth.shape.E,
                mouthI: newTrackingProfile.Face.mouth.shape.I,
                mouthO: newTrackingProfile.Face.mouth.shape.O,
                mouthU: newTrackingProfile.Face.mouth.shape.U,
                detected: get(profiles).user.detected,
                type: 'face-tracking',
            });
        }
    }

    let sides = ['Right', 'Left'];
    sides.forEach(e => {
        // let eFlipped = e === 'Right' ? 'Left' : 'Right';
        if (handlm[e] !== null) {
            newTrackingProfile[e + 'Hand'] = calcHand(handlm[e], poselm3D, e);
            SpringManager.user.hands[e].set(newTrackingProfile[e + 'Hand']);
        }
    });

    if (poselm3D) {
        poseLandmarks.set(poselm3D);
        // let poselm3DFlipped = [];
        // let poselmFlipped = [];
        // poselm3D.forEach((e, i) => {
        //     let newIndex = i === 0 ? 0 : i % 2 == 0 ? i - 1 : i + 1;
        //     poselm3DFlipped[newIndex] = e;
        //     poselmFlipped[newIndex] = e;
        // });

        newTrackingProfile.Pose = calcPose(
            poselm3D,
            poselm,
        );

        let unJumpHips = resolveJump(
            get(SpringManager.user.pose).Hips.rotation.y,
            newTrackingProfile.Pose.Hips.rotation.y,
            5,
        );
        if(unJumpHips){
          get(SpringManager.user.pose).Hips.rotation.y = unJumpHips;
        }

        SpringManager.user.pose.set({
            RightUpperArm: newTrackingProfile.Pose.RightUpperArm,
            LeftUpperArm: newTrackingProfile.Pose.LeftUpperArm,
            RightLowerArm: newTrackingProfile.Pose.RightLowerArm,
            LeftLowerArm: newTrackingProfile.Pose.LeftLowerArm,
            RightUpperLeg: newTrackingProfile.Pose.RightUpperLeg,
            LeftUpperLeg: newTrackingProfile.Pose.LeftUpperLeg,
            RightLowerLeg: newTrackingProfile.Pose.RightLowerLeg,
            LeftLowerLeg: newTrackingProfile.Pose.LeftLowerLeg,
            RightHand: {
                z: newTrackingProfile.Pose.RightHand.z,
                y: newTrackingProfile.RightHand.RightWrist.z,
                x: newTrackingProfile.RightHand.RightWrist.x,
            },
            LeftHand: {
                z: newTrackingProfile.Pose.LeftHand.z,
                y: newTrackingProfile.LeftHand.LeftWrist.z,
                x: newTrackingProfile.LeftHand.LeftWrist.x,
            },
            Hips: {
                position: newTrackingProfile.Pose.Hips.worldPosition,
                rotation: newTrackingProfile.Pose.Hips.rotation,
            },
            Spine: newTrackingProfile.Pose.Spine,
        });
    }
}

export function onPoseResults(results) {
    // console.log(results)
    if (!get(options).holistic.running) {
        get(options).holistic.running = true;
        options.set(get(options));
    }
    if (initialFrames < 20) {
        initialFrames += 1;
        return;
    }
    // let flipHorizontal = get(cameraConfig).firstPerson && get(cameraConfig).freeCamera;
    const connection = get(p2pConnection);
    let poselm = results.keypoints || null;

    if (poselm) {
        let imageSize = { width: videoEl.width, height: videoEl.height };
        //normalize and format 2D landmark values to be like Mediapipe's
        poselm.forEach((e, i) => {
            e.x /= imageSize.width;
            e.y /= imageSize.height;
            e.z = 0;
            e.visibility = e.score;
        });
    }
    drawResults(results, 'pose', facelm);

    let poselm3D = results.keypoints3D || null;

    if (poselm3D) {
        poseLandmarks.set(poselm3D);

        let poselm3DFlipped = [];
        let poselmFlipped = [];
        poselm3D.forEach((e, i) => {
            e.visibility = e.score;
            // let newIndex = i === 0 ? 0 : i % 2 == 0 ? i - 1 : i + 1;
            // poselm3DFlipped[newIndex] = e;
            // poselmFlipped[newIndex] = e;
        });

         newTrackingProfile.Pose = calcPose(
            poselm3D,
            poselm,
        );

        let unJumpHips = resolveJump(
            get(SpringManager.user.pose).Hips.rotation.y,
            newTrackingProfile.Pose.Hips.rotation.y,
            5,
        );
        if(unJumpHips){
          get(SpringManager.user.pose).Hips.rotation.y = unJumpHips;
        }

        SpringManager.user.pose.set({
            RightUpperArm: newTrackingProfile.Pose.RightUpperArm,
            LeftUpperArm: newTrackingProfile.Pose.LeftUpperArm,
            RightLowerArm: newTrackingProfile.Pose.RightLowerArm,
            LeftLowerArm: newTrackingProfile.Pose.LeftLowerArm,
            RightUpperLeg: newTrackingProfile.Pose.RightUpperLeg,
            LeftUpperLeg: newTrackingProfile.Pose.LeftUpperLeg,
            RightLowerLeg: newTrackingProfile.Pose.RightLowerLeg,
            LeftLowerLeg: newTrackingProfile.Pose.LeftLowerLeg,
            RightHand: {
                z: newTrackingProfile.Pose.RightHand.z,
                y: newTrackingProfile.RightHand.RightWrist.z,
                x: newTrackingProfile.RightHand.RightWrist.x,
            },
            LeftHand: {
                z: newTrackingProfile.Pose.LeftHand.z,
                y: newTrackingProfile.LeftHand.LeftWrist.z,
                x: newTrackingProfile.LeftHand.LeftWrist.x,
            },
            Hips: {
                position: newTrackingProfile.Pose.Hips.worldPosition,
                rotation: newTrackingProfile.Pose.Hips.rotation,
            },
            Spine: newTrackingProfile.Pose.Spine,
        });

        if (connection && !get(options).face.enable) {
            connection.send({
                headX: newTrackingProfile.Face.head.x,
                headY: newTrackingProfile.Face.head.y,
                headZ: newTrackingProfile.Face.head.z,
                eyeL: newTrackingProfile.Face.eye.l,
                eyeR: newTrackingProfile.Face.eye.r,
                brow: newTrackingProfile.Face.brow,
                pupilX: newTrackingProfile.Face.pupil.x,
                pupilY: newTrackingProfile.Face.pupil.y,
                mouthX: newTrackingProfile.Face.mouth.x,
                mouthY: newTrackingProfile.Face.mouth.y,
                mouthA: newTrackingProfile.Face.mouth.shape.A,
                mouthE: newTrackingProfile.Face.mouth.shape.E,
                mouthI: newTrackingProfile.Face.mouth.shape.I,
                mouthO: newTrackingProfile.Face.mouth.shape.O,
                mouthU: newTrackingProfile.Face.mouth.shape.U,
                detected: get(profiles).user.detected,
                type: 'face-tracking',
            });
        }
    }
}
</script>