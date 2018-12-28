import * as https from "https";

import test from "ava";
import * as debug_ from "debug";
import { JSON as TAJSON } from "ta-json-x";

import { OPDSFeed } from "../src/opds/opds2/opds2";

const debug = debug_("r2:opds#test");

// ==========================

async function fn() {
    return Promise.resolve("foo");
}
test("dummy async test", async (t) => {
    debug("test ASYNC");
    t.is(await fn(), "foo");
});
async function opds2Test(url: string): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        https.get(url, (response) => {
            let str: string | undefined;
            let buffs: Buffer[] | undefined;

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
                const json = JSON.parse(src);
                debug(json);

                const opds2Feed = TAJSON.deserialize<OPDSFeed>(json, OPDSFeed);
                debug(opds2Feed);

                resolve(true);
            });
        }).on("error", (err) => {
            debug(err);
            reject(err);
        });
    });
}

test("OPDS2 deserialize (URL test 1)", async (t) => {
    const url = "https://test.opds.io/2.0/home.json";
    t.true(await opds2Test(url));
});

test("OPDS2 deserialize (URL test 2)", async (t) => {
    const url = "https://test.opds.io/2.0/navigation.json";
    t.true(await opds2Test(url));
});

test("OPDS2 deserialize (URL test 3)", async (t) => {
    const url = "https://test.opds.io/2.0/publications.json";
    t.true(await opds2Test(url));
});

test("OPDS2 deserialize (URL Feedbooks)", async (t) => {
    const url = "https://catalog.feedbooks.com/catalog/index.json";
    t.true(await opds2Test(url));
});
