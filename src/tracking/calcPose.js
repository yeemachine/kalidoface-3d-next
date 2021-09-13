import Vector from '../utils/vector.js';
import { clamp, remap } from '../utils/helpers.js';
import { calcArms } from './calcArms.js';
import { calcHips } from './calcHips.js';
import { calcLegs } from './calcLegs.js';

import { RestingDefault } from './utils/RestingDefault.js';

export let calcPose = (lm, lm2d) => {
    let Arms = calcArms(lm);
    let Hips = calcHips(lm, lm2d);
    let Legs = calcLegs(lm);

    //DETECT OFFSCREEN AND RESET VALUES TO DEFAULTS
    let rightHandOffscreen = lm[15].y > -0.1 || lm[15].visibility < 0.23 || 0.995 < lm2d[15].y;
    let leftHandOffscreen = lm[16].y > -0.1 || lm[16].visibility < 0.23 || 0.995 < lm2d[16].y;

    let leftFootOffscreen = lm[23].visibility < 0.63 || Hips.Hips.position.z > -0.4;
    let rightFootOffscreen = lm[24].visibility < 0.63 || Hips.Hips.position.z > -0.4;

    Arms.UpperArm.l = Arms.UpperArm.l.multiply(leftHandOffscreen ? 0 : 1);
    Arms.UpperArm.l.z = leftHandOffscreen ? RestingDefault.Pose.LeftUpperArm.z : Arms.UpperArm.l.z; //.55 is Hands down Default position
    Arms.UpperArm.r = Arms.UpperArm.r.multiply(rightHandOffscreen ? 0 : 1);
    Arms.UpperArm.r.z = rightHandOffscreen ? RestingDefault.Pose.RightUpperArm.z : Arms.UpperArm.r.z;

    Arms.LowerArm.l = Arms.LowerArm.l.multiply(leftHandOffscreen ? 0 : 1);
    Arms.LowerArm.r = Arms.LowerArm.r.multiply(rightHandOffscreen ? 0 : 1);

    Arms.Hand.l = Arms.Hand.l.multiply(leftHandOffscreen ? 0 : 1);
    Arms.Hand.r = Arms.Hand.r.multiply(rightHandOffscreen ? 0 : 1);

    Legs.UpperLeg.l = Legs.UpperLeg.l.multiply(rightFootOffscreen ? 0 : 1);
    Legs.UpperLeg.r = Legs.UpperLeg.r.multiply(leftFootOffscreen ? 0 : 1);
    Legs.LowerLeg.l = Legs.LowerLeg.l.multiply(rightFootOffscreen ? 0 : 1);
    Legs.LowerLeg.r = Legs.LowerLeg.r.multiply(leftFootOffscreen ? 0 : 1);

    return {
        //All values returned are normalized from -1 to 1
        RightUpperArm: Arms.UpperArm.r,
        RightLowerArm: Arms.LowerArm.r,
        LeftUpperArm: Arms.UpperArm.l,
        LeftLowerArm: Arms.LowerArm.l,
        RightHand: Arms.Hand.r,
        LeftHand: Arms.Hand.l,
        RightUpperLeg: Legs.UpperLeg.r,
        RightLowerLeg: Legs.LowerLeg.r,
        LeftUpperLeg: Legs.UpperLeg.l,
        LeftLowerLeg: Legs.LowerLeg.l,
        Hips: Hips.Hips,
        Spine: Hips.Spine,
    };
};


