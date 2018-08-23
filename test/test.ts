import { test } from "ava";
import * as debug_ from "debug";

const debug = debug_("r2:opds#test");

// ==========================

async function fn() {
    return Promise.resolve("foo");
}
test("dummy async test", async (t) => {
    debug("test ASYNC");
    t.is(await fn(), "foo");
});
