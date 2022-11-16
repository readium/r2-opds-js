import test, { ExecutionContext } from "ava";
import * as debug_ from "debug";
import * as http from "http";
import * as https from "https";
import * as jsonDiff from "json-diff";
import { URL } from "url";
import * as xmldom from "@xmldom/xmldom";

import { TaJsonDeserialize, TaJsonSerialize } from "@r2-lcp-js/serializable";
import { Publication } from "@r2-shared-js/models/publication";
import { sortObject, traverseJsonObjects } from "@r2-utils-js/_utils/JsonUtils";
import { XML } from "@r2-utils-js/_utils/xml-js-mapper";

import {
    convertOpds1ToOpds2,
    convertOpds1ToOpds2_EntryToPublication,
    unescapeHtmlEntities,
} from "../src/opds/converter";
import { initGlobalConverters_GENERIC, initGlobalConverters_OPDS } from "../src/opds/init-globals";
import { OPDS } from "../src/opds/opds1/opds";
import { Entry } from "../src/opds/opds1/opds-entry";
import { OPDSFeed } from "../src/opds/opds2/opds2";
import { OPDSAuthenticationDoc } from "../src/opds/opds2/opds2-authentication-doc";
import { OPDSPublication } from "../src/opds/opds2/opds2-publication";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

const debug = debug_("r2:opds#test");

// Note to run single test on the command line interface:
// npm run test -- --match="XXX"

// ==========================
const plainTextWithEscapedHtmlChars = `

This &amp; is &#039;a&quot;        test
\tof &lt; summary text &gt;

`;

const xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace = `
<xhtm:div>
    Hello &amp;\t<xhtm:b>  world &lt; &quot;_&#039; &gt;  </xhtm:b>!
</xhtm:div>
`;

const xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace = `
<div xmlns="http://www.w3.org/1999/xhtml">
    Hi &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!
</div>
`;

const xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace = `
<div>
    Oops &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!
</div>
`;

const escapedHtmlWithSomeDoubleEscapedHtmlChars = `
&lt;div&gt;
    Hello &amp;amp;\t&lt;b&gt;  world &amp;lt; &amp;quot;_&amp;#039; &amp;gt;  &lt;/b&gt;!
&lt;/div&gt;
`;

test("OPDS1-2 description: summary + content(XHTML NAMESPACE PREFIX)", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc); // , "application/xml"
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    t.is(
        // ALREADY UNESCAPED BY THE XPATH text() selector
        // e.g. @XmlXPathSelector("atom:content/text()")
        opds1Entry.Summary,
        unescapeHtmlEntities(plainTextWithEscapedHtmlChars),
    );

    // CHILD(REN) XML NODES ALREADY SERIALIZED (INC. NAMESPACES) BY THE XPATH text() selector
    // e.g. @XmlXPathSelector("atom:content/text()")
    // ... BUT ONLY "ESSENTIAL" ESCAPED (&amp; and &lt;)
    const toMatch = xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace
        // .replace(/&lt;/g, "<") // &#60;
        // .replace(/&gt;/g, ">") // &#62;
        // eslint-disable-next-line prettier/prettier
        .replace(/&quot;/g, "\"") // &#34;
        .replace(/&#039;/g, "'"); // &apos;
    // .replace(/&apos;/g, "'") // xhtml, not html
    // .replace(/&amp;/g, "&") // &#38;
    t.is(opds1Entry.Content.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Metadata.Description.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
});

test("OPDS1-2 description: summary + content(XHTML NAMESPACE NO PREFIX)", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc); // , "application/xml"
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    t.is(
        // ALREADY UNESCAPED BY THE XPATH text() selector
        // e.g. @XmlXPathSelector("atom:content/text()")
        opds1Entry.Summary,
        unescapeHtmlEntities(plainTextWithEscapedHtmlChars),
    );

    // CHILD(REN) XML NODES ALREADY SERIALIZED (INC. NAMESPACES) BY THE XPATH text() selector
    // e.g. @XmlXPathSelector("atom:content/text()")
    // ... BUT ONLY "ESSENTIAL" ESCAPED (&amp; and &lt;)
    const toMatch = xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace
        // .replace(/&lt;/g, "<") // &#60;
        // .replace(/&gt;/g, ">") // &#62;
        // eslint-disable-next-line prettier/prettier
        .replace(/&quot;/g, "\"") // &#34;
        .replace(/&#039;/g, "'"); // &apos;
    // .replace(/&apos;/g, "'") // xhtml, not html
    // .replace(/&amp;/g, "&") // &#38;
    t.is(opds1Entry.Content, toMatch);
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
});

test("OPDS1-2 description: summary + content(XML DEFAULT ATOM NAMESPACE)", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc); // , "application/xml"
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    t.is(
        // ALREADY UNESCAPED BY THE XPATH text() selector
        // e.g. @XmlXPathSelector("atom:content/text()")
        opds1Entry.Summary,
        unescapeHtmlEntities(plainTextWithEscapedHtmlChars),
    );

    // CHILD(REN) XML NODES ALREADY SERIALIZED (INC. NAMESPACES) BY THE XPATH text() selector
    // e.g. @XmlXPathSelector("atom:content/text()")
    // ... BUT ONLY "ESSENTIAL" ESCAPED (&amp; and &lt;)
    const toMatch = xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace
        // .replace(/&lt;/g, "<") // &#60;
        // .replace(/&gt;/g, ">") // &#62;
        // eslint-disable-next-line prettier/prettier
        .replace(/&quot;/g, "\"") // &#34;
        .replace(/&#039;/g, "'"); // &apos;
    // .replace(/&apos;/g, "'") // xhtml, not html
    // .replace(/&amp;/g, "&") // &#38;
    t.is(opds1Entry.Content.replace(/ xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/, ""), toMatch);
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Metadata.Description.replace(/ xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
});

test("OPDS1-2 description: summary", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc); // , "application/xml"
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    const toMatch = unescapeHtmlEntities(plainTextWithEscapedHtmlChars);
    t.is(
        // ALREADY UNESCAPED BY THE XPATH text() selector
        // e.g. @XmlXPathSelector("atom:content/text()")
        opds1Entry.Summary,
        toMatch,
    );
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
});
test("OPDS1-2 description: summary + content(HTML)", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="html">${escapedHtmlWithSomeDoubleEscapedHtmlChars}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc); // , "application/xml"
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    t.is(
        // ALREADY UNESCAPED BY THE XPATH text() selector
        // e.g. @XmlXPathSelector("atom:content/text()")
        opds1Entry.Summary,
        unescapeHtmlEntities(plainTextWithEscapedHtmlChars),
    );

    // ALREADY UNESCAPED BY THE XPATH text() selector
    // e.g. @XmlXPathSelector("atom:content/text()")
    const toMatch = unescapeHtmlEntities(escapedHtmlWithSomeDoubleEscapedHtmlChars);
    t.is(opds1Entry.Content, toMatch);
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
});

async function fn() {
    return Promise.resolve("foo");
}
test("dummy async test", async (t) => {
    debug("test ASYNC");
    t.is(await fn(), "foo");
});

const MAX_TESTS = process.env.MAX_TESTS || 10;

const FEEDS_FIRST = process.env.FEEDS_FIRST || false;

interface OPDSFeedAndPubUrls {
    feeds: Set<string>;
    pubs: Set<string>;
    audiowebpubs: Set<string>;
    webpubs: Set<string>;
    authentications: Set<string>;
}

async function delay(okay: boolean): Promise<boolean> {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(okay);
        }, 1000);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function parseCompareJSONs(url: string, json1: any, json2: any): Promise<OPDSFeedAndPubUrls> {
    return new Promise<OPDSFeedAndPubUrls>((resolve, reject) => {
        if (json1 !== json2) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const harmonizeNulls = (obj: any) => {
                if (obj !== null && typeof obj !== "undefined") {
                    if (obj instanceof Array) {
                        for (let i = obj.length - 1; i >= 0; i--) {
                            if (obj[i] === null) {
                                obj.splice(i, 1);
                            }
                        }
                    } else if (typeof obj === "object") {
                        Object.keys(obj).forEach((key) => {
                            if (obj[key] === null) {
                                delete obj[key];
                            }
                        });
                    }
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const harmonizeBitrateAndTrack = (obj: any) => {
                if (typeof obj.bitrate === "string") {
                    obj.bitrate = parseFloat(obj.bitrate);
                }
                if (typeof obj.tracks === "number") {
                    delete obj.tracks;
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const harmonizeDate = (obj: any) => {
                ["updated", "published", "since", "until", "modified"].forEach((term) => {
                    if (obj[term]) {
                        if (typeof obj[term] === "string" || typeof obj[term] === "number") {
                            const date = new Date(obj[term] as string);
                            const time = date.getTime();
                            if (!isNaN(time)) {
                                const tmp = date.toISOString();
                                if (obj[term] !== tmp) {
                                    // console.log("=== " + term + ": " + obj[term] + " => " + tmp);
                                    obj[term] = tmp;
                                }
                            } else {
                                console.log("TIME? " + time);
                            }
                        }
                    }
                });
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const harmonizeName = (obj: any) => {
                // tslint:disable-next-line:max-line-length
                [
                    "subject",
                    "collection",
                    "series",
                    "author",
                    "translator",
                    "editor",
                    "artist",
                    "illustrator",
                    "letterer",
                    "penciler",
                    "colorist",
                    "inker",
                    "narrator",
                    "contributor",
                    "publisher",
                    "imprint",
                ].forEach((term) => {
                    if (obj[term]) {
                        const isArray = obj[term] instanceof Array;
                        const arr = isArray ? obj[term] : [obj[term]];
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < arr.length; i++) {
                            if (typeof arr[i] === "string") {
                                // console.log("string to name object => " + term + ": " + arr[i]);
                                if (isArray) {
                                    obj[term][i] = { name: obj[term][i] };
                                } else {
                                    obj[term] = { name: obj[term] };
                                }
                            } else if (typeof arr[i] === "object") {
                                if (arr[i].name) {
                                    if (typeof arr[i].name === "string") {
                                        // // console.log("name string in object to lang map => " +
                                        // // term + ": " + arr[i].name);
                                        // if (isArray) {
                                        //     obj[term][i].name = { _: obj[term][i].name };
                                        // } else {
                                        //     obj[term].name = { _: obj[term].name };
                                        // }
                                        // do nothing
                                    } else if (typeof arr[i].name === "object") {
                                        // IStringMap
                                        // do nothing
                                    }
                                }
                            }
                        }
                        if (!isArray) {
                            obj[term] = [obj[term]];
                        }
                    }
                });
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const harmonizeArrays = (obj: any) => {
                // tslint:disable-next-line:max-line-length
                ["role", "@context", "rel", "language"].forEach((term) => {
                    if (obj[term]) {
                        const isArray = obj[term] instanceof Array;
                        if (!isArray) {
                            obj[term] = [obj[term]];
                        }
                    }
                });
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // const harmonizeFieldnames = (obj: any) => {
            //     if (obj.belongs_to) {
            //         obj.belongsTo = obj.belongs_to;
            //         obj.belongs_to = undefined;
            //         delete obj.belongs_to;
            //     }
            //     if (obj.sort_as) {
            //         obj.sortAs = obj.sort_as;
            //         obj.sort_as = undefined;
            //         delete obj.sort_as;
            //     }
            //     if (obj.direction) {
            //         obj.readingProgression = obj.direction;
            //         obj.direction = undefined;
            //         delete obj.direction;
            //     }
            //     if (obj.spine) {
            //         obj.readingOrder = obj.spine;
            //         obj.spine = undefined;
            //         delete obj.spine;
            //     }
            // };

            // debug(json2);
            // debug("------------------------");
            // debug("------------------------");

            // console.log("=== HARMONIZING JSON1 ...");
            traverseJsonObjects(json1, (obj) => {
                if (obj !== null) {
                    harmonizeDate(obj);
                }
            });
            traverseJsonObjects(json1, (obj) => {
                if (obj !== null) {
                    harmonizeName(obj);
                }
            });
            traverseJsonObjects(json1, (obj) => {
                if (obj !== null) {
                    harmonizeArrays(obj);
                }
            });
            traverseJsonObjects(json1, (obj) => {
                if (obj !== null) {
                    harmonizeBitrateAndTrack(obj);
                }
            });
            traverseJsonObjects(json1, (obj) => {
                if (obj !== null) {
                    harmonizeNulls(obj);
                }
            });
            // console.log("=== HARMONIZING JSON2 ...");
            traverseJsonObjects(json2, (obj) => {
                if (obj !== null) {
                    harmonizeDate(obj);
                }
            });
            traverseJsonObjects(json2, (obj) => {
                if (obj !== null) {
                    harmonizeName(obj);
                }
            });
            traverseJsonObjects(json2, (obj) => {
                if (obj !== null) {
                    harmonizeArrays(obj);
                }
            });
            traverseJsonObjects(json2, (obj) => {
                if (obj !== null) {
                    harmonizeBitrateAndTrack(obj);
                }
            });
            traverseJsonObjects(json2, (obj) => {
                if (obj !== null) {
                    harmonizeNulls(obj);
                }
            });
            json1 = sortObject(json1);
            json2 = sortObject(json2);

            const str1 = JSON.stringify(json1, null, 2);
            const str2 = JSON.stringify(json2, null, 2);

            if (str1 !== str2) {
                process.stdout.write("###########################\n");
                process.stdout.write("###########################\n");
                process.stdout.write("#### JSON DIFF\n");
                process.stdout.write(jsonDiff.diffString(json1, json2) + "\n");
                // process.stdout.write("###########################\n");
                // process.stdout.write("###########################\n");
                // process.stdout.write(jsonDiff.diffString(opds2Json, json) + "\n");
                process.stdout.write("###########################\n");
                process.stdout.write("###########################\n");
                // console.log(jsonDiff.diff(json, opds2Json));

                reject("JSON DIFF! :(");
                return;
            }
        }

        const thisUrl = new URL(url);
        const thisUrlStr = thisUrl.toString();
        const feedUrls = new Set<string>();
        const pubUrls = new Set<string>();
        const webpubUrls = new Set<string>();
        const audiowebpubUrls = new Set<string>();
        const authenticationUrls = new Set<string>();

        traverseJsonObjects(json1, (obj) => {
            if (obj === null) {
                return; // skip
            }
            const isFeed = obj.type === "application/opds+json";
            const isPub = obj.type === "application/opds-publication+json";
            const isWebPubManifestAudio = obj.type === "application/audiobook+json";
            const isAuth = obj.type === "application/vnd.opds.authentication.v1.0+json";

            // to skip erroneous feed (dirty detection, but will do for these tests)
            const isWebPubManifest =
                obj.type === "application/webpub+json" && obj.href && obj.href.indexOf(".epub") < 0;

            if (obj.href && (isFeed || isPub || isWebPubManifest || isWebPubManifestAudio || isAuth)) {
                const u = new URL(obj.href, thisUrl);
                const uStr = u.toString();
                if (uStr !== thisUrlStr) {
                    if (isFeed) {
                        feedUrls.add(uStr);
                    } else if (isPub) {
                        pubUrls.add(uStr);
                    } else if (isWebPubManifest) {
                        webpubUrls.add(uStr);
                    } else if (isWebPubManifestAudio) {
                        audiowebpubUrls.add(uStr);
                    } else if (isAuth) {
                        authenticationUrls.add(uStr);
                    }

                    // console.log("URL: " + obj.href + " => " + uStr);
                } else {
                    // console.log("URL: " + obj.href + " (skipped)");
                }
            }
        });

        const set: OPDSFeedAndPubUrls = {
            audiowebpubs: audiowebpubUrls,
            authentications: authenticationUrls,
            feeds: feedUrls,
            pubs: pubUrls,
            webpubs: webpubUrls,
        };
        resolve(set);
    });
}

async function opds2Test(url: string): Promise<OPDSFeedAndPubUrls> {
    return new Promise<OPDSFeedAndPubUrls>((resolve, reject) => {
        // debug("------------------------");
        debug(url);
        // debug("------------------------");

        const proto = /^https:\/\//.test(url) ? https : http;
        proto
            .get(url, (response) => {
                let str: string | undefined;
                let buffs: Buffer[] | undefined;

                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    const empty: OPDSFeedAndPubUrls = {
                        audiowebpubs: new Set<string>([]),
                        authentications: new Set<string>([]),
                        feeds: new Set<string>([]),
                        pubs: new Set<string>([]),
                        webpubs: new Set<string>([]),
                    };
                    resolve(empty);
                    return;
                }

                response.on("data", (chunk) => {
                    if (typeof chunk === "string") {
                        if (!str) {
                            str = "";
                        }
                        str += chunk;
                    } else {
                        if (!buffs) {
                            buffs = [];
                        }
                        buffs.push(chunk);
                    }
                });

                response.on("end", async () => {
                    let src: string | undefined;
                    if (str) {
                        src = str;
                    } else if (buffs) {
                        src = Buffer.concat(buffs).toString("utf8");
                    }
                    if (!src) {
                        reject(`Problem loading: ${url}`);
                        return;
                    }

                    // "published" metadata incorrect date/time syntax
                    // https://catalog.feedbooks.com/catalog/public_domain.json
                    // https://catalog.feedbooks.com/publicdomain/browse/top.json?cat=FBNFC000000&lang=en
                    src = src.replace("-0514-01-01T00:00:00Z", "2022-01-01T00:00:00Z");
                    src = src.replace("-0322-01-01T00:00:00Z", "2022-01-01T00:00:00Z");
                    src = src.replace("-0347-01-01T00:00:00Z", "2022-01-01T00:00:00Z");
                    src = src.replace("-0600-01-01T00:00:00Z", "2022-01-01T00:00:00Z");
                    src = src.replace("-1790-01-01T00:00:00Z", "2022-01-01T00:00:00Z");
                    src = src.replace("-0380-01-01T00:00:00Z", "2022-01-01T00:00:00Z");

                    const json1 = JSON.parse(src);
                    // traverseJsonObjects(json1,
                    //     (obj) => {
                    //         harmonizeFieldnames(obj);
                    //     });
                    // debug(json1);
                    // debug("------------------------");
                    // debug("------------------------");
                    const isPublication =
                        !json1.publications && !json1.navigation && !json1.groups && !json1.catalogs && json1.metadata;
                    const isAuth = !isPublication && json1.authentication;

                    const opds2Feed: OPDSPublication | OPDSFeed | OPDSAuthenticationDoc =
                        // tslint:disable-next-line: max-line-length
                        isPublication
                            ? TaJsonDeserialize<OPDSPublication>(json1, OPDSPublication) // "application/opds-publication+json"
                            : // tslint:disable-next-line: max-line-length
                            isAuth
                            ? TaJsonDeserialize<OPDSAuthenticationDoc>(json1, OPDSAuthenticationDoc) // "application/vnd.opds.authentication.v1.0+json"
                            : TaJsonDeserialize<OPDSFeed>(json1, OPDSFeed); // "application/opds+json"
                    // debug(opds2Feed);
                    // debug("------------------------");
                    // debug("------------------------");

                    // if (isPublication) { // OPDSPublication is not IWithAdditionalJSON
                    //     const pub = opds2Feed as OPDSPublication;
                    // } else if (isAuth) { // OPDSAuthenticationDoc
                    //     const authDoc = opds2Feed as IWithAdditionalJSON;
                    //     if (authDoc.AdditionalJSON) {
                    //         Object.keys(authDoc.AdditionalJSON).forEach((key) => {
                    //             if (authDoc.AdditionalJSON.hasOwnProperty(key)) {
                    //                 (authDoc as any)[key] = authDoc.AdditionalJSON[key];
                    //                 delete authDoc.AdditionalJSON[key];
                    //             }
                    //         });
                    //         debug(authDoc);
                    //         debug(authDoc.AdditionalJSON);
                    //     }
                    // } else { // OPDSFeed is not IWithAdditionalJSON
                    //     const feed = opds2Feed as OPDSFeed;
                    // }

                    const json2 = TaJsonSerialize(opds2Feed);

                    let res: OPDSFeedAndPubUrls | undefined;
                    try {
                        res = await parseCompareJSONs(url, json1, json2);
                    } catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

async function webpubTest(url: string, alreadyDone: Set<string>): Promise<boolean> {
    alreadyDone.add(url);

    return new Promise((resolve, reject) => {
        // debug("------------------------");
        debug(url);
        // debug("------------------------");

        const proto = /^https:\/\//.test(url) ? https : http;
        proto
            .get(url, (response) => {
                let str: string | undefined;
                let buffs: Buffer[] | undefined;

                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    resolve(true);
                    return;
                }

                response.on("data", (chunk) => {
                    if (typeof chunk === "string") {
                        if (!str) {
                            str = "";
                        }
                        str += chunk;
                    } else {
                        if (!buffs) {
                            buffs = [];
                        }
                        buffs.push(chunk);
                    }
                });

                response.on("end", async () => {
                    let src: string | undefined;
                    if (str) {
                        src = str;
                    } else if (buffs) {
                        src = Buffer.concat(buffs).toString("utf8");
                    }
                    if (!src) {
                        reject(`Problem loading: ${url}`);
                        return;
                    }
                    // debug(src);

                    const json1 = JSON.parse(src);
                    // debug(json1);

                    let pub: Publication | undefined;
                    try {
                        pub = TaJsonDeserialize<Publication>(json1, Publication);
                    } catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }

                    // debug(pub);
                    const json2 = TaJsonSerialize(pub);

                    // let res: OPDSFeedAndPubUrls | undefined;
                    try {
                        // res =
                        await parseCompareJSONs(url, json1, json2);
                    } catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }

                    // debug(res); // we could recurse again on pub links ...
                    resolve(true);
                });
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

async function recursePubs(t: ExecutionContext, urls: OPDSFeedAndPubUrls, alreadyDone: Set<string>): Promise<boolean> {
    const urlsTodoWebPubs: string[] = [];
    urls.webpubs.forEach((u) => {
        if (!alreadyDone.has(u)) {
            urlsTodoWebPubs.push(u);
        }
    });

    for (const href of urlsTodoWebPubs) {
        try {
            const okay = await webpubTest(href, alreadyDone);
            if (!okay) {
                return false;
            }
        } catch (err) {
            debug(err);
            // early termination
            return false;
        }
    }

    const urlsTodoAudioWebPubs: string[] = [];
    urls.audiowebpubs.forEach((u) => {
        if (!alreadyDone.has(u)) {
            urlsTodoAudioWebPubs.push(u);
        }
    });

    for (const href of urlsTodoAudioWebPubs) {
        try {
            const okay = await webpubTest(href, alreadyDone);
            if (!okay) {
                return false;
            }
        } catch (err) {
            debug(err);
            // early termination
            return false;
        }
    }

    const urlsTodoPubs: string[] = [];
    urls.pubs.forEach((u) => {
        if (!alreadyDone.has(u)) {
            urlsTodoPubs.push(u);
        }
    });

    for (const href of urlsTodoPubs) {
        const okay = await testUrl(t, href, alreadyDone);
        if (!okay) {
            return false;
        }
    }

    const urlsAuths: string[] = [];
    urls.authentications.forEach((u) => {
        if (!alreadyDone.has(u)) {
            urlsAuths.push(u);
        }
    });

    for (const href of urlsAuths) {
        const okay = await testUrl(t, href, alreadyDone);
        if (!okay) {
            return false;
        }
    }

    return true;
}

// tslint:disable-next-line:max-line-length
async function recurseFeeds(t: ExecutionContext, urls: OPDSFeedAndPubUrls, alreadyDone: Set<string>): Promise<boolean> {
    const urlsTodoFeeds: string[] = [];
    urls.feeds.forEach((u) => {
        if (!alreadyDone.has(u)) {
            urlsTodoFeeds.push(u);
        }
    });

    for (const href of urlsTodoFeeds) {
        const okay = await testUrl(t, href, alreadyDone);
        if (!okay) {
            return false;
        }
    }

    return true;
}

async function recurse(t: ExecutionContext, urls: OPDSFeedAndPubUrls, alreadyDone: Set<string>): Promise<boolean> {
    if (FEEDS_FIRST) {
        const b1 = await recurseFeeds(t, urls, alreadyDone);
        if (!b1) {
            return b1;
        }
        const b2 = await recursePubs(t, urls, alreadyDone);
        return b2;
    }

    const b3 = await recursePubs(t, urls, alreadyDone);
    if (!b3) {
        return b3;
    }
    const b4 = await recurseFeeds(t, urls, alreadyDone);
    return b4;
}

async function testUrl(t: ExecutionContext, url: string, alreadyDone: Set<string>): Promise<boolean> {
    if (alreadyDone.size >= MAX_TESTS) {
        return true;
    }

    alreadyDone.add(url);

    let urls: OPDSFeedAndPubUrls | undefined;
    try {
        urls = await opds2Test(url);
    } catch (err) {
        debug(err);
        // early termination
        return false;
    }

    if (urls) {
        return await recurse(t, urls, alreadyDone);
    }

    return true;
}

async function testUrlAlt(t: ExecutionContext, url: string, alreadyDone: Set<string>): Promise<boolean> {
    if (alreadyDone.size >= MAX_TESTS) {
        return true;
    }

    alreadyDone.add(url);

    const promise = new Promise<boolean>((resolve, reject) => {
        const proto = /^https:\/\//.test(url) ? https : http;
        proto
            .get(url, async (response) => {
                let str: string | undefined;
                let buffs: Buffer[] | undefined;

                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    resolve(true);
                    return;
                }

                response.on("data", (chunk) => {
                    if (typeof chunk === "string") {
                        if (!str) {
                            str = "";
                        }
                        str += chunk;
                    } else {
                        if (!buffs) {
                            buffs = [];
                        }
                        buffs.push(chunk);
                    }
                });

                response.on("end", async () => {
                    let src: string | undefined;
                    if (str) {
                        src = str;
                    } else if (buffs) {
                        src = Buffer.concat(buffs).toString("utf8");
                    }
                    if (!src) {
                        debug(`Problem loading: ${url} (skip)`);
                        resolve(true);
                        return;
                    }
                    // debug(src);

                    const xmlDom = new xmldom.DOMParser().parseFromString(src);
                    if (!xmlDom || !xmlDom.documentElement) {
                        reject("Problem parsing OPDS1 XML. Fail.");
                        return;
                    }
                    const isEntry = xmlDom.documentElement.localName === "entry";
                    if (isEntry) {
                        debug("Expecting OPDS1 Feed, not Entry. Skip.");
                        resolve(true);
                        return;
                    }

                    const opds1Feed = XML.deserialize<OPDS>(xmlDom, OPDS);
                    const opds2Feed: OPDSFeed = convertOpds1ToOpds2(opds1Feed);
                    const opds2FeedJson = TaJsonSerialize(opds2Feed);
                    // debug(opds2FeedJson);

                    let urls: OPDSFeedAndPubUrls | undefined;
                    try {
                        urls = await parseCompareJSONs(url, opds2FeedJson, opds2FeedJson);
                    } catch (err) {
                        reject(err);
                        return;
                    }

                    if (urls) {
                        const b = await recurse(t, urls, alreadyDone);
                        resolve(b);
                        return;
                    }

                    resolve(true);
                    return;
                });
            })
            .on("error", async (err) => {
                reject(err);
                return;
            });
    });
    return await promise;
}

async function runUrlTest(t: ExecutionContext, url: string) {
    const done = new Set<string>([]);
    try {
        const okay = await testUrl(t, url, done);
        debug(done);
        debug(done.size);

        t.true(await delay(okay));
        return;
    } catch (err) {
        debug(err);
    }
    t.true(await delay(false));
}

async function runUrlTestAlt(t: ExecutionContext, url: string) {
    const done = new Set<string>([]);
    try {
        const okay = await testUrlAlt(t, url, done);
        debug(done);
        debug(done.size);

        t.true(await delay(okay));
        return;
    } catch (err) {
        debug(err);
    }
    t.true(await delay(false));
}

test("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", async (t) => {
    const url = "https://test.opds.io/2.0/home.json";
    // https://test.opds.io/2.0/navigation.json
    // https://test.opds.io/2.0/publications.json
    // https://test.opds.io/2.0/404.json
    await runUrlTest(t, url);
});

test("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", async (t) => {
    const url = "https://catalog.feedbooks.com/catalog/public_domain.json";
    // https://catalog.feedbooks.com/catalog/index.json
    // https://catalog.feedbooks.com/book/1421.json
    await runUrlTest(t, url);
});

test("OPDS2 HTTP (de)serialize roundtrip (recursive) CATALOGS", async (t) => {
    const url = "https://libraryregistry.librarysimplified.org/libraries";
    await runUrlTest(t, url);
});

test("OPDS2 HTTP (de)serialize roundtrip (recursive) AUTHENTICATION", async (t) => {
    const url = "http://acl.simplye-ca.org/CALMDA/authentication_document";
    await runUrlTest(t, url);
});

test("OPDS1-2 HTTP convert (de)serialize roundtrip (recursive)", async (t) => {
    const url = "https://bookserver.archive.org/group/openaudiobooks";
    await runUrlTestAlt(t, url);
});

test("test", async (t) => {
    const url = "https://api.archivelab.org/books/bookconcord_preface_1202/opds_audio_manifest";
    const done = new Set<string>([]);
    await webpubTest(url, done);
    debug(done);
    debug(done.size);
    t.true(await delay(true));
});

test("OPDS1-2 LCP passphrase convert (de)serialize roundtrip", async (t) => {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:lcp="http://readium.org/lcp-specs/ns">

    <link
        rel="http://opds-spec.org/acquisition/"
        href="FAKE_URL"
        type="application/vnd.readium.lcp.license.v1.0+json">

        <lcp:hashed_passphrase>FAKE_BASE64</lcp:hashed_passphrase>
    </link>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc);
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = XML.deserialize<Entry>(xmlDom, Entry);
    t.is(opds1Entry.Links[0].LcpHashedPassphrase, "FAKE_BASE64");
    const opds2Pub = convertOpds1ToOpds2_EntryToPublication(opds1Entry);
    t.is(opds2Pub.Links[0].Properties.AdditionalJSON.lcp_hashed_passphrase, "FAKE_BASE64");
    const opds2PubJson = TaJsonSerialize(opds2Pub);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/ban-types
    t.is((((opds2PubJson.links as [{}])[0] as any).properties as any).lcp_hashed_passphrase as string, "FAKE_BASE64");
});
