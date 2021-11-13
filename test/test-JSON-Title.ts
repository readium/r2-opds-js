import test from "ava";

import { JsonMap, TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";
import { Metadata } from "@r2-shared-js/models/metadata";
import { IStringMap } from "@r2-shared-js/models/metadata-multilang";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { checkType_Object, checkType_String, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const titleStr1 = "str1";
const titleStr2 = "str2";
const titleLang1 = "lang1";
const titleLang2 = "lang2";
const titleLangStr1: IStringMap = {};
titleLangStr1[titleLang1] = titleStr1;
titleLangStr1[titleLang2] = titleStr2;
const titleLangStr2: IStringMap = {};
titleLangStr2[titleLang1] = titleStr2;
titleLangStr2[titleLang2] = titleStr1;

// ==========================

test("JSON SERIALIZE: Metadata.Title => string", (t) => {
    const md = new Metadata();
    md.Title = titleStr1;
    inspect(md);

    const json = TaJsonSerialize(md);
    logJSON(json);

    checkType_String(t, json.title);
    t.is(json.title, titleStr1);
});

test("JSON SERIALIZE: Metadata.Title => string-lang", (t) => {
    const md = new Metadata();
    md.Title = titleLangStr1;
    inspect(md);

    const json = TaJsonSerialize(md);
    logJSON(json);

    checkType_Object(t, json.title);

    const title = json.title as JsonMap;
    checkType_String(t, title[titleLang1]);
    t.is(title[titleLang1], titleStr1);

    checkType_String(t, title[titleLang2]);
    t.is(title[titleLang2], titleStr2);
});

test("JSON DESERIALIZE: Metadata.Title => string", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.title = titleStr1;
    logJSON(json);

    const md: Metadata = TaJsonDeserialize<Metadata>(json, Metadata);
    inspect(md);

    checkType_String(t, md.Title);
    t.is(md.Title, titleStr1);
});

test("JSON DESERIALIZE: Metadata.Title => string-lang", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.title = titleLangStr1;
    logJSON(json);

    const md: Metadata = TaJsonDeserialize<Metadata>(json, Metadata);
    inspect(md);

    checkType_Object(t, md.Title);

    checkType_String(t, (md.Title as IStringMap)[titleLang1]);
    t.is((md.Title as IStringMap)[titleLang1], titleStr1);

    checkType_String(t, (md.Title as IStringMap)[titleLang2]);
    t.is((md.Title as IStringMap)[titleLang2], titleStr2);
});
