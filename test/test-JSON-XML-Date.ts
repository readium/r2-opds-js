import test from "ava";
import * as xmldom from "xmldom";

import { TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";
import { Metadata } from "@r2-shared-js/models/metadata";
import { XML } from "@r2-utils-js/_utils/xml-js-mapper";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { Entry } from "../src/opds/opds1/opds-entry";
import { checkDate, checkType, checkType_String, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const date = new Date();
// 31st December (0-based index) 2000
date.setUTCFullYear(2000, 11, 31);
// 23 hours, 59 minutes, 59 seconds, 999 milliseconds
date.setUTCHours(23, 59, 59, 999);

const dateSTR = "2000-12-31T23:59:59.999Z";

// ==========================

test("JSON SERIALIZE: Metadata.Modified => Date", (t) => {
    const md = new Metadata();
    md.Modified = date;
    inspect(md);

    const json = TaJsonSerialize(md);
    logJSON(json);

    checkType_String(t, json.modified);
    t.is(json.modified, dateSTR);
});

// ==========================

test("JSON DESERIALIZE: Metadata.Modified => Date", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.modified = dateSTR;
    logJSON(json);

    const md: Metadata = TaJsonDeserialize<Metadata>(json, Metadata);
    inspect(md);

    checkType(t, md.Modified, Date);
    checkDate(t, md.Modified, date);
});

// ==========================

// SERIALIZATION not implemented in xml-js-mapper!
// test("XML SERIALIZE: OPDS Entry.Updated => Date", (t) => {

//     const e = new Entry();
//     e.Updated = date;
//     inspect(e);

//     const xml = XML.serialize(e);
//     logXML(xml);

//     const xmlProp = xml.select("atom:updated/text()");
//     checkType_String(t, xmlProp);
//     t.is(xmlProp, dateSTR);
// });

// ==========================

test("XML DESERIALIZE: OPDS Entry.Updated => Date", (t) => {
    const xmlStr = `<entry xmlns="http://opds-spec.org/2010/catalog" xmlns:atom="http://www.w3.org/2005/Atom">
            <atom:updated>${dateSTR}</atom:updated>
        </entry>`;
    console.log(xmlStr);

    const xml = new xmldom.DOMParser().parseFromString(xmlStr);
    const md: Entry = XML.deserialize<Entry>(xml, Entry);
    inspect(md);

    checkType(t, md.Updated, Date);
    checkDate(t, md.Updated, date);
});
