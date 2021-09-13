import Vector from '../utils/vector.js';
import { clamp, remap } from '../utils/helpers.js';

//Design Pattern: Find pure rotation calculations first, then modify rotations based on the 2 arm segments

export const calcArms = lm => {
    //Pure Rotation Calculations
    let UpperArm = {
        r: Vector.findRotation(lm[11], lm[13]),
        l: Vector.findRotation(lm[12], lm[14]),
    };
    UpperArm.r.y = Vector.angleBetween3DCoords(lm[12], lm[11], lm[13]);
    UpperArm.l.y = Vector.angleBetween3DCoords(lm[11], lm[12], lm[14]);

    let LowerArm = {
        r: Vector.findRotation(lm[13], lm[15]),
        l: Vector.findRotation(lm[14], lm[16]),
    };
    LowerArm.r.y = Vector.angleBetween3DCoords(lm[11], lm[13], lm[15]);
    LowerArm.l.y = Vector.angleBetween3DCoords(lm[12], lm[14], lm[16]);
    LowerArm.r.z = clamp(LowerArm.r.z, -2.14, 0);
    LowerArm.l.z = clamp(LowerArm.l.z, -2.14, 0);
    let Hand = {
        r: Vector.findRotation(
            Vector.fromArray(lm[15]),
            Vector.lerp(Vector.fromArray(lm[17]), Vector.fromArray(lm[19]), 0.5),
        ),
        l: Vector.findRotation(
            Vector.fromArray(lm[16]),
            Vector.lerp(Vector.fromArray(lm[18]), Vector.fromArray(lm[20]), 0.5),
        ),
    };

    //Modify Rotations slightly for more natural movement
    let rightArmRig = rigArm(UpperArm.r, LowerArm.r, Hand.r, "Right");
    let leftArmRig = rigArm(UpperArm.l, LowerArm.l, Hand.l, "Left");

    return {
        //Scaled
        UpperArm: {
            r: rightArmRig.UpperArm,
            l: leftArmRig.UpperArm,
        },
        LowerArm: {
            r: rightArmRig.LowerArm,
            l: leftArmRig.LowerArm,
        },
        Hand: {
            r: rightArmRig.Hand,
            l: leftArmRig.Hand,
        },
        //Unscaled
        Unscaled: {
            UpperArm: UpperArm,
            LowerArm: LowerArm,
            Hand:Hand
        },
    };
};

export const rigArm = (UpperArm, LowerArm, Hand, side = "right") => {
    //Invert modifier based on left vs right side
    const invert = side === 'Right' ? 1 : -1;

    UpperArm.z *= -2.3 * invert;
    //Modify UpperArm rotationY  by LowerArm X and Z rotations
    UpperArm.y *= Math.PI * invert;
    UpperArm.y -= Math.max(LowerArm.x);
    UpperArm.y -= -invert * Math.max(LowerArm.z, 0);
    UpperArm.x -= 0.3 * invert;

    LowerArm.z *= -2.14 * invert;
    LowerArm.y *= 2.14 * invert;
    LowerArm.x *= 2.14 * invert;

    //Clamp values to human limits
    UpperArm.x = clamp(UpperArm.x, -0.5, Math.PI);
    LowerArm.x = clamp(LowerArm.x, -0.3, 0.3);
  
    Hand.y = clamp(Hand.z * 2,-.6,.6) //side to side
    Hand.z = Hand.z * -2.3 * invert ; //up down

    return {
        //Returns Values in Radians for direct 3D usage
        UpperArm: UpperArm,
        LowerArm: LowerArm,
        Hand: Hand,
    };
};
