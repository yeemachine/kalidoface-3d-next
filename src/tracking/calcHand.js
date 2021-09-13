import Vector from '../utils/vector.js';
import { clamp, remap } from '../utils/helpers.js';

export let calcHand = (lm, poselm, side = 'Right') => {
    let palm = [
        new Vector(lm[0]),
        new Vector(lm[side === 'Right' ? 17 : 5]),
        new Vector(lm[side === 'Right' ? 5 : 17]),
    ];
    let handRotation = Vector.rollPitchYaw(palm[0], palm[1], palm[2]);
    handRotation.y = handRotation.z;
    handRotation.y -= side === 'Left' ? 0.3 : 0.5;
    handRotation.z = Vector.findRotation(
        Vector.fromArray(poselm[side === 'right' ? 15 : 16]),
        Vector.lerp(
            Vector.fromArray(poselm[side === 'right' ? 17 : 18]),
            Vector.fromArray(poselm[side === 'right' ? 19 : 20]),
            0.5,
        ),
    ).z;

    let hand = {};
    hand[side + 'Wrist'] = { x: handRotation.x, y: handRotation.y, z: handRotation.z };
    hand[side + 'RingProximal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[0], lm[13], lm[14]) };
    hand[side + 'RingIntermediate'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[13], lm[14], lm[15]) };
    hand[side + 'RingDistal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[14], lm[15], lm[16]) };
    hand[side + 'IndexProximal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[0], lm[5], lm[6]) };
    hand[side + 'IndexIntermediate'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[5], lm[6], lm[7]) };
    hand[side + 'IndexDistal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[6], lm[7], lm[8]) };
    hand[side + 'MiddleProximal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[0], lm[9], lm[10]) };
    hand[side + 'MiddleIntermediate'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[9], lm[10], lm[11]) };
    hand[side + 'MiddleDistal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[10], lm[11], lm[12]) };
    hand[side + 'ThumbProximal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[0], lm[1], lm[2]) };
    hand[side + 'ThumbIntermediate'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[1], lm[2], lm[3]) };
    hand[side + 'ThumbDistal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[2], lm[3], lm[4]) };
    hand[side + 'LittleProximal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[0], lm[17], lm[18]) };
    hand[side + 'LittleIntermediate'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[17], lm[18], lm[19]) };
    hand[side + 'LittleDistal'] = { x: 0, y: 0, z: Vector.angleBetween3DCoords(lm[18], lm[19], lm[20]) };

    hand = rigFingers(hand, side);

    return hand;
};

export const rigFingers = (hand, side = 'Right') => {
    const invert = side === 'Right' ? 1 : -1;
    let digits = ['Ring', 'Index', 'Little', 'Thumb', 'Middle'];
    let segments = ['Proximal', 'Intermediate', 'Distal'];

    hand[side + 'Wrist'].x = clamp(hand[side + 'Wrist'].x * 2 * invert, -0.3, 0.3); // twist
    hand[side + 'Wrist'].y = clamp(hand[side + 'Wrist'].y * 2, -0.6, 0.6);
    hand[side + 'Wrist'].z = hand[side + 'Wrist'].z * -2.3 * invert; //up down

    digits.forEach(e => {
        segments.forEach(j => {
            let trackedFinger = hand[side + e + j];

            if (e === 'Thumb') {
                //dampen thumb rotation depending on segment
                let dampener = {
                    x: j === 'Proximal' ? 2.2 : j === 'Intermediate' ? 0 : 0,
                    y: j === 'Proximal' ? 2.2 : j === 'Intermediate' ? 0.7 : 1,
                    z: j === 'Proximal' ? 0.5 : j === 'Intermediate' ? 0.5 : 0.5,
                };
                let startPos = {
                    x: j === 'Proximal' ? 1.2 : j === 'Distal' ? -0.2 : -0.2,
                    y: j === 'Proximal' ? 1.1 * invert : j === 'Distal' ? 0.1 * invert : 0.1 * invert,
                    z: j === 'Proximal' ? 0.2 * invert : j === 'Distal' ? 0.2 * invert : 0.2 * invert,
                };
                let newThumb = { x: 0, y: 0, z: 0 };
                if (j === 'Proximal') {
                    newThumb.z = clamp(
                        startPos.z + trackedFinger.z * -Math.PI * dampener.z * invert,
                        side === 'Right' ? -0.6 : -0.1,
                        side === 'Right' ? 0.1 : 0.6,
                    );
                    newThumb.x = clamp(startPos.x + trackedFinger.z * -Math.PI * dampener.x, -0.6, 0.1);
                    newThumb.y = clamp(
                        startPos.y + trackedFinger.z * -Math.PI * dampener.y * invert,
                        side === 'Right' ? -1.6 : -0.1,
                        side === 'Right' ? 0.1 : 1.6,
                    );
                } else {
                    newThumb.z = clamp(startPos.z + trackedFinger.z * -Math.PI * dampener.z * invert, -2, 2);
                    newThumb.x = clamp(startPos.x + trackedFinger.z * -Math.PI * dampener.x, -2, 2);
                    newThumb.y = clamp(startPos.y + trackedFinger.z * -Math.PI * dampener.y * invert, -2, 2);
                }
                trackedFinger.x = newThumb.x;
                trackedFinger.y = newThumb.y;
                trackedFinger.z = newThumb.z;
            } else {
                //will document human limits later
                trackedFinger.z = clamp(
                    trackedFinger.z * -Math.PI * invert,
                    side === 'Right' ? -2.3 : 0,
                    side === 'Right' ? 0 : 2.3,
                );
            }
        });
    });
    return hand;
};
