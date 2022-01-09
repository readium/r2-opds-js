import test from "ava";
import * as xmldom from "@xmldom/xmldom";

import { TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";
import { XML } from "@r2-utils-js/_utils/xml-js-mapper";

import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { OPDS } from "../src/opds/opds1/opds";
import { OPDSMetadata } from "../src/opds/opds2/opds2-metadata";
import { checkNumber, checkType_Number, inspect, logJSON } from "./helpers";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

// ==========================

const num = 12345.6789;
const numSTR = "12345.6789";

// ==========================

test("JSON SERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    const md = new OPDSMetadata();
    md.ItemsPerPage = num;
    inspect(md);

    const json = TaJsonSerialize(md);
    logJSON(json);

    checkType_Number(t, json.itemsPerPage);
    t.is(json.itemsPerPage, num);
});

// ==========================

test("JSON DESERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = {};
    json.itemsPerPage = num;
    logJSON(json);

    const md: OPDSMetadata = TaJsonDeserialize<OPDSMetadata>(json, OPDSMetadata);
    inspect(md);
    t.true(typeof md.AdditionalJSON === "undefined");

    checkType_Number(t, md.ItemsPerPage);
    checkNumber(t, md.ItemsPerPage, num);
});

// ==========================

// SERIALIZATION not implemented in xml-js-mapper!
// test("XML SERIALIZE: OPDS opensearch:itemsPerPage => Number", (t) => {

//     const e = new OPDS();
//     e.OpensearchItemsPerPage = num;
//     inspect(e);

//     const xml = XML.serialize(e);
//     logXML(xml);

//     const xmlProp = xml.select("opensearch:itemsPerPage/text()");
//     checkType_String(t, xmlProp);
//     t.is(xmlProp, numSTR);
// });

// ==========================

test("XML DESERIALIZE: OPDS opensearch:itemsPerPage => Number", (t) => {
    const xmlStr = `<opds xmlns="http://opds-spec.org/2010/catalog" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">
            <opensearch:itemsPerPage>${numSTR}</opensearch:itemsPerPage>
        </opds>`;
    console.log(xmlStr);

    const xml = new xmldom.DOMParser().parseFromString(xmlStr);
    const opds: OPDS = XML.deserialize<OPDS>(xml, OPDS);
    inspect(opds);

    checkType_Number(t, opds.OpensearchItemsPerPage);
    checkNumber(t, opds.OpensearchItemsPerPage, num);
});
