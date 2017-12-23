import { JsonDateConverter } from "@utils/ta-json-date-converter";
import {
    BufferConverter as XmlBufferConverter,
    DateConverter as XmlDateConverter,
    propertyConverters as xmlConverters,
} from "@utils/xml-js-mapper";
import {
    BufferConverter as JsonBufferConverter,
    propertyConverters as jsonConverters,
} from "ta-json";

import { OPDSCollection } from "./opds/opds2/opds2-collection";
import { JsonOPDSCollectionConverter } from "./opds/opds2/opds2-collection-json-converter";

export function initGlobals() {
    jsonConverters.set(Buffer, new JsonBufferConverter());
    jsonConverters.set(Date, new JsonDateConverter());
    jsonConverters.set(OPDSCollection, new JsonOPDSCollectionConverter());

    xmlConverters.set(Buffer, new XmlBufferConverter());
    xmlConverters.set(Date, new XmlDateConverter());
}
