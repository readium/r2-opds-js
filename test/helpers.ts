import { ExecutionContext } from "ava";
import * as util from "util";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inspect(obj: any) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    // breakLength: 100  maxArrayLength: undefined
    console.log(util.inspect(obj, { showHidden: false, depth: 1000, colors: true, customInspect: true }));
}

export function log(str: string) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    console.log(str);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logJSON(json: any) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    const jsonStr = global.JSON.stringify(json, null, "");
    log(jsonStr);
}

// ==========================

export function checkDate(t: ExecutionContext, d1: Date, d2: Date) {
    t.true(d1.getTime() === d2.getTime());
    t.true(d1.toString() === d2.toString());
    t.true(+d1 === +d2);
    t.true(d1 >= d2 && d1 <= d2);
}

export function checkNumber(t: ExecutionContext, d1: number, d2: number) {
    t.is(d1, d2);
    t.true(d1 === d2);
    // t.true(d1.toString() === d2.toString());
}

// import { FunctionType } from "@r2-utils-js/_utils/xml-js-mapper";
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export function checkType(t: ExecutionContext, obj: any, clazz: Function) {
    t.is(typeof obj, "object"); // obj.constructor.name
    t.true(obj instanceof clazz);
    t.is(obj.constructor, clazz);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkType_String(t: ExecutionContext, obj: any) {
    t.is(typeof obj, "string");
    t.false(obj instanceof String);
    t.false(obj instanceof Object);
    t.is(obj.constructor, String);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkType_Number(t: ExecutionContext, obj: any) {
    t.is(typeof obj, "number");
    t.false(obj instanceof String);
    t.false(obj instanceof Object);
    t.false(obj instanceof Number);
    t.is(obj.constructor, Number);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkType_Array(t: ExecutionContext, obj: any) {
    t.is(typeof obj, "object");
    t.true(obj instanceof Array);
    t.true(obj instanceof Object);
    t.is(obj.constructor, Array);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkType_Object(t: ExecutionContext, obj: any) {
    checkType(t, obj, Object);
}
