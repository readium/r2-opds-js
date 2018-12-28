import * as https from "https";
import { URL } from "url";

import { sortObject, traverseJsonObjects } from "@r2-utils-js/_utils/JsonUtils";
import { ExecutionContext } from "ava";
import test from "ava";
import * as debug_ from "debug";
import * as jsonDiff from "json-diff";
import { JSON as TAJSON } from "ta-json-x";

import {
    initGlobalConverters_GENERIC,
    initGlobalConverters_OPDS,
} from "../src/opds/init-globals";
import { OPDSFeed } from "../src/opds/opds2/opds2";
import { OPDSPublication } from "../src/opds/opds2/opds2-publication";

initGlobalConverters_OPDS();
initGlobalConverters_GENERIC();

const debug = debug_("r2:opds#test");

// ==========================

async function fn() {
    return Promise.resolve("foo");
}
test("dummy async test", async (t) => {
    debug("test ASYNC");
    t.is(await fn(), "foo");
});

interface OPDSFeedAndPubUrls {
    feeds: Set<string>;
    pubs: Set<string>;
}
async function opds2Test(url: string): Promise<OPDSFeedAndPubUrls> {

    return new Promise<OPDSFeedAndPubUrls>((resolve, reject) => {

        // debug("------------------------");
        debug(url);
        // debug("------------------------");

        https.get(url, (response) => {
            let str: string | undefined;
            let buffs: Buffer[] | undefined;

            if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                debug(`${url} ==> ${response.statusCode} (skipped)`);
                const empty: OPDSFeedAndPubUrls = {
                    feeds: new Set<string>([]),
                    pubs:  new Set<string>([]),
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

            response.on("end", () => {
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
                const harmonizeName = (obj: any) => {
                    // tslint:disable-next-line:max-line-length
                    ["subject", "collection", "series", "author", "translator", "editor", "artist", "illustrator", "letterer", "penciler", "colorist", "inker", "narrator", "contributor", "publisher", "imprint"].forEach((term) => {
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
                                        } else if (typeof arr[i].name === "object") { // IStringMap
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

                let json1 = JSON.parse(src);
                // traverseJsonObjects(json1,
                //     (obj) => {
                //         harmonizeFieldnames(obj);
                //     });
                // debug(json1);
                // debug("------------------------");
                // debug("------------------------");
                const isPublication = !json1.publications && !json1.navigation && !json1.groups && json1.metadata;
                const opds2Feed: OPDSPublication | OPDSFeed = isPublication ?
                    TAJSON.deserialize<OPDSPublication>(json1, OPDSPublication) : // "application/opds-publication+json"
                    TAJSON.deserialize<OPDSFeed>(json1, OPDSFeed); // "application/opds+json"
                // debug(opds2Feed);
                // debug("------------------------");
                // debug("------------------------");
                let json2 = TAJSON.serialize(opds2Feed);
                // debug(json2);
                // debug("------------------------");
                // debug("------------------------");

                // console.log("=== HARMONIZING JSON1 ...");
                traverseJsonObjects(json1,
                    (obj) => {
                        harmonizeDate(obj);
                    });
                traverseJsonObjects(json1,
                    (obj) => {
                        harmonizeName(obj);
                    });
                traverseJsonObjects(json1,
                    (obj) => {
                        harmonizeArrays(obj);
                    });
                // console.log("=== HARMONIZING JSON2 ...");
                traverseJsonObjects(json2,
                    (obj) => {
                        harmonizeDate(obj);
                    });
                traverseJsonObjects(json2,
                    (obj) => {
                        harmonizeName(obj);
                    });
                traverseJsonObjects(json2,
                    (obj) => {
                        harmonizeArrays(obj);
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

                const thisUrl = new URL(url);
                const thisUrlStr = thisUrl.toString();
                const feedUrls = new Set<string>();
                const pubUrls = new Set<string>();
                traverseJsonObjects(json1,
                    (obj) => {
                        const isFeed = obj.type === "application/opds+json";
                        const isPub = obj.type === "application/opds-publication+json";
                        if (obj.href && (isFeed || isPub)) {

                            const u = new URL(obj.href, thisUrl);
                            const uStr = u.toString();
                            if (uStr !== thisUrlStr) {
                                if (isFeed) {
                                    feedUrls.add(uStr);
                                } else if (isPub) {
                                    pubUrls.add(uStr);
                                }

                                // console.log("URL: " + obj.href + " => " + uStr);
                            } else {
                                // console.log("URL: " + obj.href + " (skipped)");
                            }
                        }
                    });

                const set: OPDSFeedAndPubUrls = {
                    feeds: feedUrls,
                    pubs:  pubUrls,
                };
                resolve(set);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}
const MAX_TESTS = process.env.MAX_TESTS || 10;
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

        const urlsTodoPubs: string[] = [];
        urls.pubs.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoPubs.push(u);
            }
        });

        const urlsTodoFeeds: string[] = [];
        urls.feeds.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoFeeds.push(u);
            }
        });

        for (const href of urlsTodoPubs) {
            const okay = await testUrl(t, href, alreadyDone);
            if (!okay) {
                return false;
            }
        }

        for (const href of urlsTodoFeeds) {
            const okay = await testUrl(t, href, alreadyDone);
            if (!okay) {
                return false;
            }
        }
    }

    return true;
}

async function delay(okay: boolean): Promise<boolean> {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(okay);
        }, 1000);
    });
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
