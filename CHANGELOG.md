# Next

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.23...develop

Changes:
* TODO

# 1.0.23

> Build environment: NodeJS `12.16.1`, NPM `6.14.4`

Changes:
* NPM package updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.23/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.23/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.23

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.22...v1.0.23

# 1.0.22

> Build environment: NodeJS `12.15.0`, NPM `6.13.7`

Changes:
* NPM package updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.22/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.22/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.22

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.21...v1.0.22

# 1.0.21

> Build environment: NodeJS `12.13.0`, NPM `6.13.0`

Changes:
* Fixed OPDS1-2 converter to duck-type publication vs. navigation feed (image thumbnails and authors)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.21/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.21/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.21

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.20...v1.0.21

# 1.0.20

> Build environment: NodeJS `12.13.0`, NPM `6.13.0`

Changes:
* NPM package updates
* TAJSON now parses/generates arbitrary JSON properties with typed object

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.20/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.20/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.20

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.19...v1.0.20

# 1.0.19

> Build environment: NodeJS `12.13.0`, NPM `6.13.0`

Changes:
* NPM package updates
* fix: duck-type navigation vs. publications OPDS feed
* workaround: monkey-patch erroneous OPDS 1 rel URI (cover image thumbnail)
*  fix: OPDS entry type (x)html for Title, SubTitle, Summary, Content with correct XML namespace normalization (Atom removal)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.19/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.19/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.19

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.18...v1.0.19

# 1.0.18

> Build environment: NodeJS `12.13.0`, NPM `6.12.0`

Changes:
* OPDS converter 1 > 2 support for ThrCount (numberOfItems)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.18/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.18/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.18

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.17...v1.0.18

# 1.0.17

> Build environment: NodeJS `12.13.0`, NPM `6.12.0`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.17/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.17/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.17

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.16...v1.0.17

# 1.0.16

> Build environment: NodeJS `10.16.3`, NPM `6.12.0`

Changes:
* NPM updates (including NodeJS v12 for Electron v6)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.16/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.16/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.16

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.15...v1.0.16

# 1.0.15

> Build environment: NodeJS `10.16.3`, NPM `6.11.3`

Changes:
* OPDS support for "journals" online HTML publication entries (no EPUB acquisition link)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.15/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.15/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.15

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.14...v1.0.15

# 1.0.14

> Build environment: NodeJS `10.16.3`, NPM `6.11.3`

Changes:
* NPM updates
* OPDS JSON Schema uri-reference validator was failing on space characters (but not unicode chars)
* OPDS v1-v2 converter auto-fixes incorrect JPEG content type
* OPDS support for x-stanza image mime type
* OPDS parser adds link rel acquisition when missing, inferred from EPUB link type

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.14/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.14/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.14

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.13...v1.0.14

# 1.0.13

> Build environment: NodeJS `10.16.3`, NPM `6.11.3`

Changes:
* NPM updates
* TypeScript sort imports

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.13/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.13/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.13

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.12...v1.0.13

# 1.0.12

> Build environment: NodeJS `10.16.3`, NPM `6.11.3`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.12/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.12/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.12

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.11...v1.0.12

# 1.0.11

> Build environment: NodeJS `10.16.0`, NPM `6.10.2`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.11/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.11/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.11

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.10...v1.0.11

# 1.0.10

> Build environment: NodeJS `10.16.0`, NPM `6.9.0`

Changes:
* NPM updates (notably: Ava unit testing)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.10/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.10/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.10

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.9...v1.0.10

# 1.0.9

> Build environment: NodeJS `10.15.3`, NPM `6.9.0`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.9/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.9/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.9

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.8...v1.0.9

# 1.0.8

> Build environment: NodeJS `8.15.1`, NPM `6.4.1`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.8/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.8/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.8

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.7...v1.0.8

# 1.0.7

> Build environment: NodeJS `8.15.1`, NPM `6.4.1`

Changes:
* NPM updates
* JSON Schema reference updates
* NodeTS (TypeScript) unit test runner

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.7/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.7/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.7

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.6...v1.0.7

# 1.0.6

> Build environment: NodeJS `8.14.1`, NPM `6.4.1`

Changes:
* NPM updates
* Significant unit test updates, handling of union/polymorph types with special (de)serialization rules, and OPDS feed crawler.

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.6/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.6/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.6

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.5...v1.0.6

# 1.0.5

> Build environment: NodeJS `8.14.1`, NPM `6.4.1`

Changes:
* Reviewed and annotated the data models based on the most current JSON Schema (significant unit test updates to match)
* Minor NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.5/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.5/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.5

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.4...v1.0.5

# 1.0.4

> Build environment: NodeJS `8.14.1`, NPM `6.4.1`

Changes:
* Updated documentation (minor)
* NPM 6.5.* has regression bugs for global package installs, so revert back to NPM 6.4.1 (which is officially shipped with the NodeJS installer).

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.4/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.4/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.4

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.3...v1.0.4

# 1.0.3

> Build environment: NodeJS `8.14.0`, NPM `6.5.0`

Changes:
* NPM updates

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.3/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.3/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.3

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.2...v1.0.3

# 1.0.2

> Build environment: NodeJS `8.14.0`, NPM `6.5.0`

Changes:
* NPM updates (r2-xxx-js)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.2/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.2/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.2

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.1...v1.0.2

# 1.0.1

> Build environment: NodeJS `8.14.0`, NPM `6.5.0`

Changes:
* NPM updates (minor)
* Replaced deprecated RawGit URLs
* Improved Ava unit test setup
* Removed unnecessary TypeScript import aliases

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.1/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.1/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.1

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0...v1.0.1

# 1.0.0

> Build environment: NodeJS `8.14.0`, NPM `6.5.0`

Changes:
* NPM updates (minor)
* README info
* VisualStudio code tweaks (developer workflow)
* Semantic versioning bump 1.*.* (3-digit style now, "-alphaX" suffix caused issues with NPM tooling: updates, lockfile, etc.)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.7...v1.0.0

# 1.0.0-alpha.7

> Build environment: NodeJS `8.12.0`, NPM `6.4.1`

Changes:
* NPM updates (minor corrections)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.7/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.7/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.7

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.6...v1.0.0-alpha.7

# 1.0.0-alpha.6

> Build environment: NodeJS `8.12.0`, NPM `6.4.1`

Changes:
* NPM updates (minor)
* Git revision JSON info now includes NodeJS and NPM version (build environment)
* OPDS v1 to v2 converter now exposes Entry-compatible function

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.6/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.6/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.6

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.5...v1.0.0-alpha.6

# 1.0.0-alpha.5

Changes:
* Dependency "ta-json" GitHub semver dependency becomes "ta-json-x" NPM package (fixes https://github.com/readium/r2-testapp-js/issues/10 )
* Removed TypeScript linter warning message (checks for no unused variables)
* NPM updates related to the Node TypeScript typings

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.5/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.5/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.5

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.4...v1.0.0-alpha.5

# 1.0.0-alpha.4

Changes:
* OPDS converter XML to JSON: empty language ignored.
* npm updates (external dependencies)

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.4/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.4/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.4

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.3...v1.0.0-alpha.4

# 1.0.0-alpha.3

Changes:
* correct version in `package-lock.json`

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.3/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.3/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.3

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.2...v1.0.0-alpha.3

# 1.0.0-alpha.2

Changes (NPM updates):
* `@types/node`
* `r2-utils-js`
* `r2-shared-js`

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.2/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.2/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.2

Git diff:
* https://github.com/readium/r2-opds-js/compare/v1.0.0-alpha.1...v1.0.0-alpha.2

# 1.0.0-alpha.1

Changes:
* initial NPM publish

Git revision info:
* https://unpkg.com/r2-opds-js@1.0.0-alpha.1/dist/gitrev.json
* https://github.com/edrlab/r2-opds-js-dist/blob/v1.0.0-alpha.1/dist/gitrev.json

Git commit history:
* https://github.com/readium/r2-opds-js/commits/v1.0.0-alpha.1

Git diff:
* initial NPM publish
